import { useNavigate } from 'react-router-dom';
import RecipeForm from "../components/recipes/RecipeForm";
import API from '../api/axios'; 

const CreateRecipe = () => { 
  const navigate = useNavigate();

  const handleCreate = async (data: {
    title: string;
    ingredients: string;
    procedure: string;
    servings: number;
  }) => {
    try {
      const ingredientsList = data.ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const payload = {
        title: data.title,
        ingredients: ingredientsList,
        instructions: data.procedure,
        serves: data.servings,
        country: "Unknown",
        user_id: 1
      };

      await API.post('/recipes', payload);
      navigate('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-success mb-4">Add a New Recipe</h1>
      <RecipeForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateRecipe;
