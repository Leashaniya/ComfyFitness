import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarA from '../components/Navbar/NavbarA'
import QRscanner from '../components/QRscanner';


function Profile() {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({
    fullName: "",
    contactNumber:"",
    username:"",
    email: "",
  });

  useEffect(() => {
   
    const fetchCustomerData= async () => {
      try {
        const response = await axios.get(
          `http://localhost:7505/user/get/${id}`
        );
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
        console.log("Data fetching error");
      }
    };
    fetchCustomerData();
  }, [id]);
  const email = localStorage.getItem('email');
  const packageName = localStorage.getItem('packageName');
  const qrData = `http://yourserver.com/index.html?email=${email}&packageName=${packageName}`;

  const handleQRCodeClick = () => {
    const anchor = document.createElement('a');
    anchor.href = qrData;
    anchor.target = '_blank'; // Open in a new tab
    anchor.click();
  };

  
  return (
    
    <div>
      <NavbarA/>
      <h2>User Profile</h2>
      <div>Name: {customerData.fullName}</div>
      <div>Contact Number: {customerData.contactNumber}</div>
      <div>Username: {customerData.username}</div>
      <div>Email: {customerData.email}</div>
      <QRscanner  value={qrData} onClick={handleQRCodeClick}/>
      
    </div>
  );
};


export default Profile;
