import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SubscriptionAdd.css";

// Initial state of the form fields

const initialState = {
    packageName: "", // Edit this field as needed
    price: "", // Edit this field as needed
    duration: "", // Edit this field as needed
    description: "", // Edit this field as needed
    category: "", 
    startDate: "", 
    endDate: "",
};

function SuscriptionAdd() {
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
        "http://localhost:7505/subscription/add",
        formData
      );
      console.log(response.data);
      toast.success("subscription added successfully!"); // Display success toast message
      alert("subscription added successfully!");
      setFormData(initialState); // Reset form fields using initialState
      navigate("/subscription/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add subscription"); // Display error toast message
    }
  };

  return (
    <div className="main-form">
      <h2>Add Subscription</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form1">
      <div className="devb">
      <label>
        Package Name: 
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            required
          />
        </label>
        </div>
        <div className="devb">
        <label>
        Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        </div>
        <div className="devb">
        <label>
        Duration:
        <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </label></div>
        <div className="devb">
          <label>Description:
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        </div>
        </div>
        <div className="form2">
        <div className="devb">
        <label>
        Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          
        </label>
        </div>    
        <div className="devb"><label>
        Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label></div>
        <div className="devb"><label>
        End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </label></div>
        
        <div><button type="submit">Add</button></div>
        </div>
      </form>
      
    </div>
  );
}

export default SuscriptionAdd;
