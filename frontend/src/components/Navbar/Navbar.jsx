import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
    return(
    <div className='navbar'>
    <div>
      <img className='logo ' src={assets.logo} alt='Logo' />
    </div>
    <div>
      <div className='navbar-menu '>
    <Link to="/" >Home</Link>
    <Link to="/user/register-customer">Subscriptions</Link>
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
