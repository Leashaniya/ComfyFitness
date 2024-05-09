import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Subscription from "../pages/Subscription";
import { Link } from "react-router-dom";
import Footer from '../components/Footer/Footer.jsx';
// import photoAnime from '../assets/photoAnime.png';
import './register.css';

const initialState = {
  fullName: "",
  contactNumber: "",
  username: "",
  email: "",
  password: "",
};

function CustomerRegister() {
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
        "http://localhost:7505/user/register-customer",
        formData
      );
      console.log(response.data);
      toast.success("Customer registered successfully!"); // Display success toast message
      alert("Customer registered successfully!");
      setFormData(initialState); // Reset form fields using initialState
      navigate("/user/login-customer")
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to register customer"); // Display error toast message
    }
  };
  // style={{ backgroundImage: `url(${photoAnime})` }}

  return (
    <div className="par" >
    <div className="mn-bdy">
          <form className="shitForm" onSubmit={handleSubmit}>
              <div className="top-bar">
                <h5 className="h5">Customer Registration</h5>
              </div>
              <div className="bar2">
                  <div className="devb">
                    <label className="lbl">Full Name:</label>
                      <div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      </div>
                  </div>
                </div>
              <div className="bar2">
                  <div className="devb">
                    <label className="lbl">Contact Number:</label>
                    <div>
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
              </div>
              <div className="bar2">
                  <div className="devb">
                    <label className="lbl">Username:</label>
                    <div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
              </div>
              <div className="bar1">
                  <div className="devb">
                    <label className="lbl">Email:</label>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="devb">
                    <label className="lbl">Password:</label>
                    <div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
              </div>
              <div className="button-up">
                <button className="btn" type="submitt">Register</button>
              </div>
              <p>
                Have an account? <Link style={{color: '#071f8c'}} to="/user/login-customer">Login</Link>
              </p>
              </form>

      </div>
          <Footer/>
      </div>
  );
}

export default CustomerRegister;
