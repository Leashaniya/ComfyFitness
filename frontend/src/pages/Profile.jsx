import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarA from '../components/Navbar/NavbarA'
import QRscanner from '../components/QRscanner'
import { useNavigate } from 'react-router-dom';


function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const handleEdit = (id) => {
    navigate(`/user/update-customer/${id}`); // Navigate to edit page
  };


  return (
    
    <div>
      <NavbarA/>
    <div className="secSub">
    <div className="mySubs">
    <div  className="subsItem2">
    <div className="pckgTopic">
        <span>User Profile</span>
      </div>
        <div>Name: {customerData.fullName}</div>
        <p><strong>Contact Number:</strong> {customerData.contactNumber}</p>
        <p><strong>Username: </strong> {customerData.username}</p>
        <p><strong>Email:</strong> {customerData.email}</p>
        <QRscanner  value={qrData} onClick={handleQRCodeClick}/>
        <button onClick={() => handleEdit(customerData.Id)}>Edit</button>
      </div>
      </div>
  </div>
  </div>
  );
};


export default Profile;
