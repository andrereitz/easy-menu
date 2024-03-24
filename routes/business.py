import os
import sqlite3
from flask import Blueprint, jsonify, redirect, render_template, request, session, flash
from cerberus import Validator

from utils import get_db, get_project_root, login_required, handle_errors, generate_qr, remove_qr, upload_logo, allowed_file


business_pages = Blueprint("user", __name__, url_prefix="/business")

@business_pages.route("/edit", methods=["GET", "POST"])
@login_required
def edit():
  db = get_db()
  result = db.execute("SELECT email, business_name, business_url, business_color, business_logo FROM users WHERE id = ?", (session["user"],)).fetchall()
  user_dict = [dict(row) for row in result]
  
  if request.method == "GET":
    return render_template("dashboard/edit_business.html", data=user_dict[0])
  
  if request.method == "POST":     
    schema = {
      'email': {
        'type': 'string',
        'regex': r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$',
        'required': True
      },
      'business_name': {
        'type': 'string',
      },
      'business_url': {
        'type': 'string',
        'empty': True,
        'minlength': 3,
        'regex': r'^[a-z0-9_-]+(\-)?',
      },
      'business_color': {
        'type': 'string',
      }
    }
    v = Validator(schema)
    if v.validate(request.form, schema):
        
      try:
        logo_image = user_dict[0]["business_logo"]  
        
        if 'business_logo' in request.files and request.files["business_logo"].filename != '':
          if not allowed_file(request.files["business_logo"].filename):
            raise ValueError('File extension is not allowed, please upload a PNG or JPG')
          
          logo_image = upload_logo(request.files["business_logo"])
          
          if user_dict[0]["business_logo"]:
            try:
              os.remove(f"{get_project_root()}/static/media/{user_dict[0]['business_logo']}")
            except:
              pass
            
        if(request.form.get("business_url")):
          try:
            generate_qr(session["user"], request.form["business_url"])
          except Exception as err:
            print(err)
            pass
        else:
          remove_qr(session["user"])

        db.execute("UPDATE users SET email = ?, business_name = ?, business_url = ?, business_color = ?, business_logo = ? WHERE id = ?", 
          (
            request.form["email"],
            request.form["business_name"],
            request.form["business_url"],
            request.form["business_color"],
            logo_image,
            session["user"]
          )
        )
        db.commit()
        db.close()
        flash("Updated sucessfuly", "success")
        
        return redirect("/dashboard")
        
      except sqlite3.Error as err:
        print(err)
        flash("Error updating, please try again", "danger")

        return redirect("/dashboard")
      
      except Exception as err:
        print(err)
        flash(err, "danger")
        
    
    else:
      errors = handle_errors(v._errors)
      flash('<br>'.join(errors), "danger")
      
      
    return render_template("dashboard/edit_business.html", data=user_dict[0])

@business_pages.route("/remove-image", methods=["DELETE"])
@login_required
def remove_image():
  json = request.get_json();
  db = get_db()
  
  try:
    db.execute("UPDATE users SET business_logo = NULL WHERE id = ?", (session["user"],))
    db.commit()
  except Exception as err:
    return jsonify({
      'error': True,
      'code': 500,
      'message': 'Failed to remove image from database'
    }), 500
  
  try:
    os.remove(f"{get_project_root()}/static/media/{json['url']}")
    
  except:
    print("could not delete image")
    pass
    
  return jsonify({
    'error': False, 
    'code': 200,
    'message': 'Image removed',
  }), 200

    
