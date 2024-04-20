import { useState } from 'react'
import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import axios from 'axios'
import './App.css'

import ManagerRegister from './components/ManagerRegister'  
import ManagerList from './components/ManagerList'          
import EditManager from './components/EditManager'
import AdminList from './components/AdminList'          
import AdminRegister from './components/AdminRegister'
import CustomerList from './components/CustomerList'
import EditAdmin from './components/EditAdmin'
import AdminManagerLogin from './components/AdminManagerLogin'
import CustomerRegister from './components/CustomerRegister'
import EditCustomer from './components/EditCustomer'
import CustomerLogin from './components/CustomerLogin'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Subscription from './pages/Subscription'
import Profile from './pages/Profile'
import AdminHome from './components/AdminHome'
import ManagerHome from './components/ManagerHome'
import SubscriptionList from './components/SubscriptionList'
import SubscriptionAdd from './components/SubscriptionAdd'
import EditSubscription from './components/EditSubscription'


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
          <Route path="/user/register-manager" element={<ManagerRegister />} />      
          <Route path="/user/allmanagers" element={<ManagerList />} />
          <Route path="/user/allcustomers" element={<CustomerList />} />  
          <Route path="/user/register-admin" element={<AdminRegister />} />
          <Route path="/user/allAdmins" element={<AdminList />} />
          <Route path="/user/update-manager/:Id" element={<EditManager />} />
          <Route path="/user/register-customer" element={<CustomerRegister />}/>
          <Route path="/user/update-customer/:Id" element={<EditCustomer/>} />
          <Route path="/user/update-admin/:Id" element={<EditAdmin />} />
          <Route path="/user/login-customer" element={<CustomerLogin />} />
          <Route path="/user/login-adminAndManger" element={<AdminManagerLogin />}/>
          <Route path="/user/adminHome" element={<AdminHome />}/>
          <Route path="/user/managerHome" element={<ManagerHome />}/>
          <Route path="/subscription/" element={<SubscriptionList />} />
          <Route path="/subscription/add" element={< SubscriptionAdd />} />   
          <Route path="/subscription/update/:Id" element={< EditSubscription />} />



    </Routes>
    <Footer/>
    </div>
    </>
    </BrowserRouter>
  )
}

export default App
