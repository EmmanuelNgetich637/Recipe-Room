import { useState, useEffect } from "react";
import GroupCard from "../components/GroupCard";

const BASE_URL = "http://127.0.0.1:5000/api";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [tab, setTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch groups from backend
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`${BASE_URL}/groups`);
        if (!res.ok) throw new Error(`Error fetching groups: ${res.status}`);
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    if (!newGroup.name.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGroup),
      });

      if (!res.ok) {
        console.error("Failed to create group:", res.status);
        return;
      }

      const createdGroup = await res.json();
      setGroups([...groups, { ...createdGroup, members: 1, posts: [], joined: true }]);
      setNewGroup({ name: "", description: "" });
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  const handleAddPost = (groupId, post) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, posts: [...g.posts, post] } : g));
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const res = await fetch(`${BASE_URL}/groups/${groupId}/join`, { method: "POST" });
      if (res.ok) {
        setGroups(groups.map(g => g.id === groupId && !g.joined ? { ...g, members: g.members + 1, joined: true } : g));
      } else {
        console.error("Failed to join group:", res.status);
      }
    } catch (err) {
      console.error("Error joining group:", err);
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      const res = await fetch(`${BASE_URL}/groups/${groupId}/leave`, { method: "POST" });
      if (res.ok) {
        setGroups(groups.map(g => g.id === groupId && g.joined ? { ...g, members: g.members - 1, joined: false } : g));
        if (selectedGroup?.id === groupId) setSelectedGroup({ ...selectedGroup, joined: false });
      } else {
        console.error("Failed to leave group:", res.status);
      }
    } catch (err) {
      console.error("Error leaving group:", err);
    }
  };

  // Filtering & sorting
  let displayedGroups = tab === "all" ? groups : groups.filter(g => g.joined);
  if (searchTerm.trim()) {
    displayedGroups = displayedGroups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  displayedGroups = [...displayedGroups].sort((a, b) => sortOrder === "asc" ? a.members - b.members : b.members - a.members);

  const recommendedGroups = groups.filter(g => !g.joined).sort((a, b) => b.members - a.members).slice(0, 2);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Groups 👥</h2>

      {/* Recommended */}
      {recommendedGroups.length > 0 && (
        <div className="mb-4">
          <h4>Recommended for you 🌟</h4>
          <div className="row">
            {recommendedGroups.map(group => (
              <div className="col-md-6 mb-3" key={group.id}>
                <div className="card border-warning shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{group.name}</h5>
                    <p className="card-text">{group.description}</p>
                    <small className="text-muted">{group.members} members</small>
                    <button className="btn btn-primary btn-sm mt-2" onClick={() => handleJoinGroup(group.id)}>Join Group</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>All Groups</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "my" ? "active" : ""}`} onClick={() => setTab("my")}>My Groups</button>
        </li>
      </ul>

      {/* Search & Sort */}
      <div className="row mb-3">
        <div className="col-md-8 mb-2">
          <input type="text" className="form-control" placeholder="🔍 Search groups..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Sort: Most Members</option>
            <option value="asc">Sort: Fewest Members</option>
          </select>
        </div>
      </div>

      {/* Create Group */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Create a Group</h5>
          <input type="text" className="form-control mb-2" placeholder="Group Name" value={newGroup.name} onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} />
          <textarea className="form-control mb-2" placeholder="Group Description" value={newGroup.description} onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}></textarea>
          <button className="btn btn-success" onClick={handleCreateGroup}>Create</button>
        </div>
      </div>

      {/* Group List */}
      <div className="row">
        {displayedGroups.length === 0 ? (
          <p>{tab === "my" ? "You haven't joined any groups yet." : "No groups found."}</p>
        ) : (
          displayedGroups.map(group => (
            <div className="col-md-6 mb-3" key={group.id}>
              <GroupCard
                name={group.name}
                description={group.description}
                members={group.members}
                isMember={group.joined}
                onToggle={() => group.joined ? handleLeaveGroup(group.id) : handleJoinGroup(group.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Selected Group */}
      {selectedGroup && (
        <div className="card mt-4">
          <div className="card-body">
            <h5>{selectedGroup.name}</h5>
            <p>{selectedGroup.description}</p>
            <h6>Posts</h6>
            {selectedGroup.posts.length === 0 ? <p>No posts yet. Be the first!</p> :
              <ul>
                {selectedGroup.posts.map((post, idx) => <li key={idx}>{post}</li>)}
              </ul>
            }
            {selectedGroup.joined && (
              <input type="text" className="form-control mt-2" placeholder="Write something..." onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleAddPost(selectedGroup.id, e.target.value);
                  e.target.value = "";
                }
              }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Groups;
