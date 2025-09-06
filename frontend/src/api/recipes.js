// src/api/recipes.js
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://127.0.0.1:5000/api/recipes";

export const fetchRecipes = async () => {
  console.log("Fetching from API_URL:", API_URL);
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch recipes from backend");
  return res.json();
};
