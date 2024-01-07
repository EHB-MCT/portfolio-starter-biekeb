import React from "react";

const OnWin = () => {
  return (
    <div className="user-app">
      <h1 style={{ color: "white", marginTop: "30%" }}>You won!</h1>

      <a style={{ padding: "5%" }} href="/level">
        <button
          style={{
            padding: "10px",
            backgroundColor: "brown",
            border: "none",
            color: "white",
          }}
        >
          play again
        </button>
      </a>

      <a href="/user">
        <button
          style={{
            padding: "10px",
            backgroundColor: "red",
            border: "none",
            color: "white",
          }}
        >
          Main menu
        </button>
      </a>
    </div>
  );
};

export default OnWin;
