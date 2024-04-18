import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import './Navbar.css'


const NavbarA = () => {
    return(
    <div className='navbar'>
    <div>
      <img className='logo ' src={assets.logo} alt='Logo' />
    </div>
    <div>
      <div className='navbar-menu '>
    <Link to="/services" >Services</Link>
    <Link to="/subscriptions">Subscriptions</Link>
    <a href='#footer' >Contact</a>

      </div>
    </div>
    <div>
      <h1>
    <button><Link to={"/profile"} className="navbar-right">Profile</Link></button>

      </h1>
    </div>
  </div>
);
}

export default NavbarA
