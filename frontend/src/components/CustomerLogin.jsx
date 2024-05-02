import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const CustomerLogin = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
        "http://localhost:7505/user/login-customer",
        formData
      );
      console.log(response.data);
      const { userId } = response.data;
      toast.success("Logged in successfully!");
      alert(" You have Logged in successfully!");
      navigate(`/user/get/${userId}`);
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      toast.error("Login error!");

    }
  };

  return (
    <div className="container">
      <h2>CustomerLogin</h2>
      <form onSubmit={handleSubmit}>
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
      <ToastContainer />
    </div>
  );
};

export default CustomerLogin;
