import React from 'react'
//import { Link} from 'react-router-dom'
import './Footer.css'
import {assets} from '../assets/assets'



const Footer = () => {

    // Function to handle clicking on the phone number
    const handlePhoneNumberClick = () => {
        alert('Please call this number from your phone: +94 785632157');
      };
    
      // Function to handle clicking on the email address
      const handleEmailClick = () => {
        window.location.href = 'mailto:comfyfitness@gmail.com'; // Opens the default email client with the email address pre-filled
      };
    
      // Function to handle clicking on social media icons
      const handleSocialMediaClick = (url) => {
        window.open(url, '_blank'); // Opens the social media profile in a new tab
      };

    
      return (
        <div className='footer' id='footer'>
          <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=""  className="logo"/>
                <p>Your fitness journey starts here. Get in shape, stay motivated, and achieve your goals with us!</p>
            </div>
            <div className="footer-content-center">
                <h2>COMFY FITNESS</h2>
                <ul>
                  
                    <li>Services</li>
                    <li>Subscriptions</li>
                   
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li onClick={handlePhoneNumberClick}>+94 785632157</li>
                    <li onClick={handleEmailClick}>comfyfitness@gmail.com</li>
                </ul>
                <div className="footer-social-icons">
                    <ul>
                <li><a href="https://www.facebook.com/comfyfitness" target="_blank" rel="noopener noreferrer"><img src={assets.facebook_icon} alt="Facebook" onClick={() => handleSocialMediaClick('https://www.facebook.com/')} /></a></li>
                <li><a href="https://twitter.com/comfyfitness" target="_blank" rel="noopener noreferrer"><img src={assets.twitter_icon} alt="Twitter" onClick={() => handleSocialMediaClick('https://twitter.com/')} /></a></li>
                <li><a href="https://www.linkedin.com/company/comfyfitness" target="_blank" rel="noopener noreferrer"><img src={assets.linkedin_icon} alt="LinkedIn" onClick={() => handleSocialMediaClick('https://www.linkedin.com/')} /></a></li>
                </ul>
                </div>
                </div>
            </div>  
            <hr />
            <p className="footer-copyright">Copyright © 2024 COMFY FITNESS. All rights reserved.</p>     
        </div>
      )
}

export default Footer
