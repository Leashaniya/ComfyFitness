// export default EditCustomer;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPayment() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paymentAmount: "",
    paymentDate:"",
    pDescription: "",
    pAddressl:"",
    pCountry: "",
  });

  useEffect(() => {
    const fetchPayment= async () => {
      try {
        const response = await axios.get(
            `http://localhost:7505/payment/get/${Id}`
        );
        const paymentData = response.data;
        setFormData(paymentData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchPayment();
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
        `http://localhost:7505/payment/update/${Id}`,
        formData
      );
      console.log("payment details updated successfully!");
      alert("payment details updated successfully!");
      navigate("/payment/");
      // Optionally, you can redirect the user or display a success message
    } catch (error) {
      console.error("Error:", error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Payment</h2>
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

export default EditPayment;