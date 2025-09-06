function GroupCard({ name, description, members, isMember, onToggle }) {
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
            onClick={onToggle}
            className={`btn ${isMember ? "btn-danger" : "btn-success"}`}
          >
            {isMember ? "Leave" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
