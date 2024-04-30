import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    const fetchCustomer= async () => {
      try {
        const response = await axios.get(
          `http://localhost:7505/user/get/CU1435`
        );
        const customerData = response.data;
        setFormData(customerData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchCustomer();
  }, [Id]);

  

  // Function to handle editing details
  const handleEdit = (id) => {
    navigate(`/user/update-customer/CU1435}`);
  };

  // Function to handle deleting details
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/user/delete/CU1435`);
      console.log("User deleted successfully!");
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {formData.fullName}</p>
      <p>Contact Number: {formData.contactNumber}</p>
      <p>Username: {formData.username}</p>
      <p>Email: {formData.email}</p>
      <p>Role: {formData.role}</p>
      <p>ID: {formData.Id}</p>
      {/* Add buttons for editing and deleting details */}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};


export default Profile
