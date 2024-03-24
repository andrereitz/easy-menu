from flask import Blueprint, redirect, render_template, request, session, flash
from werkzeug.security import check_password_hash, generate_password_hash
from utils import get_db, handle_errors
from cerberus import Validator


auth_pages = Blueprint("auth_pages", __name__, url_prefix="/auth")

@auth_pages.route("/")
def index():
  if "user" in session:
    return redirect("/dashboard")
    
  return redirect("/auth/login")


@auth_pages.route("/login", methods=["GET", "POST"])
def login():
    if "user" in session:
      return redirect("/dashboard")
      
    if request.method == "GET":
      return render_template('auth/login.html')
    
    if request.method == "POST":
      session.clear()
      
      REDIRECT_URL = 'login'
      
      schema = {
        'email': {
          'type': 'string',
          'regex': r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        },
        'password': {
          'type': 'string'
        }
      }
      
      v = Validator(schema)
            
      if not request.form["email"]:
        flash("Email is required!", "danger")
        
        return redirect(REDIRECT_URL)
      
      if not v.validate(request.form, schema):
        flash("Validation error, please check provided fields.", "danger")
        
        return redirect(REDIRECT_URL)

      db = get_db()
      rows = db.execute("SELECT * FROM users WHERE email = ?", (request.form["email"],)).fetchall()
      
      if not rows:
        flash(f"No user registered with {request.form['email']}!", "warning")
        
        return redirect(REDIRECT_URL)
      
      if not check_password_hash(rows[0]["hash"], request.form.get("password")):
        flash("Incorrect password!", "danger")
        
        return redirect(REDIRECT_URL)
      
      session["user"] = rows[0]["id"]
      return redirect("/dashboard")
    
    
@auth_pages.route("/register", methods=["GET", "POST"])
def register():
  if "user" in session:
    return redirect("/dashboard")
  
  if request.method == "GET":
    return render_template('auth/register.html')
  
  if request.method == 'POST':
    print(request.form)
    schema = {
      'email': {
        'type': 'string',
        'regex': r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$',
        'required': True
      },
      'password': {
        'type': 'string',
        'minlength': 6,
        'required': True,
      },
      'password_confirmation': {
        'type': 'string',
        'minlength': 6,
        'required': True,
      }
    }
    
    v = Validator(schema)
    
    if not v.validate(request.form, schema):
      errors = handle_errors(v._errors)
      flash('<br>'.join(errors), "danger")
      
      return redirect("/auth/register")  
    
    if (request.form["password"] != request.form["password_confirmation"]):
      flash("Passwords does not match!", "danger")
      
      return redirect("/auth/register")  

    db = get_db()
    check_user = db.execute("SELECT * from users WHERE email = ?", (request.form["email"],)).fetchall()

    if len(check_user) > 0:
      flash("Email is already registered", "danger")
      
      return redirect("/auth/register")  

    hashed_password = generate_password_hash(request.form["password"])
    db.execute("INSERT INTO users (email, hash) VALUES (?, ?)", (request.form["email"], hashed_password))
    db.commit()

    flash("Registered successfully, you can now login!", "success")

    return redirect("login")
  
  
@auth_pages.route("/logout")
def logout():
  session.clear()
  flash("Your are logged out!", "success")
  
  return redirect("/")
