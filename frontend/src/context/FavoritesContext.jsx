import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recipe) => {
    setFavorites((prev) =>
      prev.find((fav) => fav.id === recipe.id)
        ? prev
        : [...prev, { ...recipe, likes: 0, comments: [] }]
    );
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const toggleLike = (id) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.id === id ? { ...fav, likes: (fav.likes || 0) + 1 } : fav
      )
    );
  };

  const addComment = (id, comment) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.id === id
          ? { ...fav, comments: [...(fav.comments || []), comment] }
          : fav
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, toggleLike, addComment }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
