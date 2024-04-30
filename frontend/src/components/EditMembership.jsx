import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function EditMembership  () {
    const { Id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "", // Edit this field as needed
        membershipType: "", // Edit this field as needed
        expirationDate: "", // Edit this field as needed
    });
  
    useEffect(() => {
      const fetchMembership= async () => {
        try {
          const response = await axios.get(
            `http://localhost:7505/membership/get/${Id}`
          );
          const membershipData = response.data;
          setFormData(membershipData);
        } catch (error) {
          console.error("Error:", error.response.data.error);
        }
      };
      fetchMembership();
    }, [Id]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(
          `http://localhost:7505/membership/update/${Id}`,
          formData
        );
        console.log("membership details updated successfully!");
        alert("membership details updated successfully!");
        navigate("/membership/");
        // Optionally, you can redirect the user or display a success message
      } catch (error) {
        console.error("Error:", error.response.data.error);
        // Optionally, you can display an error message to the user
      }
    };
  
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        <h2>Edit Membership</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>email:</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: "300px" }} // Adjust the width as needed
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>membershipType:</td>
                <td>
                  <input
                    type="text"
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleChange}
                    style={{ width: "300px" }} // Adjust the width as needed
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>expirationDate:</td>
                <td>
                  <input
                    type="date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    style={{ width: "300px" }} // Adjust the width as needed
                    required
                  />
                </td>
              </tr>
              
            </tbody>
          </table>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
    
  
    );
  }
  

export default EditMembership
