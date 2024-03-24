import os
from cerberus import Validator
from flask import Blueprint, redirect, render_template, request, session, flash, jsonify

from utils import get_db, get_project_root, handle_errors, login_required, allowed_file, upload_item_image


item_pages = Blueprint("items", __name__, url_prefix="/item")

@item_pages.route("/new", methods=["GET", "POST"])
@login_required
def new():
  db = get_db()
    
  if request.method == "GET":
    categories = db.execute("SELECT * FROM categories WHERE user = ?", (session["user"],)).fetchall()
    categories_data = [dict(row) for row in categories]
    
    item_new_data = {
      "categories": categories_data if len(categories_data) else []
    }
        
    return render_template("dashboard/item_new.html", data=item_new_data) 
    
  if request.method == "POST":
    categories = db.execute("SELECT * FROM categories WHERE user = ?", (session["user"],)).fetchall()

    schema = {
      'category': {
        'type': 'string',
      },
      'title': {
        'type': 'string',
        'required': True,
        'minlength': 3
      },
      'description': {
        'type': 'string',
      },
      'price': {
        'type': 'string',
        'required': True
      }
    }
    
    v = Validator(schema)
    if v.validate(request.form, schema):
      
      category_option = request.form.get("category")
      try:
        if category_option and int(category_option) in [row["id"] for row in categories]:
          final_category = category_option

      except Exception as err:
        print(err);
        final_category = 'NULL'
        
      try:
        IMAGE_FIELD_NAME = 'item_image'
        
        inserted_image = None
        
        if IMAGE_FIELD_NAME in request.files and request.files[IMAGE_FIELD_NAME].filename != '':
          if not allowed_file(request.files[IMAGE_FIELD_NAME].filename):
            raise ValueError('File extension is not allowed, please upload a PNG or JPG')
          
          item_image = upload_item_image(request.files[IMAGE_FIELD_NAME])
          result = db.execute("INSERT INTO medias (url, user) VALUES(?, ?)", (item_image, session["user"]))
          inserted_image = result.lastrowid
                
        db.execute("INSERT INTO items (category, user, title, description, price, media_id) VALUES (?, ?, ?, ?, ?, ?)", (
          final_category,
          session["user"],
          request.form["title"],
          request.form["description"],
          request.form["price"],
          inserted_image
        ))
        db.commit()
        
        flash(f"Item {request.form['title']} added!", "success")
        return redirect("/dashboard")
      
      except Exception as err:
        flash(err, "danger")
        
        return redirect("/item/new") 
      
    else:
      errors = handle_errors(v._errors)
      flash('<br>'.join(errors), "danger")
    
      return redirect("/item/new") 
    
@item_pages.route("/edit/<item>", methods=["GET", "POST"])
@login_required
def edit(item):
  db = get_db()
  
  if request.method == "GET":
    item = db.execute("SELECT * FROM items WHERE user = ? AND id = ?", (session["user"], item)).fetchall()
    item_image = db.execute("SELECT url FROM medias WHERE id = ?", (item[0]["media_id"],)).fetchall()
    categories = db.execute("SELECT * FROM categories WHERE user = ?", (session["user"],)).fetchall()
    categories_data = [dict(row) for row in categories]

    item_edit_data = {
      "item_data": [dict(row) for row in item][0],
      "item_image": item_image[0]["url"] if len(item_image) > 0 else None,
      "categories": categories_data if len(categories_data) else []
    }
        
    return render_template("dashboard/item_edit.html", data=item_edit_data) 
    
  if request.method == "POST":
    categories = db.execute("SELECT * FROM categories WHERE user = ?", (session["user"],)).fetchall()

    schema = {
      'category': {
        'type': 'string',
        'required': True
      },
      'title': {
        'type': 'string',
        'required': True,
        'minlength': 3
      },
      'description': {
        'type': 'string',
      },
      'price': {
        'type': 'string',
      }
    }
    
    v = Validator(schema)
    if v.validate(request.form, schema):
      
      category_option = request.form.get("category")
      try:
        if category_option and int(category_option) in [row["id"] for row in categories]:
          final_category = category_option

      except Exception as err:
        print(err);
        final_category = 'NULL'
        
      try:
        IMAGE_FIELD_NAME = 'item_image'
                
        if IMAGE_FIELD_NAME in request.files and request.files[IMAGE_FIELD_NAME].filename != '':
          if not allowed_file(request.files[IMAGE_FIELD_NAME].filename):
            raise ValueError('File extension is not allowed, please upload a PNG or JPG')
          
          item_image = upload_item_image(request.files[IMAGE_FIELD_NAME])
          result = db.execute("INSERT INTO medias (url, user) VALUES(?, ?)", (item_image, session["user"]))
          db.execute("UPDATE items SET media_id = ? WHERE id = ?", (result.lastrowid, item))
          
        db.execute("UPDATE items SET category = ?, user = ?, title = ?, description = ?, price = ? WHERE id = ?", (
          final_category,
          session["user"],
          request.form["title"],
          request.form["description"],
          request.form["price"],
          item
        ))
        db.commit()
        
        flash(f"Item {request.form['title']} editted!", "success")
        return redirect("/dashboard")
      
      except Exception as err:
        flash(err, "danger")
        
        return redirect(f"/item/edit/{item}") 
      
    else:
      errors = handle_errors(v._errors)
      flash('<br>'.join(errors), "danger")
    
      return redirect("/item/edit")
    
    
@item_pages.route("/delete/<item>", methods=["POST"])
@login_required
def delete(item):
  db = get_db()
  

  result = db.execute("SELECT user, media_id FROM items WHERE id = ?", (item,)).fetchall()
  item_media = db.execute("SELECT url FROM medias WHERE id = ?", (result[0]["media_id"],)).fetchall()
  
  if result[0]["user"] == session["user"]:
    db.execute("DELETE FROM items where id = ?", (item,))
    db.execute("DELETE FROM medias where id = ?", (result[0]["media_id"],))

    db.commit()
    
    try:
      os.remove(f"{get_project_root()}/static/media/{item_media[0]['url']}")
      
    except:
      print("could not delete image")
      pass
    
    flash("Item deleted", "success")
  else:
    flash("You can't delete this item!", "warning")
    
  return redirect("/dashboard")


@item_pages.route("/remove-image", methods=["DELETE"])
@login_required
def remove_image():
  json = request.get_json();
  db = get_db()
  image = db.execute("SELECT url, user FROM medias WHERE id = ?", (json["id"],)).fetchall()
  
  if(session["user"] != image[0]["user"]):    
    return jsonify({
      'error': True, 
      'code': 403,
      'message': 'You can\'t edit this item',
    }), 403
  
  try:
    db.execute("DELETE from medias WHERE id = ?", (json["id"],))
    db.commit()
  except Exception as err:
    return jsonify({
      'error': True,
      'code': 500,
      'message': 'Failed to remove image from database'
    }), 500
  
  try:
    os.remove(f"{get_project_root()}/static/media/{image[0]['url']}")
    
  except:
    print("could not delete image")
    pass
    
  return jsonify({
    'error': False, 
    'code': 200,
    'message': 'Image removed',
  }), 200
  