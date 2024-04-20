import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      toast.error("Failed to add  subscription"); // Display error toast message
    }
  };

  return (
    <div>
      <h2>SuscriptionAdd</h2>
      <form onSubmit={handleSubmit}>
      <label>
        packageName:
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        duration:
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        category:
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          
        </label>
        <br />
        
      
        <label>
        startDate:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
        endDate:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default SuscriptionAdd;
