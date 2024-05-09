import React from "react";
import { Link } from "react-router-dom";
import "./SubscriptionAdd.css";

const AdminHome = () => {
  return (
    <div className="container-fluid">
       <Link to="/">
        <button>Back to LOGIN</button>
      </Link>

      <div className="row">
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2"> Dashboard</h1>
          </div>
          {/* Content goes here */}
        </main>
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="bar">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/user/allcustomers" className="nav-link">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/allmanagers" className="nav-link">
                  Managers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/alladmins" className="nav-link">
                  Admins
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/subscription/" className="nav-link">
                  subscription
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/payment/" className="nav-link">
                  payment
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qr" className="nav-link">
                  QR 
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Content */}
      </div>
    </div>
  );
};

export default AdminHome;
