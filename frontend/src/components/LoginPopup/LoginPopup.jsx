import React,{useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {
   // State variables for managing current state (Login or Signup)
    const [currState,setCurrState]=useState("Login")

    return (
      <div className='login-popup'>
        <form  className="login-popup-container">
          <div className="login-popup-title">
            {/* Displaying current state (Login or Signup) */}
              <h2> {currState}   </h2>
            {/* Close button */}  
              <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>


          <div className="login-popup-inputs">
          {/* Conditionally rendering name input field based on current state */}  
            {currState==="Login"?<></>:<input type="text" placeholder='Your name' required/>}

              <input type="email" placeholder='Your email' required/>
              <input type="password" placeholder='Password' required/>
          </div>


          {/* Button text changes based on current state */}
          <button>{currState==="Signup"?"Create account":"Login"}</button>

        <div className="login-popup-condition">
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

export default LoginPopup
