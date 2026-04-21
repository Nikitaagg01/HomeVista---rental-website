import React, { useContext } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Navigate, useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'

const ListingPage1 = () => {
  let navigate = useNavigate()
 let {title,setTitle,
    description, setDescription,
    frontEndImage1,setFrontEndImage1,
        frontEndImage2,setFrontEndImage2,
    frontEndImage3,setFrontEndImage3,
    backEndImage1,setBackEndImage1,
    backEndImage2,setBackEndImage2,
    backEndImage3,setBackEndImage3,
    rent,setRent,
    city,setCity,
    landmark,setLandmark,
    category,setCategory} = useContext(listingDataContext)

  const handleImage1=(e)=>{
    let file = e.target.files[0]
    setBackEndImage1(file)
    setFrontEndImage1(URL.createObjectURL(file))
    
  }

  const handleImage2=(e)=>{
    let file = e.target.files[0]
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))
    
  }

  const handleImage3=(e)=>{
    let file = e.target.files[0]
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))
    
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100">

      <form className="bg-white p-8 rounded-2xl shadow-xl w-[400px] space-y-4 relative overflow-y-auto max-h-[90vh]" onSubmit={(e)=>{e.preventDefault()
        navigate("/listingpage2")}
      }>

        {/* Back Button */}
        <div 
          onClick={()=>navigate("/")} 
          className="absolute top-4 left-4 cursor-pointer"
        >
          <FaArrowLeftLong className='w-[20px] h-[20px] text-gray-600'/>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Setup Your <span className="text-green-500">Home</span>
        </h2>

        {/* Title Input */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Title</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter title"
            required onChange={(e)=>
              setTitle(e.target.value)
             } value={title}/>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Description</label>
          <textarea
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter description"
            required onChange={(e)=>
              setDescription(e.target.value)
             } value={description}
          />
        </div>

        {/* Images */}
        {[1,2,3].map((num)=>(
          <div key={num} className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Image {num}</label>
            <input
              type="file"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required onChange={(e)=>handleImage1(e,num)}
            />
          </div>
        ))}

        {/* Rent */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Rent</label>
          <input
            type="number"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required onChange={(e)=>
              setRent(e.target.value)
             } value={rent}
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">City</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required onChange={(e)=>
              setCity(e.target.value)
             } value={city}
          />
        </div>

        {/* Landmark */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1">Landmark</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required onChange={(e)=>
              setLandmark(e.target.value)
             } value={landmark}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Next
        </button>

      </form>
    </div>
  )
}

export default ListingPage1