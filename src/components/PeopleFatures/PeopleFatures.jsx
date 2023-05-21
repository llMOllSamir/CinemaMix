import React, { useContext} from 'react'
import { apisContext } from '../../Context/ApisContext'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import styles from "./PeopleFatures.module.css";
import { darkContext } from '../../Context/DarkContext';


export default function PeopleFatures({personData}) {
  let {baseImgurl,lang}=useContext(apisContext)
  let {isdark}=useContext(darkContext)
  return (
    <>
    <div className="container-fluid px-5 my-5">
      <div className="row g-1 gy-3">
        <div className="col-12 text-center">
              <div className=" mx-auto">
                <div className="w-25 mx-auto border"></div>
                <h2 className='my-4'>{lang=="en"?"The Most Famous Actors":"اشهر الممثلين"}  </h2>
                <div className="w-25 mx-auto border"></div>
              </div>
        </div>
        <div className="col-12 my-5">
        <Carousel variant={isdark?"light":"dark"}  className='py-2 shadow-lg' interval={1000} controls={false} fade>
                {personData?.map((person)=>
              <Carousel.Item key={person.id}>
                <div className="row">
                    <div className="col-md-4">
                      <Link to={"/person/"+person.id}>
                      <img
                        className=" img-fluid rounded-5  "
                        src={baseImgurl+person.profile_path}
                        alt={person.id}  />
                      </Link>
                </div>
                    <div className="col-md-8 my-2 align-self-center">
                       <h2 className='my-3'>{person.name}</h2>
                       <h4>Category : <div className="badge bg-success">{person.known_for_department}</div></h4>
                       <h5 className='my-2 badge bg-secondary fs-6'>From his works</h5>
                       <ul>
                      {person.known_for.map(work=><li key={work.id}>
                        <Link  to={"/movies/"+work.id} className='nav-link'>{work.original_title}</Link>
                      </li>)}
                      </ul>

                  </div>
                </div>
              </Carousel.Item>)}
           </Carousel></div>
      </div>
    </div>
    </>
  )
}
