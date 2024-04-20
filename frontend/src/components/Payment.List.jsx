import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7505/payment/"
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchPayments();
  }, []);

  const handleEdit = (id) => {
    navigate(`/payment/update/${id}`); // Navigate to edit page
  };

  
  const handleCreate = (id) => {
    navigate('/payment/add'); // Navigate to edit page
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/payment/delete/${id}`);
      setPayments(payments.filter((payment) => payment.Id !== id));
      console.log("payment deleted successfully!");
      alert("payment deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredPayments = payments.filter((payment) =>
    Object.values(payment).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h2>Payment List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={() => handleCreate()}>
                  Create a new payment
                </button>
      <table>
        <thead>
          <tr>
            <th>paymentID</th>
            <th>paymentAmount</th>
            <th>paymentDate</th>
            <th>pDescription</th>
            <th>pAddressl</th>
            <th>pCountry</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.Id}>
              <td>{payment.Id}</td>
              <td>{payment.paymentAmount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.pDescription}</td>
              <td>{payment.pAddressl}</td>
              <td>{payment.pCountry}</td>
              <td>
                <button onClick={() => handleEdit(payment.Id)}>Edit</button>{" "}
                {" | "}
                <button onClick={() => handleDelete(payment.Id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentList;