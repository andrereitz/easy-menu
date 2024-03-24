from flask import Blueprint, render_template

from utils.db import get_db

menu_pages = Blueprint("menus", __name__, url_prefix="/menu")

@menu_pages.route("/<menu>", methods=["GET"])
def index(menu):
  db = get_db()
  
  business = db.execute("SELECT id, business_logo, business_name, business_color FROM users WHERE business_url = ?", (menu,)).fetchone()
  if not business:
    return render_template("menu/notfound.html") 
  
  categories = db.execute("""
    SELECT * FROM categories WHERE id IN (
      SELECT DISTINCT category FROM items
    ) and user = ? ORDER BY title
  """, (business["id"],)).fetchall()
  items = db.execute("""
    SELECT media_id, items.title, description, price, categories.title as category, url as image FROM items 
    LEFT JOIN categories ON categories.id = items.category
    LEFT JOIN medias ON items.media_id = medias.id
    WHERE items.user = ? ORDER BY items.title
  """, (business["id"],)).fetchall()

  items_data = {}
  for item in items:
    if item["category"]:
      if item["category"] in items_data:
        items_data[item["category"]].append(dict(item))
      else:
        items_data[item["category"]] = [dict(item)]
        
    else:
      items_data["Others"] = [dict(item)]
        
  page_data = {
    "logo": business["business_logo"],
    "name": business["business_name"],
    "color": business["business_color"],
    "categories": [ row["title"] for row in categories],
    "items_data": dict(sorted(items_data.items()))
  }
  
  print(business["id"])
  
  return render_template("menu/index.html", data=page_data) 

    