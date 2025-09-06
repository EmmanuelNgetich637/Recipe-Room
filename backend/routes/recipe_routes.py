from flask import Blueprint, jsonify, request
from backend.database import db
from backend.models.recipe import Recipe

recipe_bp = Blueprint("recipe_bp", __name__)

# List all recipes
@recipe_bp.route("/", methods=["GET"])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes]), 200


# Create new recipe
@recipe_bp.route("/", methods=["POST"])
def create_recipe():
    data = request.get_json()
    new_recipe = Recipe(
        title=data.get("title"),
        description=data.get("description"),
        ingredients=data.get("ingredients"),
        instructions=data.get("instructions"),
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(new_recipe.to_dict()), 201


# Like a recipe
@recipe_bp.route("/<int:recipe_id>/like", methods=["PATCH"])
def like_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    recipe.likes += 1
    db.session.commit()
    return jsonify(recipe.to_dict()), 200


# Toggle favorite
@recipe_bp.route("/<int:recipe_id>/favorite", methods=["PATCH"])
def toggle_favorite(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    recipe.is_favorite = not recipe.is_favorite
    db.session.commit()
    return jsonify(recipe.to_dict()), 200
