import React,{useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import SignupPopup from '../SignupPopup/SignupPopup';


const Navbar = ({setShowLogin,setShowSignup }) => {
    const [menu,setMenu]=useState("home");
    return (
  
      <div className='navbar'>
          <img src={assets.logo} alt="" className="logo" />
  
          <ul className="navbar-menu">
              <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
              <a href='#' onClick={()=>setMenu("services")} className={menu==="services"?"active":""}>Services</a>
              <a href='#' onClick={()=>setMenu("subscriptions")} className={menu==="subscriptions"?"active":""}>Subscriptions</a>
              <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact-us</a>
              </ul>
  
          <div className="navbar-right">         
              <button onClick={()=>setShowSignup(true)}>Sign up</button>
              <button onClick={()=>setShowLogin(true)}>Login</button>            
          </div>
  
         
      </div>
    )
}

export default Navbar
