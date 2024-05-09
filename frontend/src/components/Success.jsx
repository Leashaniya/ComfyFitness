import React from "react";
import NavbarA from "./Navbar/NavbarA";
import { useParams } from "react-router-dom";
import "./SuccessPage.css"; // Adjust path as necessary

const SuccessPage = () => {
  const { userId, amount, packageName } = useParams();

  return (
    <div className="success-page">
      <NavbarA />
      <div className="success-content">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
        <div className="success-details">
          <p>
            <strong>User ID:</strong> {userId}
          </p>
          <p>
            <strong>Amount:</strong> ${amount}
          </p>
          <p>
            <strong>Package Name:</strong> {packageName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
