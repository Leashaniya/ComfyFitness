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

function App() {
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
    </Routes>


    <Footer/>
    </div>
    </>
    </BrowserRouter>
  )
}

export default App
