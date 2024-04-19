import React from 'react'
import './Header.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header =(setShowSignup) => {

    return (
        <div className='header'>
          <div className="header-contents">
            <h2>Welcome to our Gym Management System</h2>
            <p>At our gym, we're committed to helping you achieve your fitness goals and lead a healthier lifestyle. Our state-of-the-art facilities, experienced trainers, and personalized workout plans are designed to help you reach your full potential.</p>
            <button >Get Registered NOW</button>
           
          </div>
        </div>
      )
}

export default Header
