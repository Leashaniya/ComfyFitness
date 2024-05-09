<<<<<<< Updated upstream
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarA from '../components/Navbar/NavbarA'
import QRscanner from '../components/QRscanner'
import { useNavigate } from 'react-router-dom';
=======
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import NavbarA from "../components/Navbar/NavbarA";
// import user from "../assets/user.png";
// import "./Profile.css";
// import QRCode from "react-qr-code";
>>>>>>> Stashed changes

// function Profile() {
//   const { id } = useParams(); // Assuming id is userId
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState({
//     fullName: "",
//     contactNumber: "",
//     username: "",
//     email: "",
//   });
//   const [packageDetails, setPackageDetails] = useState({
//     packageName: "",
//     expirationDate: "",
//     paymentAmount: "",
//   });

//   // Use useCallback to prevent infinite calls
//   const fetchCustomerData = useCallback(async () => {
//     try {
//       const response = await axios.get(`http://localhost:7505/user/get/${id}`);
//       setCustomerData(response.data);
//     } catch (error) {
//       console.error("Error:", error.response?.data?.error || error.message);
//     }
//   }, [id]);

//   const fetchPackageDetails = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:7505/payment/getCurrentPackage/${id}`
//       );
//       if (response.data.length) {
//         setPackageDetails(response.data[0] || {});
//       }
//     } catch (error) {
//       console.error("Error:", error.response?.data?.error || error.message);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchCustomerData();
//     fetchPackageDetails();
//   }, [fetchCustomerData, fetchPackageDetails]);

//   const qrData = id;

 
//   const downloadQRCode = () => {
//     const canvas = qrRef.current.querySelector("canvas");
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     const downloadLink = document.createElement("a");
//     downloadLink.href = pngUrl;
//     downloadLink.download = "qr_code.png";
//     downloadLink.click();
//   };
//   const handleEdit = (id) => {
//     navigate(`/user/update-customer/${id}`);
//   };

//   return (
//     <div>
//       <NavbarA />
//       <div className="profile-container">
//         <h2 className="profile-header">User Profile</h2>
//         <div className="profile-section">
//           <div className="profile-pic-container">
//             <img className="profile-pic" src={user} alt="Profile" />
//           </div>
//           <div className="profile-info">
//             <p>
//               <strong>Full Name:</strong> {customerData.fullName}
//             </p>
//             <p>
//               <strong>Contact Number:</strong> {customerData.contactNumber}
//             </p>
//             <p>
//               <strong>Username: </strong> {customerData.username}
//             </p>
//             <p>
//               <strong>Email:</strong> {customerData.email}
//             </p>
//           </div>
//         </div>
//         {packageDetails.packageName && (
//           <>
//             <div className="package-section">
//               <h3>Package Details</h3>
//               <p>
//                 <strong>Package Name:</strong> {packageDetails.packageName}
//               </p>
//               <p>
//                 <strong>Expiration Date:</strong>{" "}
//                 {new Date(packageDetails.expirationDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Payment Amount:</strong> ${packageDetails.paymentAmount}
//               </p>
//             </div>
//             <div className="qr-code-section">
//               <div
//                 style={{
//                   height: "400px",
//                   margin: "0 auto",
//                   maxWidth: 400,
//                   width: "100%",
//                 }}
//               >
//                 <QRCode
//                   size={256}
//                   style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//                   value={qrData}
//                   viewBox={`0 0 256 256`}
//                 />
//               </div>
//               <button
//                 className="edit-button"
//                 onClick={() => handleEdit(customerData.Id)}
//               >
//                 Edit Profile
//               </button>
//             </div>
//           </>
//         )}

//         {!packageDetails.packageName && (
//           <div className="qr-code-section">
//             <button
//               className="edit-button"
//               onClick={() => handleEdit(customerData.Id)}
//             >
//               Edit Profile
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavbarA from "../components/Navbar/NavbarA";
import user from "../assets/user.png";
import "./Profile.css";
import QRCode from "react-qr-code";

function Profile() {
<<<<<<< Updated upstream
  const { id } = useParams();
=======
  const { id } = useParams(); // Assuming id is userId
>>>>>>> Stashed changes
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    fullName: "",
    contactNumber: "",
    username: "",
    email: "",
  });
  const [packageDetails, setPackageDetails] = useState({
    packageName: "",
    expirationDate: "",
    paymentAmount: "",
  });
  const [qrCodeLoaded, setQRCodeLoaded] = useState(false); 
  const qrRef = useRef(null); // Create a ref for the QR code component

  // Use useCallback to prevent infinite calls
  const fetchCustomerData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:7505/user/get/${id}`);
      setCustomerData(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
    }
  }, [id]);

  const fetchPackageDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:7505/payment/getCurrentPackage/${id}`
      );
      if (response.data.length) {
        setPackageDetails(response.data[0] || {});
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomerData();
<<<<<<< Updated upstream
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

=======
    fetchPackageDetails();
  }, [fetchCustomerData, fetchPackageDetails]);

  const qrData = id;

  const handleEdit = (id) => {
    navigate(`/user/update-customer/${id}`);
  };
  
  // const downloadQRCode = () => {
  //   const svg = document.getElementById("qr-code-display")// Get the SVG element
  
  //   if (!svg) {
  //     console.error('SVG element not found.');
  //     return;
  //   }
  
  //   const svgData = new XMLSerializer().serializeToString(svg); // Serialize the SVG element to a string
  
  //   // Open a new window with the SVG content
  //   const printWindow = window.open('', '_blank');
  //   printWindow.document.write('<html><head><title>Print</title></head><body>');
  //   printWindow.document.write(svgData); // Write the SVG content to the new window
  //   printWindow.document.write('</body></html>');
  //   printWindow.document.close();
  
  //   // Call window.print() to initiate printing
  //   printWindow.print();
  // };

  // const downloadQRCode = () => {
  //   const svg = document.getElementById("qr-code-display"); // Get the SVG element
  
  //   if (!svg) {
  //     console.error('SVG element not found.');
  //     return;
  //   }
  
  //   const svgData = new XMLSerializer().serializeToString(svg); // Serialize the SVG element to a string
  
  //   // Create an Image element
  //   const img = new Image();
  
  //   // Set the source of the Image element to the SVG data
  //   img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  
  //   // Create a temporary anchor element for downloading
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = img.src;
  //   downloadLink.download = 'qr_code.png'; // Set the download file name (you can change the extension as needed)
  //   downloadLink.style.display = 'none';
  
  //   // Append the anchor element to the body and click it programmatically
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  
  //   // Clean up by removing the anchor element from the body
  //   document.body.removeChild(downloadLink);
  // };
  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code-display"); // Get the SVG element
  
    if (!svg) {
      console.error('SVG element not found.');
      return;
    }
  
    const svgData = new XMLSerializer().serializeToString(svg); // Serialize the SVG element to a string
  
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    // Create an Image element
    const img = new Image();
  
    // When the image loads, draw it on the canvas
    img.onload = function() {
      // Set the canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Draw the image onto the canvas
      context.drawImage(img, 0, 0);
  
      // Convert the canvas to a data URL representing a PNG image
      const pngDataUrl = canvas.toDataURL('image/png');
  
      // Create a temporary anchor element for downloading
      const downloadLink = document.createElement('a');
      downloadLink.href = pngDataUrl;
      downloadLink.download = 'qr_code.png'; // Set the download file name
      downloadLink.style.display = 'none';
  
      // Append the anchor element to the body and click it programmatically
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up by removing the anchor element from the body
      document.body.removeChild(downloadLink);
    };
  
    // Set the source of the Image element to the SVG data URL
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };
  
  
>>>>>>> Stashed changes

  return (
    <div>
<<<<<<< Updated upstream
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
=======
      <NavbarA />
      <div className="profile-container">
        <h2 className="profile-header">User Profile</h2>
        <div className="profile-section">
          <div className="profile-pic-container">
            <img className="profile-pic" src={user} alt="Profile" />
          </div>
          <div className="profile-info">
            <p>
              <strong>Full Name:</strong> {customerData.fullName}
            </p>
            <p>
              <strong>Contact Number:</strong> {customerData.contactNumber}
            </p>
            <p>
              <strong>Username: </strong> {customerData.username}
            </p>
            <p>
              <strong>Email:</strong> {customerData.email}
            </p>
          </div>
        </div>
        {packageDetails.packageName && (
          <>
            <div className="package-section">
              <h3>Package Details</h3>
              <p>
                <strong>Package Name:</strong> {packageDetails.packageName}
              </p>
              <p>
                <strong>Expiration Date:</strong>{" "}
                {new Date(packageDetails.expirationDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Payment Amount:</strong> ${packageDetails.paymentAmount}
              </p>
            </div>
            <div className="qr-code-section">
              <div 
                style={{

                  height: "400px",
                  margin: "0 auto",
                  maxWidth: 400,
                  width: "100%",
                }}
              >
              <QRCode id="qr-code-display"
              ref={qrRef}
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrData}
              viewBox={`0 0 256 256`}
              onLoad={() => setQRCodeLoaded(true)} // Set the QR code loaded state when it's loaded
            />
              </div>
              <button className="download-button" onClick={downloadQRCode}>
                Download QR Code
              </button>
              <button
                className="edit-button"
                onClick={() => handleEdit(customerData.Id)}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}

        {!packageDetails.packageName && (
          <div className="qr-code-section">
            <button
              className="edit-button"
              onClick={() => handleEdit(customerData.Id)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
>>>>>>> Stashed changes
  );
}

export default Profile;

