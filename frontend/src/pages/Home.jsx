import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../App.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='header'>
          <div className="header-contents">
            <h2>Welcome to our Gym Management System</h2>
            <p>At our gym, we're committed to helping you achieve your fitness goals and lead a healthier lifestyle. Our state-of-the-art facilities, experienced trainers, and personalized workout plans are designed to help you reach your full potential.</p>
            <button ><Link to='/register'>Get Registered NOW</Link></button>
           
          </div>
        </div>
        </div>
  );
}

export default Home;
