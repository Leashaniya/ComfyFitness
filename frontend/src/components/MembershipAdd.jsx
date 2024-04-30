import React,{useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import "./SubscriptionAdd.css"

const initialState = {
    email: "", // Edit this field as needed
    membershipType: "", // Edit this field as needed
    expirationDate: "", // Edit this field as needed
};

function MembershipAdd  ()  {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
  
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
        const response = await axios.post(
          "http://localhost:7505/membership/add",
          formData
        );
        console.log(response.data);
        toast.success("membership added successfully!"); // Display success toast message
        alert("membership added successfully!");
        setFormData(initialState); // Reset form fields using initialState
        navigate("/membership/");
      } catch (error) {
        console.error("Error:", error.response.data.error);
        toast.error("Failed to add membership"); // Display error toast message
      }
    };
  
    return (
      <div className="main-form">
        <h2>Add Memberhsip</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form1">
        <div className="devb">
        <label>
        email: 
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          <div className="devb">
          <label>
          membershipType:
            <input
              type="text"
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          <div className="devb">
          <label>
          expirationDate:
          <input
              type="date"
              name="duration"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </label></div>
          
          <div><button type="submit">Add</button></div>
          </div>
        </form>
        
      </div>
    );
  }

export default MembershipAdd
