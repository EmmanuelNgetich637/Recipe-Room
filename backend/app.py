from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from backend.database import db   # absolute import, not relative
from backend.routes.recipe_routes import recipe_bp


def create_app():
    app = Flask(__name__)

    # DB config (SQLite for MVP)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///recipes.db"  # simpler path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    # Register blueprints
    app.register_blueprint(recipe_bp, url_prefix="/api/recipes")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
