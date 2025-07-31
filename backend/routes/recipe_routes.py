from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app.extensions import db 
from app.models import Recipe, Ingredient  # Include Ingredient
import requests

recipe_bp = Blueprint('recipes', __name__)

@recipe_bp.route('/', methods=['GET'])
@cross_origin(origins=[
    "http://localhost:5173", "http://127.0.0.1:5173",
    "http://localhost:5174", "http://127.0.0.1:5174"
], supports_credentials=True)
def get_recipes():
    name = request.args.get('name')
    ingredient = request.args.get('ingredient')
    country = request.args.get('country')

    base_url = "https://www.themealdb.com/api/json/v1/1/"
    if name:
        url = f"{base_url}search.php?s={name}"
    elif ingredient:
        url = f"{base_url}filter.php?i={ingredient}"
    elif country:
        url = f"{base_url}filter.php?a={country}"
    else:
        url = f"{base_url}latest.php"

    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@recipe_bp.route('/', methods=['POST'])
@cross_origin(origins=[
    "http://localhost:5173", "http://127.0.0.1:5173",
    "http://localhost:5174", "http://127.0.0.1:5174"
], supports_credentials=True)
def create_recipe():
    try:
        data = request.json
        ingredients = data.get('ingredients', [])
        if not isinstance(ingredients, list):
            return jsonify({"error": "Ingredients must be a list"}), 400

        recipe = Recipe(
            title=data['title'],
            description=data.get('description', ''),
            procedure=data['instructions'],
            country=data.get('country', ''),
            number_of_people_served=data['serves'],
            user_id=data.get('user_id', 1)
        )

        ingredient_objs = [Ingredient(name=ing.strip(), recipe=recipe) for ing in ingredients]
        recipe.ingredients.extend(ingredient_objs)

        db.session.add(recipe)
        db.session.commit()
        return jsonify({"message": "Recipe created"}), 201

    except Exception as e:
        print("Error creating recipe:", e)
        return jsonify({"error": "Failed to create recipe"}), 500
