import React, { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';

const Login = () => {
  let [show,setShow]=useState(false);
  let {serverUrl}=useContext(authDataContext);
  let navigate=useNavigate();

  let {userData,setUserData} = useContext(userDataContext);

  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");

  const handleLogin = async (e) => {
      e.preventDefault();
      console.log("🔥 Form submitted");
  
      try {
        const result = await axios.post(
          `${serverUrl}/api/auth/login`,
          { email, password },
          { withCredentials: true }

        )
        setUserData(result.data)
  navigate("/")
        console.log("✅ SUCCESS:", result);
        alert("Signup successful!");
  
      } catch (error) {
        console.log("❌ ERROR:", error.response?.data || error.message);
      }
    };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100">

      <form className="bg-white p-8 rounded-2xl shadow-xl w-[350px] space-y-5" onSubmit={handleLogin}>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Home<span className="text-green-500">Vista</span>
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)} value={email}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 relative"
            placeholder="Enter your password"
           required onChange={(e)=>setPassword(e.target.value)} value={password}

          />
          <IoEyeSharp className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] ' />

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Create a new account{" "}
        <Link to="/SignUp" className="text-blue-500 hover:underline">
  SignUp
       </Link>
        </p>

      </form>
    </div>
  )
}

export default Login