import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import styles from "./Footer.module.css";
import { useNavigate } from 'react-router-dom';


export default function Footer() {
 let navigate = useNavigate()

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="bg-dark">Feed Back</Popover.Header>
      <Popover.Body>
         <strong>Thank You ♥</strong>
      </Popover.Body>
    </Popover>
  );


  return (
    <>
      <footer  className='p-5 pb-0 bg-secondary  rounded-5 '>
        <div className="container-fluid">
          <div className="row gy-2 ">
            <div className="col-xl-3 text-center ">
              <h2 className='h3 mb-3 '>
                Welcome From Our Cinema
              </h2>
              <p className=" fs-5 ">Here you will find everything you need, everything that is new to us, we are working to make everything easy for you.</p>
            </div>
          <div className="col-xl-6 border-start border-end ">
          <h2 className='h3 mb-3 text-center  '>About Us...</h2>
              <div className="row">
                <div className="col-sm-3">
                  <h4 className='text-center h5'>Categories</h4>
                  <div className="my-4">
                  <h6 className={styles.webLink} onClick={()=>{navigate("/movies")}}>Trending Movies</h6>
                  <h6 className={styles.webLink} onClick={()=>{navigate("/people")}}>Trending People</h6>
                  <h6 className={styles.webLink} onClick={()=>{navigate("/tvshow")}}>Trending Tv Show</h6>
                  </div>
                  </div>
                <div className="col-sm-8">
                  <h4 className='text-center h5'>FeedBack</h4>
                  <Form className='text-dark w-75 mx-auto'>
                  <div className="row gy-1">
                    <div className="col-md-6">
                    <Form.Group  controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                     </Form.Group>
                    </div>

                    <div className="col-md-6">
                    <Form.Group  >
                        <Form.Control type="text" placeholder="Enter Name" />
                     </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                    <Form.Group  >
                        <Form.Control type="tel" placeholder="Enter Phone" />
                     </Form.Group>
                    </div>

                    <div className="col-md-6">
                    <OverlayTrigger trigger="focus" placement="top" overlay={popover}>

                    <Button variant="primary" className='w-100' type="button">
                       Submit
                    </Button>
                    </OverlayTrigger>

                    </div>  
                  </div>
                   
                  </Form>
                </div>
              </div>
          </div>

          <div className="col-xl-3 text-center">
            <h2 className='h3 mb-3  '>Contact Us...</h2>
            <ul>
              <li className='mb-2'><a href="https://www.facebook.com/profile.php?id=100082859111033" target='__blank' className='nav-link  badge bg-primary fs-5'>
                <i className='fa fa-brands fa-facebook-f'></i>
                <span className='ms-3'>facebook.com</span>
                </a></li>

                <li className='mb-2'>
                  <a 
                  href="https://www.linkedin.com/in/mohamed-samir-a7693b274?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BKd%2B23Wc8QRiSWmB51PUudQ%3D%3D" 
                  target='__blank' 
                  className='nav-link  badge bg-light text-primary fs-5'>
                <i className='fa fa-brands fa-linkedin'></i>
                <span className='ms-3'>linkedin.com</span>
                </a></li>

                <li className='mb-2'><a href="https://github.com/llMOllSamir" target='__blank' className='nav-link  badge bg-secondary fs-5'>
                <i className='fa fa-brands fa-github'></i>
                <span className='ms-3'>github.com</span>
                </a></li>
              
            </ul>
          </div>
          </div>
        </div>
      </footer>
    </>
  )
}
