import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";

const SignUp = () => {
  const { serverUrl } = useContext(authDataContext);
 let {userData,setUserData}=useContext(userDataContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("🔥 Form submitted");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
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
      
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 rounded-2xl shadow-xl w-[350px] space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Home<span className="text-green-500">Vista</span>
        </h2>

        <p className="text-center text-gray-500 text-sm">
          Create your account
        </p>

        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Username</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col relative">
          <label className="text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <IoEyeSharp className="absolute right-3 bottom-2" />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;