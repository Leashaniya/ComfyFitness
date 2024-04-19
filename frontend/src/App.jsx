import { useState } from 'react'
import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.css'
import Subscription from './pages/Subscription'
import Profile from './pages/Profile'
import axios from 'axios'

import ManagerRegister from './components/ManagerRegister'  
import ManagerList from './components/ManagerList'          
import EditManager from './components/EditManager'
import AdminList from './components/AdminList'          
import AdminRegister from './components/AdminRegister'
import CustomerList from './components/CustomerList'
import EditAdmin from './components/EditAdmin'
import AdminManagerLogin from './components/AdminManagerLogin'
import CustomerRegister from './components/CustomerRegister'





function App() {

  axios.defaults.baseURL = "http://localhost:7505"; //  backend server URL
  return (
    <BrowserRouter>
    <>
    <div className='app' >
    <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/subscription' element={<Subscription/>}/>
          <Route path='/profile' element={<Profile/>}/>

          {/* done */}
          <Route path="/user/register-manager" element={<ManagerRegister />} />      
          {/* done       */}
          <Route path="/user/allmanagers" element={<ManagerList />} />
          {/* done */}
          <Route path="/user/allcustomers" element={<CustomerList />} />  
          {/* done */}
          <Route path="/user/register-admin" element={<AdminRegister />} />
          {/* done */}
          <Route path="/user/allAdmins" element={<AdminList />} />
 





          <Route
            path="/user/login-adminAndManger"
            element={<AdminManagerLogin />}
          />
          <Route path="/user/update-manager/:Id" element={<EditManager />} />
          <Route path="/user/update-admin/:Id" element={<EditAdmin />} />
 <Route
            path="/user/register-customer"
            element={<CustomerRegister />}
          />
          {/* <Route path="/user/login-customer" element={<CustomerLogin />} /> */}
          
          
         
         

    </Routes>
    <Footer/>
    </div>
    </>
    </BrowserRouter>
  )
}

export default App
