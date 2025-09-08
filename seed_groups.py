from backend.models.groups import RecipeGroup
from backend.app import create_app
from backend.database import db

app = create_app()
app.app_context().push()

def seed_groups():
    groups = ["Breakfast", "Lunch", "Dinner", "Desserts", "Snacks"]

    for name in groups:
        if not RecipeGroup.query.filter_by(name=name).first():
            group = RecipeGroup(name=name)
            db.session.add(group)

    db.session.commit()
    print("✅ Seeded recipe groups successfully!")

if __name__ == "__main__":
    seed_groups()
