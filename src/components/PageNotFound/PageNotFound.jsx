import React from 'react'
import error404 from "../../images/error404.svg"
import styles from "./PageNotFound.module.css";
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {

  let navigate=useNavigate()
  return (
    <>
    <div className="container-fluid ">
     <div className="row">
      <div className="col-12 p-0 position-relative">
      <img src={error404} className='w-100'  alt="" />
        <button onClick={()=>{navigate("/home")}} className='btn btn-outline-dark text-danger btn-sm position-absolute w-100' style={{top:"0%",left:"0%"}}>Go Home</button>
      </div>
     </div>
    </div>
    </>
  )
}
