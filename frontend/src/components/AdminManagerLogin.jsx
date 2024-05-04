import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AdminManagerLogin.css'
import shitIMG from '../assets/shitIMG.png'

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
   <div className="mnShit" style={{ backgroundImage: `url(${shitIMG})` }}>
    <div className="shittyForm">
      <h2 className="h2Sush">Management Login</h2>
     <div>
       <form className="mnForm" onSubmit={handleSubmit}>
        <div>
            <label className="lbl" htmlFor="role">Role:</label>
              <div>
                <select
                  className="fashions"
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
        </div>
        <div>
            <label className="lbl" htmlFor="emailOrUsername">Email/Username:</label>
              <div>
                <input
                  className="fashions"
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  required
                />
              </div>
        </div>
        <div>
            <label className="lbl" htmlFor="password">Password:</label>
              <div>
                <input
                  className="fashions"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
        </div>
           <button className="mkcntr" type="submit">Login</button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default AdminManagerLogin;
