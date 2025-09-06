import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";

function RecipeCard({ recipe }) {
  const { favorites, addToFavorites, removeFromFavorites, toggleLike, addComment, deleteComment } = useFavorites();

  const isFavorite = favorites.some(fav => fav.id === recipe.id);
  const currentRecipe = favorites.find(fav => fav.id === recipe.id) || {};
  const liked = currentRecipe.liked || false;
  const comments = currentRecipe.comments || [];
  const [likes, setLikes] = useState(currentRecipe.likes || recipe.likes || 0);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(recipe.id, newComment);
      setNewComment("");
    }
  };

  const handleToggleLike = async () => {
    try {
      // Call backend API to update like
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${recipe.id}/like`, {
        method: "PATCH",
      });
      const data = await res.json();
      setLikes(data.likes); // update local like count
      toggleLike(recipe.id); // update context
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <img
        src={recipe.image || "https://via.placeholder.com/300x200"}
        alt={recipe.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">{recipe.description}</p>

        <div className="d-flex flex-wrap gap-2 mb-2">
          <button
            onClick={() =>
              isFavorite ? removeFromFavorites(recipe.id) : addToFavorites(recipe)
            }
            className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-primary"}`}
          >
            {isFavorite ? "Remove Favorite" : "Add to Favorites"}
          </button>

          <button
            onClick={handleToggleLike}
            className={`btn btn-sm ${liked ? "btn-pink text-white" : "btn-secondary"}`}
          >
            {liked ? "❤️ Liked" : "🤍 Like"} {likes}
          </button>
        </div>

        {isFavorite && (
          <div className="mt-3">
            <h6>Comments</h6>
            <div className="input-group mb-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="form-control"
              />
              <button className="btn btn-success" onClick={handleAddComment}>
                Add
              </button>
            </div>

            <ul className="list-group list-group-flush">
              {comments.map((c, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {c}
                  <button
                    onClick={() => deleteComment(recipe.id, index)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
