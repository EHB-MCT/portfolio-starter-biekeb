// AdminDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    age: "",
    role: "",
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  // Assume you have a function to retrieve the JWT token from your authentication system
  const retrieveToken = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  };
  useEffect(() => {
    retrieveToken();

    // Fetch all users when the component mounts
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [token]);

  const handleUserClick = (user) => {
    // Set the selected user when an admin clicks on a user
    setSelectedUser(user);
    setUpdatedUser({
      name: user.name,
      email: user.email,
      age: user.age,
      role: user.role,
    });
  };

  const handleUpdateUser = () => {
    axios
      .put(
        `http://localhost:3000/admin/users/${selectedUser.id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Update the local state with the updated user
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? response.data : user
          )
        );
        // Clear the selected user and updatedUser state
        setSelectedUser(null);
        setUpdatedUser({
          name: "",
          email: "",
          age: "",
          role: "",
        });
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="container">
      <button onClick={handleLogout}>Logout</button>
      <h1>Admin Panel</h1>

      <div>
        <h2>Edit user</h2>
        <h3>Users</h3>
        <ul className="list">
          {users.map((user) => (
            <li
              className="list-item"
              key={user.id}
              onClick={() => handleUserClick(user)}
            >
              <p>name: {user.name}</p>
              <p>email: {user.email}</p>
              <p>age: {user.age}</p>
              <p>role: {user.role}</p>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="update-user-form">
          <h2>Update User</h2>
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={updatedUser.name}
            className="form-input"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
          />
          <label>Email:</label>
          <input
            type="text"
            value={updatedUser.email}
            className="form-input"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
          />
          <label>Age:</label>
          <input
            type="text"
            value={updatedUser.age}
            className="form-input"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, age: e.target.value })
            }
          />
          <label>Role:</label>
          <input
            type="text"
            value={updatedUser.role}
            className="form-input"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, role: e.target.value })
            }
          />
          <button onClick={handleUpdateUser} className="form-button">
            Update User
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
