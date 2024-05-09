import React from "react";
import NavbarA from "./Navbar/NavbarA";

const SuccessPage = () => {
  // Retrieve user email and package name from local storage
  const email = localStorage.getItem("email");
  const packageName = localStorage.getItem("packageName");

  return (

    <div>
        <NavbarA/>
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <p>Email: {email}</p>
      <p>Package Name: {packageName}</p>
    </div>
  );
};

export default SuccessPage;