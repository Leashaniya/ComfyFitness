<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import NavbarA from '../components/Navbar/NavbarA';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Pay.css';
import bgPckg from '../assets/bgPckg.png';
=======


import React, { useState, useEffect } from "react";
import NavbarA from "../components/Navbar/NavbarA"; 
import axios from "axios"; 
import { Link } from "react-router-dom"; 
import "./Pay.css";
import bgPckg from "../assets/bgPckg.png"; 
>>>>>>> Stashed changes

const Subscription = () => {
  // Retrieving user ID from localStorage
  const userId = localStorage.getItem("userId");
  
  // States to store subscriptions, current package, current package name, and expiry date
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [currentPackageName, setCurrentPackageName] = useState(null);
  const [expirydate, setExpirydate] = useState(null);

  // useEffect hook to fetch data when component mounts or when userId changes
  useEffect(() => {
    // Function to fetch subscriptions from the server
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("http://localhost:7505/subscription/");
        setSubscriptions(response.data); // Setting subscriptions state with fetched data
      } catch (error) {
        console.error("Error:", error.response?.data?.error || error.message);
      }
    };

    // Function to fetch the current package for the user
    const fetchCurrentPackage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7505/payment/getCurrentPackage/${userId}`
        );
        setCurrentPackage(response.data[0] ? response.data[0] : null); // Setting currentPackage state
        setCurrentPackageName(
          response.data[0] ? response.data[0].packageName : null // Setting currentPackageName state
        );

        // Function to format date into 'MM/DD/YYYY' format
        const formatDate = (isoString) => {
          if (!isoString) return null;
          const date = new Date(isoString);
          return date.toLocaleDateString();
        };

        // Formatting expiry date
        const rawDate = response.data[0].expirationDate;
        const formattedDate = formatDate(rawDate);
        setExpirydate(response.data[0] ? formattedDate : null); // Setting expirydate state
      } catch (error) {
        console.error("Error:", error.response?.data?.error || error.message);
      }
    };

    // Fetching subscriptions and current package data
    fetchCurrentPackage();
    fetchSubscriptions();
  }, [userId]); // useEffect dependency array with userId

  return (
    <div className="par" style={{ backgroundImage: `url(${bgPckg})` }}>
<<<<<<< Updated upstream
      <NavbarA />
      <div className="secSub">
        <div className="mySubs">
          {filteredSubscriptions.map((subscription) => (
            <div key={subscription.Id} className="subsItem">
              <div className="pckgTopic">{subscription.packageName}</div>
              <p><strong>Duration:</strong> {subscription.duration}</p>
              <p><strong>Description:</strong> {subscription.description}</p>
              <p><strong>Category:</strong> {subscription.category}</p>
              <div>
                <button className="btnStyle">
                  <Link to="/payment/add">Buy now</Link>
                </button>
              </div>
            </div>
          ))}
=======
      <NavbarA /> 
      <div className="secSub">
        <div className="mySubs">
          {/* Mapping over subscriptions */}
          {currentPackage
            ? subscriptions.map((subscription) => {
                if (subscription.packageName === currentPackageName) {
                  // Rendering current package details
                  return (
                    <div key={subscription.Id} className="subsItems">
                      <div className="plans-header">Your Current Plan</div>
                      <div className="pckgTopics">
                        {subscription.packageName}
                      </div>
                      <p>
                        <strong>Duration:</strong>{" "}
                        {`${subscription.duration} months`}
                      </p>
                      <p>
                        <strong>Description:</strong> {subscription.description}
                      </p>
                      <p>
                        <strong>Category:</strong> {subscription.category}
                      </p>
                      <p>
                        <strong>Expiry Date:</strong> {expirydate}
                      </p>
                      <div>
                        <button className="btns-disabled" disabled>
                          Current Plan
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            : subscriptions.map((subscription) => (
                // Rendering other subscription options
                <div key={subscription.Id} className="subsItem">
                  <div className="pckgTopic">{subscription.packageName}</div>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {subscription.duration + "months"}
                  </p>
                  <p>
                    <strong>Description:</strong> {subscription.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {subscription.category}
                  </p>
                  <div>
                    <button className="btnStyle">
                      {/* Link to payment page */}
                      <Link
                        to={`/payment/add/${subscription.packageName}/${subscription.price} /${subscription.duration}`}
                      >
                        Buy now
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default Subscription;
<<<<<<< Updated upstream


=======
>>>>>>> Stashed changes
