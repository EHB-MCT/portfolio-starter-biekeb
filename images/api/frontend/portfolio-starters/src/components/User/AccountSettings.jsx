import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountSettings = ({ userId }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  useEffect(() => {
    // Fetch user data when userId is available
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        const userData = response.data;

        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateAccount = async () => {
    try {
      // Update user account
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        userData
      );

      console.log("User account updated:", response.data);
    } catch (error) {
      console.error("Error updating user account:", error.response.data);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Delete user account
      const response = await axios.delete(
        `http://localhost:3000/users/${userId}`
      );

      console.log("User account deleted:", response.data);
    } catch (error) {
      console.error("Error deleting user account:", error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled // Email is disabled for editing
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={userData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdateAccount}>
          Update Account
        </button>
        <button type="button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
