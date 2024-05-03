import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import img from '../assets/header_img.png'
import '../App.css'
import './home.css'

const Home = () => {
  return (
    <div style={{backgroundColor: '#000000'}}>
      <div>
          <Navbar />
      </div>
      <div className='hdr'>
          <div>
            <img src={img} alt="img" className="header_img"/>
          </div>

          <div className="cntns">
            <h2>Welcome to our Gym Management System</h2>
            <p>At our gym, we're committed to helping you achieve your fitness goals and lead a healthier lifestyle. Our state-of-the-art facilities, experienced trainers, and personalized workout plans are designed to help you reach your full potential.</p>
            <button className="myBTN"><Link to='/user/register-customer'>Get Registered NOW</Link></button>
          </div>
        </div>
      </div>
  );
}

export default Home;
