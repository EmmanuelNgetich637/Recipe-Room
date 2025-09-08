import { useState } from "react";

function GroupCard({ name, description, members, isMember, onToggle }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onToggle(); // onToggle should return a promise if using backend fetch
    setLoading(false);
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{name}</h5>
          <p className="card-text text-muted">{description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">{members} members</small>
          <button
            onClick={handleClick}
            className={`btn ${isMember ? "btn-danger" : "btn-success"}`}
            disabled={loading}
          >
            {loading ? "..." : isMember ? "Leave" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
