import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import RecipeCard from "../components/RecipeCard";

function AddCommentForm({ recipeId }) {
  const { addComment } = useFavorites();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(recipeId, text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mt-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="form-control flex-grow-1"
      />
      <button type="submit" className="btn btn-primary">
        Comment
      </button>
    </form>
  );
}

function Favorites() {
  const { favorites, toggleLike } = useFavorites();

  return (
    <div className="container py-4">
      <h2 className="display-5 mb-4">Your Favorites ❤️</h2>

      {favorites.length === 0 ? (
        <p className="text-muted">No favorites yet. Add some recipes!</p>
      ) : (
        <div className="row g-3">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <RecipeCard recipe={recipe} />

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <button
                      onClick={() => toggleLike(recipe.id)}
                      className={`btn ${
                        recipe.liked ? "btn-danger" : "btn-outline-danger"
                      }`}
                    >
                      ❤️ {recipe.likes || 0}
                    </button>
                  </div>

                  <h6>Comments:</h6>
                  {recipe.comments && recipe.comments.length > 0 ? (
                    <ul className="list-group list-group-flush mb-2">
                      {recipe.comments.map((c, i) => (
                        <li key={i} className="list-group-item px-0 py-1">
                          {c}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted small mb-2">No comments yet.</p>
                  )}

                  <AddCommentForm recipeId={recipe.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
