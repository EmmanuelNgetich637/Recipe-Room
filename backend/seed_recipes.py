# backend/seed_recipes.py
from backend.models.recipe import Recipe, RecipeGroup
from backend.app import create_app
from backend.database import db

app = create_app()
app.app_context().push()

recipes = [
    {
        "title": "Spaghetti Bolognese",
        "description": "Classic Italian pasta with rich meat sauce.",
        "ingredients": "Spaghetti, ground beef, tomato sauce, onions, garlic, olive oil, basil, salt, pepper",
        "instructions": "1. Cook spaghetti. 2. Prepare sauce with beef and tomatoes. 3. Mix and serve.",
        "likes": 10,
        "group_name": "Dinner"
    },
    {
        "title": "Chicken Caesar Salad",
        "description": "Fresh romaine lettuce with grilled chicken and Caesar dressing.",
        "ingredients": "Romaine lettuce, grilled chicken, croutons, Parmesan, Caesar dressing",
        "instructions": "1. Chop lettuce. 2. Grill chicken. 3. Toss all ingredients together.",
        "likes": 7,
        "group_name": "Lunch"
    },
    {
        "title": "Chocolate Brownies",
        "description": "Fudgy chocolate brownies with a crispy top.",
        "ingredients": "Chocolate, butter, sugar, eggs, flour, vanilla extract, salt",
        "instructions": "1. Melt chocolate and butter. 2. Mix in sugar, eggs, and flour. 3. Bake at 180°C for 25 minutes.",
        "likes": 15,
        "group_name": "Desserts"
    },
    {
        "title": "Avocado Toast",
        "description": "Simple and healthy avocado toast with toppings.",
        "ingredients": "Bread, avocado, lemon juice, salt, pepper, cherry tomatoes",
        "instructions": "1. Toast bread. 2. Mash avocado with lemon juice. 3. Spread and top with tomatoes.",
        "likes": 12,
        "group_name": "Breakfast"
    },
]

for r in recipes:
    group = RecipeGroup.query.filter_by(name=r["group_name"]).first()
    recipe = Recipe(
        title=r["title"],
        description=r["description"],
        ingredients=r["ingredients"],
        instructions=r["instructions"],
        likes=r["likes"],
        group_id=group.id if group else None
    )
    db.session.add(recipe)

db.session.commit()
print("Seeded recipes successfully!")
