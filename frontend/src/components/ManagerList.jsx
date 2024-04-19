import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ManagerList() {
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7505/user/allmanagers"
        );
        setManagers(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchManagers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/user/update-manager/${id}`); // Navigate to edit page
  };

  const handleCreate = (id) => {
    navigate(`/user/register-manager`); // Navigate to edit page
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/user/delete/${id}`);
      setManagers(managers.filter((manager) => manager.Id !== id));
      console.log("Manager deleted successfully!");
      alert("Manager deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Managers List</h2>
      <button onClick={() => handleCreate()}>
                  Create a new manager
                </button>
      <table>
        <thead>
          <tr>
            <th>Manager ID</th>
            <th>Full Name</th>
            <th>Contact Number</th>
            <th>Username</th>
            <th>Email</th>
            <th>Manager Type</th>
            <th>Actions</th> {/* New column for edit and delete buttons */}
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.Id}>
              <td>{manager.Id}</td>
              <td>{manager.fullName}</td>
              <td>{manager.contactNumber}</td>
              <td>{manager.username}</td>
              <td>{manager.email}</td>
              <td>{manager.managerType}</td>
              <td>
                <button onClick={() => handleEdit(manager.Id)}>Edit</button>{" "}
                {" | "}
                <button onClick={() => handleDelete(manager.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerList;

