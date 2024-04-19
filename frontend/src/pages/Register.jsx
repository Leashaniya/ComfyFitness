import React,{useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';


const Register = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({
        ...formData,
        [id]: value,
      });
  
      const newErrors = { ...errors };
      if (value.trim() === "") {
        newErrors[id] = "This field is required";
      } else {
        delete newErrors[id];
      }
      setErrors(newErrors);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await fetch("http://localhost:3001/server/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (data.success === false) {
          setErrors(data.message);
          return;
        }
  
        setErrors(null);
        alert("LogIn to Your Account!");
        navigate("/login");
      } catch (error) {
        setErrors(error.message);
      }
    };
  
    return (
      <div>
        <Navbar />
        <div className="flex w-[1000px] h-[600px] bg-gray-100 m-auto rounded-3xl p-8 my-7">
          <div className="p-5 flex-1">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-10 text-center ">
                Create Your Account
              </h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter the name"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  name="name"
                  autoComplete="off"
                  id="name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}
              </div>
  
              <div className="mb-4">
                <input
                  placeholder="Enter the E-mail"
                  className="w-full p-2 border rounded"
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
  
              {/* Dropdown for selecting the role */}
              <div className="mb-4">
                <select
                  className="w-full p-2 border rounded"
                  name="role"
                  id="role"
                  onChange={handleChange}
                  value={formData.role} // Add value attribute
                >
                  <option value="" disabled>Select your role</option>
                  <option value="user">User</option>
                  <option value="supplier">Supplier</option>
                  <option value="Staff">Staff</option>
                  <option value="StManager">Staff Manager</option>
                  <option value="Shipment">Shipment</option>
                  <option value="marketingM">marketingM</option>
                  <option value="Owner">Owner</option>
                </select>
                {errors.role && (
                  <span className="text-red-500">{errors.role}</span>
                )}
              </div>
  
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter the Password"
                  className="w-full p-2 border rounded"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
  
              <div className="flex justify-between">
                <div className="flex">
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                  />
                  <div className="-mt-1 pl-3">
                    <label htmlFor="myCheckbox">Accept all Terms:</label>
                  </div>
                </div>
              </div>
  
              <button className="bg-green-500 w-full text-white px-4 py-2 rounded mt-6 hover:bg-green-900">
                Register Now
              </button>
            </form>
            <h1 className="text-center mt-10">
              Have An Account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:opacity-95 cursor-pointer"
              >
                LogIn
              </Link>
            </h1>
          </div>
          <div>
            {/* <img className="w-96 h-96" src={RegisterPic} alt="" /> */}
          </div>
        </div>
      </div>
    );
}

export default Register
