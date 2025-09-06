import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Backend API URL (Vite-compatible)
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://127.0.0.1:5000/api/recipes";

  // Fetch all recipes from backend on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${API_URL}/`);
        const data = await res.json();

        // Initialize local favorite state
        const initialized = data.map((recipe) => ({
          ...recipe,
          liked: recipe.likes > 0,
          comments: [],
        }));

        setFavorites(initialized);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };

    fetchFavorites();
  }, [API_URL]);

  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites((prev) => [...prev, { ...recipe, liked: false, comments: [] }]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const toggleLike = (id) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.id === id
          ? { ...fav, liked: !fav.liked, likes: fav.liked ? fav.likes - 1 : fav.likes + 1 }
          : fav
      )
    );
  };

  const addComment = (id, comment) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.id === id ? { ...fav, comments: [...fav.comments, comment] } : fav
      )
    );
  };

  const deleteComment = (id, index) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.id === id
          ? { ...fav, comments: fav.comments.filter((_, i) => i !== index) }
          : fav
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleLike,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
