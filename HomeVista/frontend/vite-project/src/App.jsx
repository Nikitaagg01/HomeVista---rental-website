import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home.jsx'
import { Navigate } from "react-router-dom";
import ListingPage1 from './pages/ListingPage1.jsx';
import ListingPage2 from './pages/ListingPage2.jsx';

const App = () => {
  return (
    <>
    <Routes>
     <Route path='/signup' element={<SignUp/>}/>
<Route path='/login' element={<Login/>}/>
  <Route path="/" element={<Navigate to="/home" />} />

<Route path='/home' element={<Home/>}/>
<Route path='/listingpage1' element={<ListingPage1/>}/>
<Route path='/listingpage2' element={<ListingPage2/>}/>
    </Routes>

    </>
  )
}

export default App
