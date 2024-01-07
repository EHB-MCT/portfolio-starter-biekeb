import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Assuming you are using React Router

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const { token, role } = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        navigate(`/${role}`);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      setError("Login failed");
    }
  };

  return (
    <div className="App">
      <div className="user-form">
        <div className="form">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit-button" onClick={handleLogin}>
            Login
          </button>
        </div>
        <p className="existing-account">No account?</p>

        <a href="/" className="login-link">
          <button className="login-button">Signup</button>
        </a>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
