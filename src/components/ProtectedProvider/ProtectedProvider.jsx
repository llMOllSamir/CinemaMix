import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedProvider(prop) {
 if (localStorage.getItem("userToken")){
  return prop.children
 }else return <Navigate to={"/login"}/>

}
