import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import '../index.css'

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7505/subscription/"
        );
        setSubscriptions(response.data);
        calculateTotalDuration(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSubscriptions();
  }, []);

  const calculateTotalDuration = (subscriptions) => {
    const total = subscriptions.reduce((acc, curr) => acc + parseInt(curr.duration), 0);
    setTotalDuration(total);
  };

  const handleEdit = (id) => {
    navigate(`/subscription/update/${id}`);
  };

  const handleCreate = (id) => {
    navigate(`/subscription/add`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/subscription/delete/${id}`);
      setSubscriptions(subscriptions.filter((subscription) => subscription.Id !== id));
      calculateTotalDuration(subscriptions.filter((subscription) => subscription.Id !== id));
      console.log("package deleted successfully!");
      alert("package deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredSubscriptions = subscriptions.filter((subscription) =>
    Object.values(subscription).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const generateCSVReport = () => {
    const csvData = "Package ID, Package Name, Duration, Description, Category, Start Date, End Date\n";
    const rows = subscriptions.map((subscription) => (
      `${subscription.Id},${subscription.packageName},${subscription.duration},${subscription.description},${subscription.category},${subscription.startDate},${subscription.endDate}\n`
    ));
    const csvContent = csvData + rows.join("");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    link.setAttribute("download", "subscription_report.csv");
    document.body.appendChild(link);
    link.click();
  };
  const generatePDFReport = () => {
    const input = document.getElementById("subscription-table");
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Calculate the scale factor to fit the content inside the PDF
        const scaleFactor = 0.5; // Adjust this value as needed
        const width = canvas.width * scaleFactor;
        const height = canvas.height * scaleFactor;

        const pdf = new jsPDF("p", "mm", "a1");
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("subscription_report.pdf");
      });
  };

  return (
    <div className="subscription-list-container">
      <h2 className="subscription-list-header">Subscription List</h2>
      <p>Total Duration: {totalDuration}</p>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="create-button" onClick={() => handleCreate()}>
        Create a new package
      </button>
      <table className="subscription-table" id="subscription-table">
        <thead>
          <tr>
            <th>Package ID</th>
            <th>packageName</th>
            <th>duration</th>
            <th>description</th>
            <th>category</th>
            <th>startDate</th>
            <th>endDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubscriptions.map((subscription) => (
            <tr key={subscription.Id}>
              <td>{subscription.Id}</td>
              <td>{subscription.packageName}</td>
              <td>{subscription.duration}</td>
              <td>{subscription.description}</td>
              <td>{subscription.category}</td>
              <td>{subscription.startDate}</td>
              <td>{subscription.endDate}</td>
              <td className="action-buttons">
                <button onClick={() => handleEdit(subscription.Id)}>Edit</button>{" "}
                <button onClick={() => handleDelete(subscription.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="report-buttons">
        <button onClick={generateCSVReport}>Download CSV Report</button>
        <button onClick={generatePDFReport}>Download PDF Report</button>
      </div>
    </div>
  );
}

export default SubscriptionList;
