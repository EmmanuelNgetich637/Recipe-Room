import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../hooks/useFavorites";

function Recipes() {
  const { favorites, addToFavorites } = useFavorites();

  const recipes = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      image: "https://picsum.photos/300/200?random=1",
      description: "Classic Italian pasta with rich meat sauce.",
    },
    {
      id: 2,
      title: "Chicken Curry",
      image: "https://picsum.photos/300/200?random=2",
      description: "Spicy and flavorful curry with tender chicken.",
    },
    // You can add more recipes here
  ];

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
