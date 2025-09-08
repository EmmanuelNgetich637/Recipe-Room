from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from backend.database import db


# Import blueprints here (only after db is defined)
from backend.routes.recipe_routes import recipe_bp
from backend.routes.group_routes import groups_bp


def create_app():
    app = Flask(__name__)

    # DB config (SQLite for MVP)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///recipes.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Init extensions
    db.init_app(app)
    Migrate(app, db)
    CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5173"}}, supports_credentials=True)

    # Home route
    @app.route("/")
    def home():
        return "Recipe Room Backend is running!"

    # Register blueprints
    app.register_blueprint(recipe_bp, url_prefix="/api/recipes")
    app.register_blueprint(groups_bp, url_prefix="/api/groups")

    return app
