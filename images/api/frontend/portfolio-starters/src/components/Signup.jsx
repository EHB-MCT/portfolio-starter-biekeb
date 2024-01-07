import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert the age to a number if the name is "age"
    const processedValue = name === "age" ? parseInt(value, 10) : value;

    setFormData({ ...formData, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("FormData:", formData);

      const response = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error.response.data);
    }
  };

  return (
    <div className="user-form">
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Age:
          <input
            className="form-input"
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="submit-button" type="submit">
          Create User
        </button>
      </form>
      <p className="existing-account">Already have an account?</p>
      <a href="/login" className="login-link">
        <button className="login-button">Login</button>
      </a>
    </div>
  );
};

export default Signup;
