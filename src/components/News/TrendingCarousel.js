import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ModalVideo from 'react-modal-video';
import axios from 'axios';
import { api,imageurl } from '../api/api';
import { Domain } from '../api/domain';



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

export default function TwoPostCarousel({ dark, customClass }) {
  const postUrl=imageurl
  const [postData, setPostData] = useState([]);
  const getAllPost = async () => {
    try {
      const response = await axios.post(`${api}/getPost`, {
        subCategory: "Trending News",
      });
      // await ;
      await setPostData(response.data.slice(0, 8));

    } catch (error) {
      console.log("error in getting featured news in frontend", error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);
  const [isOpen, setOpen] = useState(false);
  const settings = {
    slidesToShow: 2,
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
      className={`single-play-post-area mt-16 ${customClass} ${
        dark ? 'single-play-post-dark-area' : ''
      } `}
    >
    <h3 className='title font-semibold'>Trending News</h3>
      <div className="container custom-container " style={{padding:"0%"}}>
        <div className="single-play-box  " style={{padding:"0%"}}>
          <Slider {...settings} className="row single-play-post-slider ">
            {postData && postData.map((item, i) => (
              <div className="col  " key={i + 1} >
                <div className="single-play-post-item ">
               
                    <img src={`${postUrl}/${item.banner}`} className='cover-image' alt="play" style={{height:"400px"}} />
                

                  <div className="single-play-post-content">
                    <div className="post-meta">
                      <div className="meta-categories">
                        <a href="#">{item.category}</a>
                      </div>
                      <div className="meta-date">
                        <span>{item.createdAt.slice(0,10)}</span>
                      </div>
                    </div>
                    <h3 className="title">
                      <Link href={`${Domain}/${item.category}/${item.slug}`}>{item.heading}</Link>
                    </h3>
                  </div>
                  
                </div>
              </div>
            ))}
          </Slider>
          
        </div>
      </div>
    </section>
  );
}
