import React from 'react'
import { Navigate } from 'react-router-dom'

export default function LoginProvider(prop) {

  if (localStorage.getItem("userToken")){
    return <Navigate to={"/home"}/>
   }else return prop.children
  


}
