import React, { useContext, useEffect } from 'react'
import { apisContext } from '../../Context/ApisContext';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { darkContext } from '../../Context/DarkContext';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Helmet } from 'react-helmet';


export default function TvDetailes() {
  let [isLoading,setIsLoading]=useState(true)
  let [tvData,setTvData]=useState(null)
  let {id}=useParams()
  let {trendingId,lang,baseImgurl}=useContext(apisContext)
  let {isdark}=useContext(darkContext)


  let getData= async()=>{
    setIsLoading(true)
    let {data} = await trendingId("tv",id)
    setIsLoading(false)
    setTvData(data)
  }

  useEffect(()=>{
    getData();
  },[])

  // change language
  useEffect(()=>{
    getData();
  },[lang])



  return (
    <>
    <Helmet>
        <title>Tv Show</title>
        </Helmet>
    {isLoading?<>
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
      </>:<>
      <div className="container shadow-lg my-5 py-5">
        {tvData&&<div className="row">
          <div className="col-md-4 text-center">
            <img src={baseImgurl+tvData.poster_path} className='w-100 rounded-5 shadow-lg' alt="" />
            <Rating  name="read-only" readOnly value={(tvData.vote_average/2)} max={5} precision={0.25} size="large"/>
          </div>
          <div className="col-md-8 ">
          <h2 className='text-center'> <div className="badge bg-dark fs-2">{tvData.name}</div> <h5 className='my-1'>{tvData.tagline}</h5></h2>

          <h4 className='my-3'>{lang==="en"?"Language":"اللغه"} : </h4> {tvData.spoken_languages.map((item,index)=><span key={index} className='badge bg-success mx-2 fs-5'>{item.name}</span>)}
          <h4 className='my-3'>{lang==="en"?"Genres":"التصنيف"} : </h4> {tvData.genres.map((item,index)=><span key={index} className='badge bg-success mx-2 fs-5'>{item.name}</span>)}
          <h4 className='my-4'>{lang==="en"?"Overview":"الوصف"} : <p className={`text-muted my-3 ${lang==="en"?"ps-5":"pe-5"}`}> {tvData.overview}</p> </h4>
          {tvData.seasons&&<h4 className='my-3 position-relative'>{lang==="en"?"Seasons":"السلسله"} :
              {tvData.seasons.map((season)=><>
                         <p className={`badge bg-secondary pointer mx-2`}>{season.name}</p>  
                         </>
              )}
           </h4>}
          <div className={`row my-3 gy-3 ${lang==="en"?"text-start":"text-end"}` }>
          {tvData.homepage && <div className="col-md-8"> <h5>{lang==="en"?"Home Page":"الموقع الرسمي"} : <Link className=' fs-5' target='__blank' to={tvData.homepage}>{tvData.homepage}</Link></h5></div>}
          </div>
          </div>

        </div>}
      </div>
      </>}
      </>
  )
}
