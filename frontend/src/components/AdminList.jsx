import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminList() {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate
  
    useEffect(() => {
      const fetchAdmins = async () => {
        try {
          const response = await axios.get(
            "http://localhost:7505/user/allAdmins"
          );
          setAdmins(response.data);
        } catch (error) {
          console.error("Error:", error.response.data.error);
        }
      };
      fetchAdmins();
    }, []);
  
    const handleEdit = (id) => {
      navigate(`/user/update-admin/${id}`); // Navigate to edit page
    };

    const handleCreate = (id) => {
      navigate(`/user/register-admin`); // Navigate to edit page
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:7505/user/delete/${id}`);
        setAdmins(admins.filter((admin) => admin.Id !== id));
        console.log("Admin deleted successfully!");
        alert("Admin deleted successfully!");
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
  
    return (
      <div>
        <h2>Admins List</h2>
        <button onClick={() => handleCreate()}>
                  Create a new admin
                </button>
        <table>
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
            {admins.map((admin) => (
              <tr key={admin.Id}>
                <td>{admin.Id}</td>
                <td>{admin.fullName}</td>
                <td>{admin.contactNumber}</td>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
                <td>
                  <button onClick={() => handleEdit(admin.Id)}>Edit</button>{" "}
                  {" | "}
                  <button onClick={() => handleDelete(admin.Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AdminList;
  