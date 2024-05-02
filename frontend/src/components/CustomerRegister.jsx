import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Subscription from "../pages/Subscription";

const initialState = {
  fullName: "",
  contactNumber: "",
  username: "",
  email: "",
  password: "",
};

function CustomerRegister() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7505/user/register-customer",
        formData
      );
      console.log(response.data);
      toast.success("Customer registered successfully!"); // Display success toast message
      alert("Customer registered successfully!");
      setFormData(initialState); // Reset form fields using initialState
      navigate("/user/login-customer")
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to register customer"); // Display error toast message
    }
  };


  return (
    <div>
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CustomerRegister;
