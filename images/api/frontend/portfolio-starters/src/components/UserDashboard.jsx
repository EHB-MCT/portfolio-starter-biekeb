import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="user-app">
      <h1 style={{ color: "white", marginTop: "30%" }}>Bieke Game</h1>
      <a style={{ padding: "5%" }} href="/level">
        <button
          style={{
            padding: "10px",
            backgroundColor: "brown",
            border: "none",
            color: "white",
          }}
        >
          Play game
        </button>
      </a>
      <a style={{ padding: "5%" }} href="/settings">
        <button
          style={{
            padding: "5px",
            backgroundColor: "brown",
            border: "none",
            color: "white",
          }}
          onClick={handleLogout}
        >
          Account
        </button>
      </a>

      <button
        style={{
          padding: "5px",
          backgroundColor: "red",
          border: "none",
          color: "white",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
