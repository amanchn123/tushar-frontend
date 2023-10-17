"use client";
import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import axios from "axios";
import Link from "next/link";
import { Domain } from "../api/domain";

export default function TrendingNewsWidget() {
  const[postDatas,setPostDatas]=useState([])
  const getTrendPost=async()=>{
    try{
      const response=await axios.post(`${api}/getPost`,{
          subCategory:"Trending News"
      })
  
      if(response.data){
         
          setPostDatas(response.data.slice(0,4))
      }else{
          console.log(response)
      }
     }catch(error){
      console.log('errro in getting trending post in frontend',error)
     }
  }
  useEffect(()=>{
 getTrendPost()
    
  },[])
  let imagePath = "http://localhost:5000/uploads";
 
  return (
    <div className=" mt-4">
      {postDatas&&postDatas.slice(0,5).map((ele,idx)=>{
        return(
          <div className="gallery_item " key={idx}>
        <div className="gallery_item_thumb">
          <img className="w-28 h-24" src={`${imagePath}/${ele.banner}`} alt="gallery" />
          {/* <div className="icon">
            <i className="fas fa-bolt"></i>
          </div> */}
        </div>
        <div className="gallery_item_content">
          <h4 className="title">
            <Link href={`${Domain}/${ele.category}/${ele.slug}`}>{ele.heading.slice(0,65)}</Link>
          </h4>
        </div>
      </div>
        )
      })}
    </div>
  );
}
