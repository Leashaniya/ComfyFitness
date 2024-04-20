import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SubscriptionAdd.css";

const initialState = {
    paymentAmount: "",
    paymentDate:"",
    pDescription: "",
    pAddressl:"",
    pCountry: "",
};

function PaymentAdd() {
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
        "http://localhost:7505/payment/add",
        formData
      );
      console.log(response.data);
      toast.success("payment added successfully!"); // Display success toast message
      alert("payment added successfully!");
      setFormData(initialState); // Reset form fields using initialState
      navigate("/payment/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add  payment"); // Display error toast message
    }
  };

  return (
    <div>
      <h2>PaymentAdd</h2>
      <form onSubmit={handleSubmit}>
      <label>
      paymentAmount:
          <input
            type="Number"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        paymentDate
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        pDescription:
          <input
            type="text"
            name="pDescription"
            value={formData.pDescription}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        pAddressl:
          <input
            type="text"
            name="pAddressl"
            value={formData.pAddressl}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
        pCountry:
          <input
            type="text"
            name="pCountry"
            value={formData.pCountry}
            onChange={handleChange}
            required
          />
          
        </label>
        <br />
        
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default PaymentAdd;