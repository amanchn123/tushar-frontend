"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { api } from "../api/api";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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


export default function PostCarousel({ dark }) {
  const [postData, setPostData] = useState([]);
  const [time,setTime]=useState([])

  const getAllPost = async () => {
    const response = await axios.post(`${api}/getPost`, {
      subCategory: "Breaking News",
    });
    await response.data.slice(0, 4);
    setPostData(response.data);
  };
  useEffect(() => {
    getAllPost();
  }, [time]);

  // const PostData= getAllPost()
  const bannerUrl = "http://localhost:5000/uploads";
  console.log("breee", postData);
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 2,
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
  return (
    <section className="post-area">
    
      <div className="container">
      <h4 style={{color:"grey"}}>
                    Breaking News
                  </h4>
        <Slider
          className="row post-slider justify-content-between"
          {...settings}
        >
          {postData &&
            postData.map((item, i) => {
            
              const timeDifference = Date.now() - new Date(item.createdAt);
              const minutesDifference = Math.floor(timeDifference / 1000 / 60);
              const hoursDifference = Math.floor(
                timeDifference / 1000 / 60 / 60
              );

              const convertDays=Math.floor(hoursDifference / 7)
              console.log("convertDays",convertDays)

              {/* if(minutesDifference>60){
                setTime([hoursDifference,"hrs"])
              }else if(hoursDifference>24){
                let days=hoursDifference/24
                setTime([days,"days"])
              }else if(minutesDifference<=60){
                setTime([minutesDifference,"min"])
              } */}


              return (
                <div className="col" key={i + 1}>
                
                  <div
                    className={`single__post d-flex align-items-center flex-column flex-lg-row ${
                      dark ? "post_dark" : ""
                    }`}
                  >
                    <div className="post-thumb">
                      <img
                        style={{ height: "70px", width: "80px" }}
                        src={`${bannerUrl}/${item.banner}`}
                        alt="post"
                      />
                    </div>
                    <div className="post-content">
                      <h4 className="title">
                        <Link href={`${item.slug}`}>{item.heading}</Link>
                      </h4>
                      <p><AccessTimeIcon /> {minutesDifference<=60?`${minutesDifference} Minutes`:""}{minutesDifference>60?`${hoursDifference} Hours`:""} Ago</p></div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
}
