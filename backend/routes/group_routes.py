from flask import Blueprint, jsonify, request
from backend.database import db
from backend.models.groups import RecipeGroup

groups_bp = Blueprint("groups", __name__)

def serialize_group(group):
    return {
        "id": group.id,
        "name": group.name,
        "description": group.description or "",
        "members": group.members or 0,
        "posts": group.posts or [],
        "joined": getattr(group, "joined", False)
    }

@groups_bp.route("/", methods=["GET"])
def get_groups():
    groups = RecipeGroup.query.all()
    return jsonify([serialize_group(g) for g in groups]), 200

@groups_bp.route("/<int:group_id>", methods=["GET"])
def get_group(group_id):
    group = RecipeGroup.query.get_or_404(group_id)
    return jsonify(serialize_group(group)), 200

@groups_bp.route("/", methods=["POST"])
def create_group():
    data = request.get_json() or {}
    name = data.get("name")
    description = data.get("description", "")
    if not name:
        return jsonify({"error": "Group name is required"}), 400
    group = RecipeGroup(name=name, description=description, members=1, posts=[])
    db.session.add(group)
    db.session.commit()
    setattr(group, "joined", True)
    return jsonify(serialize_group(group)), 201

@groups_bp.route("/<int:group_id>/join", methods=["POST"])
def join_group(group_id):
    group = RecipeGroup.query.get_or_404(group_id)
    group.members = (group.members or 0) + 1
    setattr(group, "joined", True)
    db.session.commit()
    return jsonify({"success": True, "members": group.members, "joined": True}), 200

@groups_bp.route("/<int:group_id>/leave", methods=["POST"])
def leave_group(group_id):
    group = RecipeGroup.query.get_or_404(group_id)
    group.members = max((group.members or 1) - 1, 0)
    setattr(group, "joined", False)
    db.session.commit()
    return jsonify({"success": True, "members": group.members, "joined": False}), 200

@groups_bp.route("/<int:group_id>/posts", methods=["POST"])
def add_post(group_id):
    group = RecipeGroup.query.get_or_404(group_id)
    data = request.get_json() or {}
    content = data.get("content", "").strip()
    if not content:
        return jsonify({"error": "Post content is required"}), 400
    if not hasattr(group, "posts") or group.posts is None:
        group.posts = []
    group.posts.append(content)
    db.session.commit()
    return jsonify({"success": True, "posts": group.posts}), 201

@groups_bp.route("/<int:group_id>/posts", methods=["GET"])
def get_posts(group_id):
    group = RecipeGroup.query.get_or_404(group_id)
    return jsonify(group.posts or []), 200
