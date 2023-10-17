'use client'
import React, { useEffect, useState } from 'react';
import { Domain } from '../api/domain';
import axios from 'axios';
import { api } from '../api/api';
import Link from 'next/link';

export default function LatestNews() {
  const [postData, setPostData] = useState([]);

  const getAllPost = async () => {
    try {
      const response = await axios.post(`${api}/getPost`, {
        subCategory: "Featured News",
      });
      // await ;
      setPostData(response.data.slice(0, 3));
    } catch (error) {
      console.log("error in getting featured news in frontend", error);
    }
  };
  useEffect(() => {
    getAllPost();
  },[]);

  // const PostData= getAllPost()

  const imagePath = "http://localhost:5000/uploads";
  return (
    <section className="pt-16">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h3 className="title">Our latest news</h3>
            </div>
          </div>
        </div>
        <div className="row">
         {postData&&postData.map((ele,index)=>{
          return(
            <div className="col-lg-4" key={index}>
            <div className="trending-news-item mb-30">
              <div className="trending-news-thumb">
                <img className='w-64 h-64' src={`${imagePath}/${ele.banner}`} alt="trending" />
              </div>
              <div className="trending-news-content">
                <div className="post-meta">
                  <div className="meta-categories">
                    <Link href={`${Domain}/${ele.category}`}>{ele.category}</Link>
                  </div>
                  <div className="meta-date">
                    <span>{ele.createdAt.slice(0,21)}</span>
                  </div>
                </div>
                <h3 className="title">
                  <Link href={`${Domain}/${ele.category}/${ele.slug}`}>
                    {ele.heading.slice(0,65)}
                  </Link>
                </h3>
                <p className="text">
                 {ele.metadata?.description.slice(0,120)}
                </p>
              </div>
            </div>
          </div>
          )
         })}
        </div>
      </div>
    </section>
  );
}
