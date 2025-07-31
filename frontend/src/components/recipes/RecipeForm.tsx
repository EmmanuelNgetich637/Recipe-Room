import React, { useState } from 'react';

type RecipeFormData = {
  title: string;
  ingredients: string;
  procedure: string;
  servings: number;
};

type RecipeFormProps = {
  onSubmit: (formData: RecipeFormData) => void;
};

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [procedure, setProcedure] = useState('');
  const [servings, setServings] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, ingredients, procedure, servings });
    setSubmitted(true);
    setTitle(''); 
    setIngredients('');
    setProcedure(''); 
    setServings(1); 
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <h2 className="mb-3 text-success text-center">Create Recipe</h2>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Ingredients</label>
        <textarea
          className="form-control"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Procedure</label>
        <textarea
          className="form-control"
          value={procedure}
          onChange={e => setProcedure(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Servings</label>
        <input
          type="number"
          className="form-control"
          value={servings}
          onChange={e => setServings(parseInt(e.target.value))}
          min={1}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100">Save Recipe</button>

      {submitted && (
        <div className="alert alert-success mt-3 text-center">
          Recipe submitted successfully!
        </div>
      )}
    </form>
  );
};

export default RecipeForm;
