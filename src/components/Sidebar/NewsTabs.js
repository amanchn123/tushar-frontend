'use client'
import axios from "axios";
import Link from "next/link";
import { api,imageurl } from "../api/api";
import { useEffect, useState } from "react";


export default function NewsTabs() {
  const [post,setPost]=useState([])
  const getExtraPost=async()=>{
    try{
      const response=await axios.get(`${api}/getExtraPost`)
      setPost(response.data)
    }catch(error){
      console.log('error in getting extra post in frotend',error)
    }
  }

  useEffect(()=>{
    getExtraPost()
  },[])

  return (
    <>
      <div className="row">
          {post && post.map((ele,index)=>(
            <div className="col-lg-12 col-md-6" key={index}>
            <div className="trending-image-post mt-30">
              <img src={`${imageurl}/${ele.banner}`} alt="" />
              <div className="trending-image-content">
                
                <h5 className="text-light">
                  <Link href={`/${ele.category}/${ele.slug}`} className="text-light">
                    {ele.heading}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
          ))}
          
        </div>
    </>
  );
}
