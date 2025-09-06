import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../hooks/useFavorites";
import { fetchRecipes } from "../api/recipes";

function Recipes() {
  const { favorites } = useFavorites();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes()
      .then((data) => {
        // Merge favorites info with fetched recipes
        const updatedRecipes = data.map((recipe) => {
          const fav = favorites.find((f) => f.id === recipe.id);
          return {
            ...recipe,
            is_favorite: fav ? true : false,
            liked: fav?.liked || false,
            comments: fav?.comments || [],
            likes: fav?.likes ?? recipe.likes,
          };
        });
        setRecipes(updatedRecipes);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [favorites]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container py-4">
      <h1 className="display-4 mb-4">Recipes 🍲</h1>

      <div className="row g-3">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-12 col-sm-6 col-md-4">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
