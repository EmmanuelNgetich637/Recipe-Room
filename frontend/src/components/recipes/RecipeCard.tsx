import React from 'react';
import { Link } from 'react-router-dom';

export type Recipe = {
  id: number;
  title: string;
  imageUrl?: string;   
  servings?: number;
  country?: string;
  rating?: number;
};

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, title, imageUrl, servings, country, rating } = recipe;

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/recipes/${id}`} className="text-decoration-none text-dark">
        <img
          src={imageUrl || "/default-image.jpg"}
          className="card-img-top"
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-image.jpg";
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text mb-1">
            <strong>Serves:</strong> {servings ?? 'N/A'}
          </p>
          <p className="card-text mb-1">
            <strong>Country:</strong> {country ?? 'Unknown'}
          </p>
          <p className="card-text">
            <strong>Rating:</strong> {rating ? `${rating} ⭐` : 'Not rated'}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
