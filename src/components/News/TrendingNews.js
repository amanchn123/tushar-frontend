import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ModalVideo from 'react-modal-video';
import axios from 'axios';
import { api } from '../api/api';
import { imageurl } from '../api/api';


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

export default function TrendingNews({ dark, customClass }) {
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
 

  const [isOpen, setOpen] = useState(false);
  const settings = {
    slidesToShow: 1,
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
  return (
    <section
      className={`single-play-post-area mt-10 ${customClass} ${
        dark ? 'single-play-post-dark-area' : ''
      } `}
    >
      <div className="container custom-container ">
        <div className="single-play-box">
          <Slider {...settings} className="row single-play-post-slider">
            {postDatas.map((item, i) => (
              <div className="col" key={i + 1}>
                <div className="single-play-post-item">
             
                    <img className='rounded' style={{height:"370px"}}  src={`${imagePath}/${item.banner}`} alt="play" />
                  
                  <div className="single-play-post-content">  
                    <div className="post-meta">
                      <div className="meta-categories">
                        <a href="#">{item.metadata?.title}</a>
                      </div>
                      <div className="meta-date">
                      <span>{item.createdAt.slice(0,10)}</span>
                      </div>
                    </div>
                    <h3 className="title">
                      <Link href={`${item.category}/${item.slug}`}>{item.heading}</Link>
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
        </div>
      </div>
    </section>
  );
}
