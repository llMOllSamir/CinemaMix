import React, { useContext, useEffect, useState } from 'react'
import styles from "./Navbar.module.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { apisContext } from '../../Context/ApisContext';
import { darkContext } from '../../Context/DarkContext';


export default function NavBar({userdata,logOut}) {
let [isLtr,setIsLtr]=useState(true)

let {setLang ,lang} = useContext(apisContext)
let {setIsDark,isdark}=useContext(darkContext)
// using navigate router-dom for navbar 
let navegate = useNavigate()

// toggle darkmood 
let darkSwitch=()=>{
    setIsDark(!isdark)
}

// edit direction  
let langSet=()=>{
  if(document.body.style.direction=="ltr"){
    document.documentElement.lang="ar"
    document.body.style.direction="rtl";
    localStorage.setItem("direction","rtl")
    setLang("ar")
    setIsLtr(false)
  }else{
    document.documentElement.lang="en"
  document.body.style.direction="ltr";
  localStorage.setItem("direction","ltr")
  setIsLtr(true)
  setLang("en")
}
}

// checkdirection 
let checkdirection=()=>{
  if(localStorage.getItem("direction")){
   
  document.body.style.direction=localStorage.getItem("direction")
    if (localStorage.getItem("direction")=="rtl"){setIsLtr(false);setLang("ar") ; document.documentElement.lang="ar"}
}}



// call functions using use effect
    useEffect(()=>{
      checkdirection()
    },[])

  return (
    <>
    
    <Navbar collapseOnSelect sticky='top' expand="lg" bg="dark" variant="dark">
      <Container fluid className='mx-5'>
        <Navbar.Brand className={`${styles.brandText} fw-bold fs-4 text-danger pointer`}  onClick={(()=>{navegate("/")})} >Cinema Mix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={lang=="en"?"ms-auto":"me-auto"}>
          {userdata?<>
            <Nav.Link className='nav-link' href='#' onClick={(()=>{navegate("/home")})}>{lang=="en"?"Home":"الرئيسيه"}</Nav.Link>
            <Nav.Link className='nav-link' href='#' onClick={(()=>{navegate("/movies")})}>{lang=="en"?"Movies":"أفلام"}</Nav.Link>
            <Nav.Link className='nav-link' href='#' onClick={(()=>{navegate("/tvshow")})}>{lang=="en"?"Tv-Show":"مسلسلات"}</Nav.Link>
            <Nav.Link className='nav-link' href='#' onClick={(()=>{navegate("/people")})}>{lang=="en"?"People":"اشخاص"}</Nav.Link>
            <Nav.Link className='nav-link' href='#' onClick={(()=>{langSet()})}><i className="fa-solid fa-globe"></i> {isLtr?"en":"ar"}</Nav.Link>
            
          </>:<>
          <Nav.Link href='#' className='nav-link' onClick={(()=>{navegate("/login")})}>{lang=="en"?"Login":"تسجيل الدخول"}</Nav.Link>
          <Nav.Link href='#' className='nav-link' onClick={(()=>{navegate("/register")})}>{lang=="en"?"Register":"التسجيل"}</Nav.Link></>}
            {userdata?<><NavDropdown title={userdata?.name} id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={darkSwitch}><i className="fa-solid fa-circle-half-stroke"></i> {isdark?"Dark Mood":"Light Mood"}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut} >
              <i className="fa-solid fa-right-from-bracket me-1"></i> {lang=="en"?"LogOut":"تسجيل الخروج"} 
              </NavDropdown.Item>
            </NavDropdown></>:<><Nav.Link onClick={darkSwitch}>{isdark?<><i className="fa-sharp fa-solid fa-moon fs-5"></i></>:<><i className="fa-solid fa-sun text-warning fs-5"></i></>}</Nav.Link></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
