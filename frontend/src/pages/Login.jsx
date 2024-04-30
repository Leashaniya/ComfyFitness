import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomerLogin from '../components/CustomerLogin.jsx';
import CustomerRegister from '../components/CustomerRegister.jsx'


const Login = () => {
  return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          <FormBox title="Login">
              <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                      setEmail(e.target.value);
                  }}
              />
              <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                      setPassword(e.target.value);
                  }}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button type="submit" onClick={CustomerLogin}>Login</button>

          </FormBox>
      </div>
  );
};

export default Login;