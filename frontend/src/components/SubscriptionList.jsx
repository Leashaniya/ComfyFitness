import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7505/subscription/"
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSubscriptions();
  }, []);
 

 
  const handleEdit = (id) => {
    navigate(`/subscription/update/${id}`); // Navigate to edit page
  };

  const handleCreate = (id) => {
    navigate(`/subscription/add`); // Navigate to edit page
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/subscription/delete/${id}`);
      setSubscriptions(subscriptions.filter((subscription) => subscription.Id !== id));
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

  return (
    <div>
      <h2>Package List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={() => handleCreate()}>
                  Create a new package
                </button>
      <table>
        <thead>
          <tr>
            <th>Package ID</th>
            <th>packageName</th>
            <th>duration</th>
            <th>description</th>
            <th>category</th>
            <th>startDate</th>
            <th>endDate</th>

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
              <td>

                <button onClick={() => handleEdit(subscription.Id)}>Edit</button>{" "}
                {" | "}
                <button onClick={() => handleDelete(subscription.Id)}>
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

export default SubscriptionList;

