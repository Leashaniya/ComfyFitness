import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  paymentAmount: "",
  paymentDate: "",
  pDescription: "",
  pAddressl: "",
  pCountry: "",
  paymentType: "",
  userId: "",
};

function PaymentAdd() {
  const { packageName, amount, duration } = useParams();
  const [formData, setFormData] = useState(initialState);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

   useEffect(() => {
     // Calculate expiration date
     const paymentDate = new Date();
     const expirationDate = new Date(paymentDate);
     expirationDate.setMonth(paymentDate.getMonth() + parseInt(duration));

     setFormData({
       userId,
       paymentAmount: amount,
       paymentDate: paymentDate.toISOString().split("T")[0], // Store only the date
       packageName,
       expirationDate: expirationDate.toISOString().split("T")[0], // Store only the date
     });
   }, [userId, packageName, amount, duration]);

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
      toast.success("Payment added successfully!");
      alert("Payment added successfully!");
      setFormData(initialState);
      navigate(`/payment/success/${packageName}/${amount}/${userId}`);
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add payment");
      alert("Payment unsuccessful");
      navigate("/subs");
    }
  };
  return (
    <div>
      <h2>PaymentAdd</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Package Name: {packageName} {/* Displaying packageName */}
        </label>
        <br />
        <label>paymentAmount: {amount}</label>
        <br />
        <label>paymentDate : {new Date().toISOString().split("T")[0]}</label>

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
            {/* <option value="Online">Online</option> */}
            <option value="Offline">Offline</option>
          </select>
        </label>
        <br />
        <button type="submit">Add</button>
        
      </form>
     
    </div>
  );
}

export default PaymentAdd;
