from flask import Blueprint, render_template, session

from utils import get_db, login_required


dashboard_pages = Blueprint("dashboard", __name__, url_prefix="/dashboard")

@dashboard_pages.route("/")
@login_required
def index():
  db = get_db()
  user = db.execute("SELECT id, email, business_name, business_url, business_color, business_logo FROM users WHERE id = ?", (session["user"],)).fetchall()
  user_items = db.execute("SELECT id, media_id, title, description, price, category FROM items WHERE items.user = ?", (session["user"],)).fetchall()
  categories = db.execute("SELECT * FROM categories WHERE user = ?", (session["user"],)).fetchall()
  images = db.execute("SELECT id, url FROM medias WHERE user = ?", (session["user"],)).fetchall()
  
  user_data = [dict(row) for row in user][0]
  media_data = { row["id"]: row["url"] for row in images}
  
  categories_data = {}
  for row in categories:
    categories_data[row["id"]] = row["title"]
  
  items_data = {}
  for row in user_items:
    current = {
      "id": row["id"], 
      "title": row["title"], 
      "description": row["description"], 
      "price": row["price"],
      "image": media_data[row["media_id"]],
    }
    
    if row["category"] and row["category"] != 'NULL':
      cat = categories_data[row["category"]]
      
      if cat in items_data:
        items_data[cat].append(current)
      else:
        items_data[cat] = [current]
        
    else:
      if 'Uncategorized' in items_data:
        items_data["Uncategorized"].append(current)
      else:
        items_data["Uncategorized"] = [current]
            
  dashboard_data = {
    "user": user_data,
    "user_items": items_data if len(items_data) else [],
    "categories": categories_data if len(categories_data) else [],
  }
    
  return render_template("dashboard/index.html", data=dashboard_data)