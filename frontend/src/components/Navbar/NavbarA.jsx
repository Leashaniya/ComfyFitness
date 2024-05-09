import React from "react";
import { assets } from "../../assets/assets";
import { Link, useParams } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NavbarA() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7505/user/logout");
      console.log("User logged out successfully!");
      alert("User logged out successfully!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Error:", error.response.data.error);
      } else {
      }
    }
  };

  return (
    <div className="navbar">
      <div>
        <img className="logo " src={assets.logo} alt="Logo" />
      </div>
      <div>
        <div className="navbar-menu ">
          <Link to="/subs">Subscriptions</Link>
          <a href="#footer">Contact</a>
        </div>
      </div>
      <div>
        <h1>
          <button>
            <Link to={`/user/get/${userId}`} className="navbar-right">
              Profile
            </Link>
          </button>
          <button onClick={handleLogout} className="navbar-right">
            Logout
          </button>
        </h1>
      </div>
    </div>
  );
}

export default NavbarA;
