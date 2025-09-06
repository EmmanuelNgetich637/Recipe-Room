import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/recipes");
  };

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="card mb-5 shadow-lg border-0 rounded-lg overflow-hidden">
        <div className="row g-0 align-items-center">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              className="img-fluid"
              alt="Cooking"
            />
          </div>
          <div className="col-md-6 p-4">
            <h1 className="display-5 fw-bold">Welcome to Recipe Room 🍳</h1>
            <p className="lead text-muted">
              Discover delicious recipes, join foodie groups, and save your favorites.
            </p>
            <button className="btn btn-success btn-lg" onClick={handleExplore}>
              Explore Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
