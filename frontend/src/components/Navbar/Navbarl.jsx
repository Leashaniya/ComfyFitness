import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbarl = () => {
  return (
    <div className='navbar'>
      <div>
      <img className='logo ' src={assets.logo} alt='Logo' />
      </div>
      <div>
        <div className='navbar-menu'>
        <Link to="/" >Home</Link>
        <Link to="/about" >Services</Link>
        <Link to="/mainProducts">Subscriptions</Link>
        <a href='#footer' >Contact</a>
</div>
      </div>
      <div>
        <h3>
         
          <button><Link to={"/"} className="navbar-right">Logout</Link></button>
        </h3>
      </div>
    </div>
  )
}

export default Navbarl
