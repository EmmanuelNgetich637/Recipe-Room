from backend.database import db

class RecipeGroup(db.Model):
    __tablename__ = "recipe_groups"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255), default="")
    members = db.Column(db.Integer, default=0)
    posts = db.Column(db.JSON, default=[])  # ✅ use JSON to store list of posts

    def __repr__(self):
        return f"<RecipeGroup {self.name}>"
