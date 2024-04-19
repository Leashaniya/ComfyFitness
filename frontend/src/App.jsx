import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home.jsx'
import Footer from './components/Footer/Footer'
// import LoginPopup from './components/LoginPopup/LoginPopup'
// import SignupPopup from './components/SignupPopup/SignupPopup'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'


function App() {

  //  // State to control the visibility
  //  const [showLogin,setShowLogin]=useState(false) 
  //  const [showSignup, setShowSignup] = useState(false); 
   
   return (
    <BrowserRouter>
     <>
     {/* Display SignupPopup if showSignup or setShowLogin is true
     {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
     {showSignup ? <SignupPopup setShowSignup={setShowSignup} /> : <></>} 
      */}
     <div className='app'>
       {/* Pass setShowLogin,setShowSignup to Navbar component
       <Navbar setShowLogin={setShowLogin} setShowSignup={setShowSignup}/> */}
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        
      
       </Routes>
     </div>
     <Footer/>
     </>
     </BrowserRouter>
   )
}

export default App
