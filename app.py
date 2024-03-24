from dotenv import load_dotenv
load_dotenv()

from flask import Flask, render_template, g
from flask_session import Session
from routes import auth_pages, dashboard_pages, business_pages, item_pages, category_pages, menu_pages
from utils import load_svg, usd


app = Flask(__name__)
app.jinja_env.filters["load_svg"] = load_svg
app.jinja_env.filters["usd"] = usd
app.register_blueprint(auth_pages)
app.register_blueprint(dashboard_pages)
app.register_blueprint(business_pages)
app.register_blueprint(item_pages)
app.register_blueprint(category_pages)
app.register_blueprint(menu_pages)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/")
def index():
            
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)