import React from 'react'
import './SignupPopup.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'

const SignupPopup = ({setShowSignup}) => {
    // State variable for managing the current state (Signup or Login)
    const [currState,setCurrState]=useState("Signup")
    return (
        
      <div className='signup-popup'>
      <form  className="signup-popup-container">
      <div className="signup-popup-title">
        {/* Displaying current state (Signup or Login) */}
          <h2>{currState}</h2>
          {/* Close button */}
          <img onClick={()=>setShowSignup(false)} src={assets.cross_icon} alt="" />
      </div>


      <div className="signup-popup-inputs">
        {/* Conditionally rendering name input field based on current state */}
             {currState==="Login"?<></>:<input type="text" placeholder='Your name' required/>}
              <input type="email" placeholder='Your email' required/>
              <input type="password" placeholder='Password' required/>
      </div>

        {/* Button text changes based on current state */}
          <button>{currState==="Signup"?"Create account":"Login"}</button>
          <div className="signup-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>


          {/* Conditional rendering for switching between Login and Signup */}
          {currState==="Login"
           ? <p>Create a new account? <span onClick={()=>setCurrState("Signup")}>Click here</span></p>
          :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>} 
  
  
          </form>
        
      </div>
    )
}

export default SignupPopup
