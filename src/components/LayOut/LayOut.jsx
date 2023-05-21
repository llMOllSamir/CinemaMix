import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar.jsx"
import Footer from "../Footer/Footer.jsx"
import { useContext } from 'react';
import { darkContext } from '../../Context/DarkContext.js';

export default function LayOut({userdata,setUserData}) {
// edite dark mood style with hook state
  let navegate = useNavigate()
  let {isdark,checkDarkMood,darkMood}=useContext(darkContext)

//  logOut function
  let logOut=()=>{
  localStorage.removeItem("userToken")
  setUserData(null)
  navegate("/login")
  }

 

  useEffect(()=>{
    checkDarkMood()
  },[])

  useEffect(()=>{
    darkMood()
  },[isdark])
  return (
    <>
    <Navbar userdata={userdata} logOut={logOut}/>
    <Outlet />
    <Footer /> 
    </>
  )
}
