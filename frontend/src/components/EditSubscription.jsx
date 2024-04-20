// export default EditCustomer;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditSubscription() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    packageName: "", // Edit this field as needed
    price: "", // Edit this field as needed
    duration: "", // Edit this field as needed
    description: "", // Edit this field as needed
    category: "", 
    startDate: "", 
    endDate: "", // Edit this field as needed
  });

  useEffect(() => {
    const fetchSubscription= async () => {
      try {
        const response = await axios.get(
          `http://localhost:7505/subscription/get/${Id}`
        );
        const subscriptionData = response.data;
        setFormData(subscriptionData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSubscription();
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
        `http://localhost:7505/subscription/update/${Id}`,
        formData
      );
      console.log("subscription details updated successfully!");
      alert("subscription details updated successfully!");
      navigate("/subscription/");
      // Optionally, you can redirect the user or display a success message
    } catch (error) {
      console.error("Error:", error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Subscription</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditSubscription;
