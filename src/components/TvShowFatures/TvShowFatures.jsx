import React, { useContext} from 'react'
import { apisContext } from '../../Context/ApisContext'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Rating } from '@mui/material';
import styles from "./TvShowFatures.module.css";
import { darkContext } from '../../Context/DarkContext';



export default function TvShowFatures({tvData}) {
  let {baseImgurl,lang}=useContext(apisContext)
  let {isdark}=useContext(darkContext)

  return (
    <>
    <div className="container-fluid px-5 my-5">
      <div className="row g-1 gy-3">
        <div className="col-12 text-center">
              <div className=" mx-auto">
                <div className="w-25 mx-auto border"></div>
                <h2 className='my-4'>{lang=="en"?"Trending Tv Show":"مسلسلات الشهر"} </h2>
                <div className="w-25 mx-auto border"></div>
              </div>
        </div>
        <div className="col-12 my-5">
        <Carousel variant={isdark?"light":"dark"} className='py-2 shadow-lg' interval={1000} controls={false} fade>
                {tvData?.map((tv)=>
              <Carousel.Item key={tv.id}>
                <div className="row">
                    <div className="col-md-4">
                      <Link to={"/tv/"+tv.id}>
                      <img
                  className=" img-fluid rounded-5  "
                  src={baseImgurl+tv.poster_path}
                  alt={tv.id}
                  
                />
                      </Link>
                </div>
                    <div className="col-md-8 my-2 align-self-center">
                       <h2>{tv.name}</h2>
                  <p className='text-muted w-75 mb-5'>{tv.overview}</p>

                  <Rating  name="read-only" readOnly value={tv.vote_average} max={10} precision={0.25} size="large"  
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
