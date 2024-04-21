import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditManager() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "", // Edit this field as needed
    contactNumber: "", // Edit this field as needed
    username: "", // Edit this field as needed
    managerType: "", // Edit this field as needed
    email: "", // Edit this field as needed
    password: "", // Edit this field as needed
  });

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7505/user/get/${Id}`
        );
        const managerData = response.data;
        setFormData(managerData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchManager();
  }, [Id]);

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
      await axios.put(
        `http://localhost:7505/user/update-manager/${Id}`,
        formData
      );
      console.log("Manager details updated successfully!");
      alert("Manager details updated successfully!");
      navigate("/user/allmanagers");
      // Optionally, you can redirect the user or display a success message
    } catch (error) {
      console.error("Error:", error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Manager</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditManager;
