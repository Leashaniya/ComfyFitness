import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditCustomer() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "", // Edit this field as needed
    contactNumber: "", // Edit this field as needed
    username: "", // Edit this field as needed
    email: "", // Edit this field as needed
    password: "", // Edit this field as needed
  });

  useEffect(() => {
    const fetchCustomer= async () => {
      try {
        const response = await axios.get(
          `http://localhost:7505/user/get/${Id}`
        );
        const customerData = response.data;
        setFormData(customerData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchCustomer();
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
        `http://localhost:7505/user/update-customer/${Id}`,
        formData
      );
      console.log("Customer details updated successfully!");
      alert("Customer details updated successfully!");
      navigate("/user/allcustomers");
      // Optionally, you can redirect the user or display a success message
    } catch (error) {
      console.error("Error:", error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Customer</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditCustomer;
