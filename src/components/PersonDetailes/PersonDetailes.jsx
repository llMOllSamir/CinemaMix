import React, { useContext, useEffect } from 'react'
import { apisContext } from '../../Context/ApisContext';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { darkContext } from '../../Context/DarkContext';
import { Helmet } from 'react-helmet';


export default function PersonDetailes() {
  let [isLoading,setIsLoading]=useState(true)
  let [showLess,setShowLess]=useState(true)
  let [personData,setPersonData]=useState(null)
  let {id}=useParams()
  let {trendingId,lang,baseImgurl}=useContext(apisContext)



// showless Toggle
let showToggle=()=>{
  setShowLess(!showLess)
}


  let getData= async()=>{
    setIsLoading(true)
    let {data} = await trendingId("person",id)
    setIsLoading(false)
    setPersonData(data)
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
        <title>People</title>
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
        {personData&&<div className="row">
          <div className="col-md-4 text-center">
            <img src={baseImgurl+personData.profile_path} className='w-100 rounded-5 shadow-lg' alt="" />
          </div>
          <div className="col-md-8 ">
          <h2 className='text-center'> <div className="badge bg-dark fs-2">{personData.name}</div></h2>

          <h4 className='my-3'>{lang==="en"?"Place of Birth":"محل الميلاد "} : </h4> <span className='badge bg-success mx-2 fs-5'>{personData.place_of_birth}</span>
          
          
          <div className="row">
            <div className="col-md-6"><h4 className='my-3'>{lang==="en"?"Birthday":"تاريخ الميلاد"} : <span className='badge bg-success mx-2 fs-5'>{personData.birthday}</span> </h4> </div>
            {personData.deathday?<div className="col-md-6"> <h4 className='my-3'>{lang==="en"?"Deathday":"تاريخ الوفاه"} :<span className='badge bg-success mx-2 fs-5'>{personData.deathday}</span> </h4> </div>:""}
          </div>

          <h4 className='my-3'>{lang==="en"?"Known for Department":"التصنيف"} :<span className='badge bg-success mx-2 fs-5'>{personData.known_for_department}</span> </h4> 

          {personData.biography&&<h4 className='my-4'>{lang==="en"?"About":"عن حياته "} : <p className={`text-muted my-3 ${lang==="en"?"ps-5":"pe-5"}`}>
             {showLess?<>
              {personData.biography.split(" ").splice(0,50).join(" ")}
              <p onClick={showToggle} className='mx-2 pointer text-primary'>{lang==="en"?"ReadMore....":" اقرا المزيد ..."}</p>
             </>:<>
             {personData.biography}
             <p onClick={showToggle} className='mx-2 pointer text-primary'>{lang==="en"?"ReadLess....":" اقرا اقل ..."}</p>
             </>}
             </p> 
             </h4>}
          

          <div className={`row my-3 gy-3 ${lang==="en"?"text-start":"text-end"}` }>
          {personData.homepage && <div className="col-md-8"> <h5>{lang==="en"?"Home Page":"الموقع الرسمي"} : <Link className=' fs-5' target='__blank' to={personData.homepage}>{personData.homepage}</Link></h5></div>}
          </div>
          </div>

        </div>}
      </div>
      </>}
      </>
  )
}
