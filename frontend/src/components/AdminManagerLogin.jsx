import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AdminManagerLogin.css'

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
      <form className="login-form" onSubmit={handleSubmit}>
        <table className="login-table">
          <tbody>
            <tr>
              <td><label htmlFor="role">Role:</label></td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td><label htmlFor="emailOrUsername">Email/Username:</label></td>
              <td>
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="password">Password:</label></td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">Login</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AdminManagerLogin;
