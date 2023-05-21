import React, { useContext} from 'react'
import { apisContext } from '../../Context/ApisContext'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Rating } from '@mui/material';
import styles from './MoviesFatures.module.css';
import { darkContext } from '../../Context/DarkContext';


export default function MoviesFatures({moviesData}) {
  let {baseImgurl,lang}=useContext(apisContext)
  let {isdark}=useContext(darkContext)



  return (
    <>
    <div className="container-fluid px-5 my-5">
      <div className="row g-1 gy-3">
        <div className="col-12 text-center">
              <div className=" mx-auto">
                <div className="w-25 mx-auto border"></div>
                <h2 className='my-4'>{lang=="en"?"Trending Movies":"افلام الشهر"}</h2>
                <div className="w-25 mx-auto border"></div>
              </div>
        </div>
        <div className="col-12 my-5">
        <Carousel variant={isdark?"light":"dark"}  className={`py-2 shadow-lg `} interval={1000} controls={false} fade>
                {moviesData?.map((movie)=>
              <Carousel.Item key={movie.id}>
                <div className="row">
                    <div className="col-md-4 ">
                      <Link to={"/movies/"+movie.id}>
                      <img
                  className=" img-fluid rounded-5  "
                  src={baseImgurl+movie.poster_path}
                  alt={movie.id}
                  
                />
                      </Link>
                </div>
                    <div className="col-md-8 my-2 align-self-center h-100">
                       <h2>{movie.title}</h2>
                  <p className='text-muted w-75 mb-5'>{movie.overview}</p>

                  <Rating  name="read-only" readOnly value={movie.vote_average} max={10} precision={0.25} size="large"  
                 />
                  </div>
                </div>
                
               
              </Carousel.Item>
          )}
           </Carousel></div>
      </div>
    </div>
    </>
  )
}
// 