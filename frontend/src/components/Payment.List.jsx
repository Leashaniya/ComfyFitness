import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import '../index.css'

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

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
    navigate(`/payment/update/${id}`);
  };

  const handleCreate = (id) => {
    navigate('/payment/add');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/payment/delete/${id}`);
      setPayments(payments.filter((payment) => payment.Id !== id));
      console.log("Payment deleted successfully!");
      alert("Payment deleted successfully!");
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
  
  const generatePDFReport = () => {
    const input = document.getElementById("subscription-table");
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const scaleFactor = 0.5;
        const width = canvas.width * scaleFactor;
        const height = canvas.height * scaleFactor;
        const pdf = new jsPDF("p", "mm", "a1");
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("payment_report.pdf");
      });
  };

    // Calculate total payment count
    const totalPaymentCount = payments.length;

    const generateCSVReport = () => {
      const csvData = "Payment ID, Payment Amount, Payment Date, Description, Address, Country\n";
      const rows = payments.map((payment) => (
        `${payment.Id},${payment.paymentAmount},${payment.paymentDate},${payment.pDescription},${payment.pAddressl},${payment.pCountry}\n`
      ));
      const csvContent = csvData + rows.join("");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
      link.setAttribute("download", "payment_report.csv");
      document.body.appendChild(link);
      link.click();
    };

  return (
    <div className="payment-list-container">
      <h2 className="payment-list-header">Payment List</h2>
      <p>Total Payments: {totalPaymentCount}</p>
      
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* <button className="create-button" onClick={() => handleCreate()}>
        Create a new payment
      </button> */}
      <table className="payment-table" id="subscription-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Payment ID</th>
            <th>Payment Amount</th>
            <th>Payment Date</th>
            <th>Description</th>
            <th>Address</th>
            <th>Country</th>
            <th>PaymentType</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      

          {filteredPayments.map((payment) => (
            <tr key={payment.Id}>
              <td>{payment.userId}</td>
              <td>{payment.Id}</td>
              <td>{payment.paymentAmount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.pDescription}</td>
              <td>{payment.pAddressl}</td>
              <td>{payment.pCountry}</td>
              <td>{payment.paymentType}</td>
              <td className="action-buttons">
                <button onClick={() => handleEdit(payment.Id)}>Edit</button>{" "}
                <button onClick={() => handleDelete(payment.Id)}>Delete</button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      <div className="report-buttons">
        <button onClick={generateCSVReport}>Download CSV Report</button>
        <button onClick={generatePDFReport}>Download PDF Report</button>
      </div>
      <br></br>
      
    </div>
  );
}

export default PaymentList;
