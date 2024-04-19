import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminManagerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7505/user/login-adminAndManger",
        formData
      );
      const { role } = response.data;
      console.log(response.data);
      // Handle successful login, such as redirecting to dashboard
      alert("Logged in successfully!");
      if (role === "Admin") {
        navigate("/user/adminHome"); // Redirect to admin page
      } else if (role === "Manager") {
        navigate("/user/managerHome"); // Redirect to manager page
      }
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      // Handle login error, such as displaying an error message
    }
  };

  return (
    <div>
      <h2>Management Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div>
          <label htmlFor="emailOrUsername">Email/Username:</label>
          <input
            type="text"
            id="emailOrUsername"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminManagerLogin;

