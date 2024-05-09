// import React,{useState,useEffect} from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import html2canvas from 'html2canvas'

// function AdminList() {
//     const [admins, setAdmins] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate(); // Initialize useNavigate
  
//     useEffect(() => {
//       const fetchAdmins = async () => {
//         try {
//           const response = await axios.get(
//             "http://localhost:7505/user/allAdmins"
//           );
//           setAdmins(response.data);
//         } catch (error) {
//           console.error("Error:", error.response.data.error);
//         }
//       };
//       fetchAdmins();
//     }, []);
  
//     const handleEdit = (id) => {
//       navigate(`/user/update-admin/${id}`); // Navigate to edit page
//     };

//     const handleCreate = (id) => {
//       navigate(`/user/register-admin`); // Navigate to edit page
//     };
  
//     const handleDelete = async (id) => {
//       try {
//         await axios.delete(`http://localhost:7505/user/delete/${id}`);
//         setAdmins(admins.filter((admin) => admin.Id !== id));
//         console.log("Admin deleted successfully!");
//         alert("Admin deleted successfully!");
//       } catch (error) {
//         console.error("Error:", error.response.data.error);
//       }
//     };

//     const handleSearch = (e) => {
//       setSearchTerm(e.target.value);
//     };
//     const filteredAdmins = admins.filter((admin) =>
//       Object.values(admin).some(
//         (value) =>
//           typeof value === "string" &&
//           value.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );

//     const generateCSVReport = () => {
//       const csvData = 'Admin ID, Full Name, Contact Number, Username, Email\n';
//       const rows = admins.map(
//         (admin) =>
//           `${admin.Id},${admin.fullName},${admin.contactNumber},${admin.username},${admin.email}\n`
//       );
//       const csvContent = csvData + rows.join('');
//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement('a');
//       link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
//       link.setAttribute('download', 'admins_report.csv');
//       document.body.appendChild(link);
//       link.click();
//     };
  
//     useEffect(() => {
//       const generatePDF = async () => {
//         const input = document.getElementById("admins-table");
//         if (!input) {
//           console.error("Table element not found");
//           return;
//         }
    
//         try {
//           const canvas = await html2canvas(input);
//           const imgData = canvas.toDataURL("image/png");
//           const pdf = new jsPDF("p", "mm", "a4");
//           const width = pdf.internal.pageSize.getWidth();
//           const height = (canvas.height * width) / canvas.width;
//           pdf.addImage(imgData, "PNG", 0, 0, width, height);
//           pdf.save("admins_report.pdf");
//         } catch (error) {
//           console.error("Error generating PDF:", error);
//         }
//       };
    
//       generatePDF();
//     }, []);

//     return (
//       <div>
//         <h2>Admins List</h2>
//         <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//         <button onClick={() => handleCreate()}>
//                   Create a new admin
//                 </button>
//         <table>
//           <thead>
//             <tr>
//               <th>Admin ID</th>
//               <th>Full Name</th>
//               <th>Contact Number</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Actions</th> {/* New column for edit and delete buttons */}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAdmins.map((admin) => (
//               <tr key={admin.Id}>
//                 <td>{admin.Id}</td>
//                 <td>{admin.fullName}</td>
//                 <td>{admin.contactNumber}</td>
//                 <td>{admin.username}</td>
//                 <td>{admin.email}</td>
//                 <td>
//                   <button onClick={() => handleEdit(admin.Id)}>Edit</button>{" "}
//                   {" | "}
//                   <button onClick={() => handleDelete(admin.Id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button onClick={generateCSVReport}>Download CSV Report</button>
//         <button onClick={generatePDF}>Download PDF Report</button>
//       </div>
//     );
//   }
  
//   export default AdminList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; // Import jsPDF
import { Link } from "react-router-dom";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:7505/user/allAdmins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error:', error.response.data.error);
      }
    };
    fetchAdmins();
  }, []);

  const handleEdit = (id) => {
    navigate(`/user/update-admin/${id}`); // Navigate to edit page
  };

  const handleCreate = () => {
    navigate('/user/register-admin'); // Navigate to create admin page
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7505/user/delete/${id}`);
      setAdmins(admins.filter((admin) => admin.Id !== id));
      console.log('Admin deleted successfully!');
      alert('Admin deleted successfully!');
    } catch (error) {
      console.error('Error:', error.response.data.error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdmins = admins.filter((admin) =>
    Object.values(admin).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const generateCSVReport = () => {
    const csvData = 'Admin ID, Full Name, Contact Number, Username, Email\n';
    const rows = admins.map(
      (admin) =>
        `${admin.Id},${admin.fullName},${admin.contactNumber},${admin.username},${admin.email}\n`
    );
    const csvContent = csvData + rows.join('');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
    link.setAttribute('download', 'admins_report.csv');
    document.body.appendChild(link);
    link.click();
  };

  const generatePDF = async () => {
    const input = document.getElementById('admins-table');
    if (!input) {
      console.error('Table element not found');
      return;
    }

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a0');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('admins_report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <Link to="/user/adminHome">
        <button>Back to home</button>
      </Link>
      <h2>Admins List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleCreate}>Create a new admin</button>
      <table id="admins-table">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Full Name</th>
            <th>Contact Number</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th> {/* New column for edit and delete buttons */}
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin) => (
            <tr key={admin.Id}>
              <td>{admin.Id}</td>
              <td>{admin.fullName}</td>
              <td>{admin.contactNumber}</td>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => handleEdit(admin.Id)}>Edit</button>
                <button onClick={() => handleDelete(admin.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateCSVReport}>Download CSV Report</button>
      <button onClick={generatePDF}>Download PDF Report</button>
    </div>
  );
}

export default AdminList;
