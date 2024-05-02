import React from 'react'
import { assets } from '../../assets/assets'
import { Link, useParams } from 'react-router-dom'
import './Navbar.css'

function NavbarA ()  {
 
  const { Id } = useParams();
    return(
    <div className='navbar'>
    <div>
      <img className='logo ' src={assets.logo} alt='Logo' />
    </div>
    <div>
      <div className='navbar-menu '>
    <Link to="/services" >Services</Link>
    <Link to="/subs">Subscriptions</Link>
    <a href='#footer' >Contact</a>

      </div>
    </div>
    <div>
      <h1>
      <button><Link to={`/user/get/${Id}`} className="navbar-right">Profile</Link></button>

      </h1>
    </div>
  </div>
);
}

export default NavbarA
