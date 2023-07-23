import React, {  useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Login({saveUser}) {
  let [isPageloading,setIsPageLoading]=useState(true)
  let [isLoading,setIsLoading]=useState(false)
  let [error,setError]=useState(null)
  let navigate = useNavigate()


  let logInSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid Email"),
    password: Yup.string().required("Required").matches(/^[A-Z][\w]{4,8}/,"Invalid password"),
  })

let logIn= async(values)=>{
  setIsLoading(true)
  let {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).catch((err)=>{setError(err.response.data.message);setIsLoading(false)})
  if(data?.message=="success"){
    setIsLoading(false)
    localStorage.setItem("userToken",data.token)
    saveUser()
    navigate("/home")
  }
}

let formik = useFormik({
initialValues:{
email:"",
password:""
},validationSchema:logInSchema
,onSubmit:(values)=>{logIn(values);}
})
useEffect(()=>{
  setTimeout(()=>{
    setIsPageLoading(false)
  },1000)
},[])

  return (
    <>
    <Helmet>
        <title>Login</title>
        </Helmet>
    {isPageloading?<>
      <div className="loader">
      <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      </div>
      </>:<><div className="container my-5 p-5">
        
        <div className="row justify-content-center">
          
          <div className="col-md-7 border rounded-5 p-5  ">
          <h2>Login...</h2>
          <Form onSubmit={formik.handleSubmit} className='my-5 mb-2'>
                {error?<h4 className='alert alert-danger h6 text-center '>{error}</h4>:""}
  
            <Form.Group className="mb-3" >
              <Form.Label htmlFor='email'>Email address</Form.Label>
              <Form.Control onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id='email' type="email" placeholder="Enter email" />
              <Form.Text className="text-danger">
                {(formik.errors.email&&formik.touched.email)?formik.errors.email:""}
              </Form.Text>
            </Form.Group>
  
            <Form.Group className="mb-3" >
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id='password' type="password" placeholder="Password" />
              <Form.Text className="text-danger">
                {(formik.errors.password&&formik.touched.password)?formik.errors.password:""}
              </Form.Text>
            </Form.Group>
  
            {isLoading?<>
              <Button disabled variant="secondary" className='d-flex ms-auto mt-4' type="submit">
              <i className='fa-solid fa-hurricane fa-spin'></i>
            </Button>
            </>:<><Button disabled={!(formik.dirty&&formik.isValid)} variant="secondary" className='d-flex ms-auto mt-4' type="submit">
              Login
            </Button></>}
          
        </Form>
          </div>
        </div>
        </div></>
      }</>
  )
}
