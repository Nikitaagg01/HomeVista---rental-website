import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/HomeVista.png";
import { IoSearchSharp } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  MdWhatshot,
  MdHolidayVillage,
  MdOutlinePool,
  MdBedroomParent,
} from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";

const Nav = () => {
  const [showpopup, setShowpopup] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const popupRef = useRef();
  let {userData,setUserData}=useContext(userDataContext)
  const { serverUrl, setUser } = useContext(authDataContext);

  // ✅ Logout Function (FIXED)
  const handleLogOut = async () => {
    try {
      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      )
      setUserData(null);           // clear user
      setShowpopup(false);     // close popup
      navigate("/login");      // redirect

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowpopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full border-b border-gray-200 bg-white">

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 relative">

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="w-[100px] md:w-[120px] cursor-pointer hover:scale-105 transition"
        />

        {/* Search */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm hover:shadow-md transition">
          <input
            type="text"
            placeholder="Anywhere | Any City | Any Location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 outline-none w-[200px] lg:w-[300px]"
          />
          <button className="bg-black text-white px-4 py-2 hover:bg-gray-800 active:scale-95 transition">
            <IoSearchSharp />
          </button>
        </div>

        {/* Right Section */}
        <div
          className="flex items-center gap-4 md:gap-6 relative"
          ref={popupRef}
        >

          <span className="hidden md:block cursor-pointer text-sm px-3 py-2 rounded-full hover:bg-gray-100">
            List Your Home
          </span>

          {/* Profile Button */}
          <button
            onClick={() => setShowpopup((prev) => !prev)}
            className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-full hover:shadow-md hover:bg-gray-100 active:scale-95 transition"
          >
            {userData ? <CgProfile /> : <FaClipboardList />}

            <span className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center'>
          {userData?.name?.slice(0,1)}
            </span>
          </button>
    
          {/* Popup */}
          {showpopup && (
            <div className="absolute top-[120%] right-0 w-[220px] bg-white border border-gray-300 rounded-xl shadow-md z-20">
              <ul className="text-[15px] flex flex-col py-2">

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setShowpopup(false);
                  }}
                >
                  Login
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogOut}
                >
                  Logout
                </li>

                <div className="h-[1px] bg-gray-200 my-1"></div>

                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  List your Home
                </li>

                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Listing
                </li>

                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Check Booking
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="flex items-center md:justify-center justify-start gap-8 px-4 md:px-10 py-3 overflow-x-auto">

        {[
          { icon: <MdWhatshot />, name: "Trending" },
          { icon: <MdHolidayVillage />, name: "Villa" },
          { icon: <GiFamilyHouse />, name: "Farm House" },
          { icon: <MdOutlinePool />, name: "Pool House" },
          { icon: <MdBedroomParent />, name: "Rooms" },
          { icon: <SiHomeassistantcommunitystore />, name: "Flat" },
          { icon: <IoBedOutline />, name: "PG" },
          { icon: <FaTreeCity />, name: "Cabins" },
          { icon: <BiSolidBuildingHouse />, name: "Shops" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[80px] cursor-pointer hover:border-b-2 border-gray-400 pb-1 transition"
          >
            <div className="text-xl">{item.icon}</div>
            <h3 className="text-sm">{item.name}</h3>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Nav;