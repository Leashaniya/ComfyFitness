import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button.jsx'
import FormBox from '../components/FormBox.jsx'
import Input from '../components/Input.jsx'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // const handleLogin = () => {
  //     const user = {
  //         email,
  //         password
  //     }

  //     axios.post("http://localhost:7505/user/login-customer", user)
  //         .then((res) => {
  //             localStorage.setItem("user", JSON.stringify(res.data));
  //             navigate("/");
  //         })
  //         .catch((err) => {
  //             setErrorMessage("Incorrect email or password. Please try again.");
  //             console.log(`Login Failed ${err}`);
  //         });
  // }

  const handleRegistration = () => {
      navigate("/register");
  }
  // const handleEmailChange = (event) => {
  //   setUsername(event.target.value);
  // }

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (email === 'midwife@123' && password === '123456789') {
  //     alert("Login Success")
  //     window.location.href="/";
      
  //   } else {
  //     alert("Enter correct username and password")
  //     setError('Invalid username or password');
  //   }
  // }


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === 'midwife@123' && password === '123456789') {
      alert("Login Success")
      window.location.href="/subscription";
      
    } else {
      alert("Enter correct username and password")
      setError('Invalid username or password');
    }
  }


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
              {/* <Button className="mt-[10px]" text="Login" onClick={() => { handleSubmit() }} /> */}
              <Button className="mt-[10px]" text="Register" onClick={() => { handleRegistration() }} />
              <button type="submit" onClick={handleSubmit}>Login</button>

          </FormBox>
      </div>
  );
};

export default Login;