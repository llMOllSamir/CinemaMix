import React, { useContext, useEffect, useState } from 'react'
import styles from "./Home.module.css";
import {Helmet} from "react-helmet";
import { apisContext } from '../../Context/ApisContext';
import MoviesFatures from "../MoviesFatures/MoviesFatures.jsx"
import PeopleFatures from "../PeopleFatures/PeopleFatures.jsx"
import TvShowFatures from "../TvShowFatures/TvShowFatures.jsx"

export default function Home({isdark}) {
let [isLoading,setLoading]=useState(false)
let [moviesData,setMovies]=useState([])
let [personData,setPersons]=useState([])
let [tvData,setTvData]=useState([])
let {trending,lang}=useContext(apisContext)

let getData= async(mtype,callBack,page)=>{
  let {data} = await trending(mtype,page)
    callBack(data.results)
}

let getInformation=async()=>{
  setLoading(true)
  await getData("movie",setMovies)
  await getData("person",setPersons)
  await getData("tv",setTvData)
  setLoading(false)
}

  useEffect(()=>{
    getInformation()
  },[])
  useEffect(()=>{
    getInformation()
   
  },[lang])

  return (
  <>
        <Helmet>
        <title>Cinema Mix</title>
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
    <div className="container-fluid py-5 my-5 ">
      <MoviesFatures isdark={isdark}  moviesData={moviesData}></MoviesFatures>
      <PeopleFatures   personData={personData}></PeopleFatures>
      <TvShowFatures   tvData={tvData}></TvShowFatures>
      </div>
      </>}
     
      
      </>
  )
}
