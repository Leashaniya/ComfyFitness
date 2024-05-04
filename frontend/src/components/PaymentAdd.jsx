import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const initialState = {
    paymentAmount: "",
    paymentDate:"",
    pDescription: "",
    pAddressl:"",
    pCountry: "",
    paymentType:""
};


function PaymentAdd() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch paymentAmount from localStorage and set it in the formData
    const storedPaymentAmount = localStorage.getItem("price");
    if (storedPaymentAmount) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        paymentAmount: storedPaymentAmount,
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(
        "http://localhost:7505/payment/add",
        
        formData
      );
      console.log(response.data);
      if (formData.paymentType === "Online") {
        toast.info("Please fill the card details");
        alert("Please fill the card details!"); // Display info toast message
      } else {
        toast.success("Payment added successfully!"); // Display success toast message
        alert("Payment added successfully!");
      }
      setFormData(initialState); // Reset form fields using initialState

 
      // Navigate based on the selected payment type
      if (formData.paymentType === "Online") {
        navigate("/payment/pay");
      } else {
        navigate("/payment/success");
      }
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
            readOnly
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

        <label>
        paymentType:
        <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
          >
            <option value="">Select payment Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          
        </label>
        
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default PaymentAdd;




