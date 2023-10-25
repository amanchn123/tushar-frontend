import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ModalVideo from 'react-modal-video';
import axios from 'axios';
import { api } from '../api/api';
import { imageurl } from '../api/api';
import { useMediaQuery } from '@mui/material';


const postData = [
  {
    postThumb: '/images/play-post-1.jpg',
    postThumbDark: '/images/paper1.png',
    postCategory: '',
    postDate: '',
    postTitle: '',
  },
  {
    postThumb: '/images/play-post-2.jpg',
    postThumbDark: '/images/paper2.jpeg',
    postCategory: 'TECHNOLOGY',
    postDate: 'March 26, 2020',
    postTitle: 'Success is not a good food failure makes you humble',
  },
  {
    postThumb: '/images/play-post-1.jpg',
    postThumbDark: '/images/play-post-2.jpg',
    postCategory: 'TECHNOLOGY',
    postDate: 'March 26, 2020',
    postTitle: 'Success is not a good food failure makes you humble',
  },
];

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <span className="prev slick-arrow" onClick={onClick} style={{backgroundColor:"orange"}}>
      <i className="fal fa-angle-left"></i>
    </span>
  );
}
function NextArrow(props) {
  const { onClick } = props;
  return (
    <span className="next slick-arrow" onClick={onClick} style={{backgroundColor:"orange"}}>
      <i className="fal fa-angle-right"></i>
    </span>
  );
}

export default function TwoPostCarousel({ dark, customClass }) {

  const paperurl=imageurl;
  const [isOpen, setOpen] = useState(false);
  const [data,setData]=useState([])
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 30000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    speed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
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

  const portsize=useMediaQuery("(max-width:990px)")
  const getEnews=async()=>{
    try{
     const response=await axios.get(`${api}/getenews`)
     console.log(response.data)
     setData(response.data) 
    }catch(error){
      console.log("error in getting e-news",error)
    }
  }

  useEffect(()=>{
    getEnews()
  },[])
  return (
    <section
      className={`single-play-post-area  ${customClass} ${
        dark ? 'single-play-post-dark-area' : ''
      } `}
  
    >
       {/* <div className="container custom-container"> 
        <div className="single-play-box">  */}
        {data && data.map((epap)=>{
          console.log('epap',epap)
          return(
            <Slider {...settings} className="row single-play-post-slider mb-16">
            { epap?.content?.map((item, i) => (
              
              <div className="col" key={i + 1}>
              {console.log("itemm",item)}
                <div className="single-play-post-item ">
                    <img src={`${imageurl}/${item}`} alt="play" style={{height:portsize?"":"700px"}}/>
   

                  <div className="single-play-post-content">
                    <div className="post-meta">
                      <div className="meta-categories">
                        <a href="#">{item.postCategory}</a>
                      </div>
                      <div className="meta-date">
                        <span>{epap.date.slice(0,10)}</span>
                      </div>
                    </div>
                    <h3 className="title">
                      <Link href="/post-details-two">{item.postTitle}</Link>
                    </h3>
                  </div>
                  {/* <div className="play-btn">
                    <a
                      className="video-popup"
                      onClick={() => setOpen(true)}
                      href="#"
                    >
                      <i className="fas fa-play"></i>
                    </a>
                  </div> */}
                </div>
              </div>
            ))}
          </Slider>
          )
        })}
          
        {/* </div> 
       </div>  */}
    </section>
  );
}
