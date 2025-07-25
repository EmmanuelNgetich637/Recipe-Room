from dotenv import load_dotenv
from flask_restful import Api

from app import create_app
from backend.app.extension import db
from app.models import User, Recipe, Rating, GroupRecipe, Bookmark, Ingredient, Comment
load_dotenv()

app = create_app()
api = Api(app)

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Recipe': Recipe,
        'Rating': Rating,
        'GroupRecipe': GroupRecipe,
        'Bookmark': Bookmark,
        'Ingredient': Ingredient,
        'Comment': Comment
    }

if __name__ == '__main__':
    app.run(debug=True)