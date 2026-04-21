import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

// icons
import { MdHolidayVillage, MdOutlinePool, MdBedroomParent } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { useContext } from 'react';
import { listingDataContext } from '../Context/ListingContext';

const ListingPage2 = () => {
  let navigate = useNavigate()
  const [selected, setSelected] = useState("")

   let {category,setCategory}=useContext(listingDataContext)
  const categories = [
    { icon: <MdHolidayVillage />, name: "Villa" },
    { icon: <GiFamilyHouse />, name: "Farm House" },
    { icon: <MdOutlinePool />, name: "Pool House" },
    { icon: <MdBedroomParent />, name: "Rooms" },
    { icon: <SiHomeassistantcommunitystore />, name: "Flat" },
    { icon: <IoBedOutline />, name: "PG" },
    { icon: <FaTreeCity />, name: "Cabins" },
    { icon: <BiSolidBuildingHouse />, name: "Shops" }
  ]

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] space-y-5 relative">

        {/* Back Button */}
        <div 
          onClick={()=>navigate("/listingpage1")} 
          className="absolute top-4 left-4 cursor-pointer"
        >
          <FaArrowLeftLong className='w-[20px] h-[20px] text-gray-600'/>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Set your <span className="text-green-500">Category</span>
        </h2>

        <p className="text-center text-gray-500 text-sm">
          Which of these best describes your place?
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">

          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setCategory(item.name)
                setSelected(item.name)
              }}
              className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition 
              ${selected === item.name 
                ? "border-blue-500 bg-blue-50 scale-105 shadow-md" 
                : "hover:border-green-400 hover:scale-105"}`}
            >
              <div className="text-2xl mb-2">
                {item.icon}
              </div>
              <h3 className="text-sm font-medium">{item.name}</h3>
            </div>
          ))}

        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/nextpage")} 
          disabled={!selected}
          className={`w-full py-2 rounded-lg font-semibold text-white transition 
          ${selected 
            ? "bg-gradient-to-r from-blue-500 to-green-500 hover:opacity-90" 
            : "bg-gray-300 cursor-not-allowed"}`}
        >
          Next
        </button>

      </div>
    </div>
  )
}

export default ListingPage2