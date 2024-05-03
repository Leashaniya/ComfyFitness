import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'


const Navbar = () => {

  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubscriptionsClick = () => {
    // Check if user is registered
    if (!isRegistered) {
      // Display message if user is not registered
      alert('Please register first');
    }
  };


    return(
    <div className='navbar'>
    <div>
      <img className='logo ' src={assets.logo} alt='Logo' />
    </div>
    <div>
      <div className='navbar-menu '>
    <Link to="/" >Home</Link>
    <Link to="/user/register-customer" onClick={handleSubscriptionsClick}>Subscriptions</Link>
    <a href='#footer' >Contact</a>

      </div>
    </div>
    <div>
      <h1>
      <button><Link to={"/user/login-adminAndManger"} className="navbar-right">Management Login</Link></button>
    <button><Link to={"/user/register-customer"} className="navbar-right">Register</Link></button>
    <button><Link to={"/user/login-customer"} className="navbar-right">Login</Link></button>
      </h1>
    </div>
  </div>
);
}

export default Navbar
