import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7505/user/allcustomers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchCustomers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/user/update-customer/${id}`); // Navigate to edit page
  };

  const handleCreate = (id) => {
    navigate(`/user/register-customer`); // Navigate to edit page
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/user/delete/${id}`);
      setCustomers(customers.filter((customer) => customer.Id !== id));
      console.log("customer deleted successfully!");
      alert("customer deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h2>Customers List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={() => handleCreate()}>
                  Create a new cutomer
                </button>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Full Name</th>
            <th>Contact Number</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.Id}>
              <td>{customer.Id}</td>
              <td>{customer.fullName}</td>
              <td>{customer.contactNumber}</td>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => handleEdit(customer.Id)}>Edit</button>{" "}
                {" | "}
                <button onClick={() => handleDelete(customer.Id)}>
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

export default CustomerList;

