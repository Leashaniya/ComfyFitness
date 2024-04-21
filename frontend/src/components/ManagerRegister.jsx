import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: "",
  contactNumber: "",
  username: "",
  managerType: "",
  email: "",
  password: "",
};

function ManagerRegister() {
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
        "http://localhost:7505/user/register-manager",
        formData
      );
      console.log(response.data);
      toast.success("Manager registered successfully!"); // Display success toast message
      alert("Manager registered successfully!");
      setFormData(initialState); // Reset form fields using initialState
      navigate("/user/allmanagers");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to register manager"); // Display error toast message
    }
  };

  return (
    <div>
      <h2>Manager Registration</h2>
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
        <label>
          Manager Type:
          <select
            name="managerType"
            value={formData.managerType}
            onChange={handleChange}
            required
          >
            <option value="">Select Manager Type</option>
            <option value="Inventory">Inventory</option>
            <option value="Supplier">Supplier</option>
            <option value="Feedback">Feedback</option>
            <option value="Finance">Finance</option>
            <option value="Employee">Employee</option>
            <option value="Order">Order</option>
          </select>
        </label>
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

export default ManagerRegister;
