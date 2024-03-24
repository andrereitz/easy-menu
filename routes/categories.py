import sqlite3
from cerberus import Validator
from flask import Blueprint, redirect, render_template, request, session, flash

from utils import get_db, login_required


category_pages = Blueprint("categories", __name__, url_prefix="/category")

@category_pages.route("/", methods=["GET"])
@login_required
def index():
  db = get_db()
  categories = db.execute("SELECT * FROM categories WHERE user = ?", (session["user"],)).fetchall()
  categories_data = [dict(row) for row in categories]
  
  category_data = {
    "categories": categories_data if len(categories_data) else []
  }
  
  return render_template("dashboard/category.html", data=category_data)
 
  
@category_pages.route("/new", methods=["GET", "POST"])
@login_required
def new():
  db = get_db()
  
  if request.method == "GET":
        
    return render_template("dashboard/category_new.html") 
    
  if request.method == "POST":
    schema = {
      'title': {
        'type': 'string',
        'minlength': 3
      }
    }
    v = Validator(schema)
    if v.validate(request.form, schema):
      flash(f"Category {request.form['title']} added!", 'success')
      
      try:
        db.execute("INSERT INTO categories (title, user) VALUES(?, ?)", (request.form["title"], session["user"]))
        db.commit()
        
      except Exception as err:
        flash(err, "danger")
        
        return redirect("/category/new")
      
      return redirect("/dashboard")
      
    else:
      flash("invalid", "danger")
    
    return render_template("dashboard/category_new.html")
  
  
@category_pages.route("/edit/<id>", methods=["GET", "POST"])
@login_required
def edit(id):
  db = get_db()
  category = db.execute("SELECT user, title, id FROM categories WHERE id = ?", (id,)).fetchone()
  
  if(request.method == "GET"):
    category_data = { "title": category["title"], "id": category["id"] }
    
    return render_template("dashboard/category_edit.html", data=category_data)
  
  if(request.method == "POST"):
    if not request.form.get("title") or request.form["title"] == '':
      flash("Title is required!", "warning")
      
      return redirect(f"/category/edit/{id}")

    if session["user"] != category["user"]:
      flash("You can't edit this category!", "danger")
      
      return redirect("/category")
    
    db.execute("UPDATE categories SET title = ? where id = ?", (request.form["title"], id))
    db.commit()
    
    flash(f"Category {category['title']} updated!", "success")
    
    return redirect("/category")
  
@category_pages.route("/delete/<id>", methods=["GET"])
@login_required
def delete(id):
  print(f"The id is: {id}")
  db = get_db()
  result = db.execute("SELECT user FROM categories WHERE id = ?", (id,)).fetchone()
  
  if result["user"] != session["user"]:
    flash("You can't delete this category!", "warning")
    
    return redirect("/category/edit/{id}")
  
  try:
    db.execute("DELETE FROM categories WHERE id = ?", (id,))
    db.execute("UPDATE items SET category = NULL where category = ?", (id,))
    db.commit()
    
  except sqlite3.Error as err:
    flash("Error deleting category", "danger")
    
    return redirect("/category")
  
  flash("Category deleted!", "success")

  return redirect("/category")