"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import ModalVideo from "react-modal-video";
import Slider from "react-slick";
import { api } from "../api/api";
import { videourl } from "../api/api"; 
import { useMediaQuery } from '@mui/material';



function PrevArrow(props) {
  const { onClick } = props;
  return (
    <span className="prev slick-arrow" onClick={onClick}>
      <i className="fal fa-angle-left"></i>
    </span>
  );
}
function NextArrow(props) {
  const { onClick } = props;
  return (
    <span className="next slick-arrow" onClick={onClick}>
      <i className="fal fa-angle-right"></i>
    </span>
  );
}

export default function VideoCarousel({ customClass, dark }) {
  const portJoin = useMediaQuery("(max-width:990px)");
  const[videos,setVideos]=useState([])
  const getVideos=async()=>{
    try{
     const response=await axios.get(`${api}/getVideos`)
     if(response.data.length>0){
      setVideos(response.data)
     }
     console.log("bites",response.data.length)
    }catch(error){
      console.log('error in getting videos in frontend',error)
    }
  }
  
  useEffect(()=>{
    getVideos()
  },[])

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 80000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  // const [pause, setPause] = useState(true);
  // const videoRefs = postData.map(() => React.createRef());

  // const handlePlayClick = (index) => {
  //   if (videoRefs[index].current) {
  //     const video = videoRefs[index].current;

  //     if (video.paused) {
  //       video.play();
  //     } else {
  //       video.pause();
  //     }
  //   }
  // };

  return (
    <section className={`feature-area ${customClass}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={`section-title ${dark ? "section-title-2" : ""}`}>
              <h3 className="font-semibold">News Bites</h3>
            </div>
          </div>
        </div>
        <Slider className="row feature-post-slider" {...settings}>
          {videos.map((item, i) => (
            <div className="col" key={i + 1} >
              <div
                className="feature-post-thumb flex justify-center "
                // style={{ height: "250px", width: portJoin?:"300", borderRadius: "10%" }}
              >
                <video
                  className="rounded-2xl "
                  // ref={videoRefs[i]}
                  width="340"
                  height="200"
                  controls={true}
                >
                  <source src={`${videourl}/${item.name}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
              </div>
              {/* <div className="feature-post-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="post-meta">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event from propagating
                      handlePlayClick(i);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation(); // Prevent touch event from propagating
                      handlePlayClick(i);
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      alt="Play"
                      src="/images/videoplay.jpg"
                    />
                  </button>
                </div>
              </div> */}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
