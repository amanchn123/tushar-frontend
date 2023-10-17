"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import Slider from "react-slick";

const postData = [
  {
    postThumb: "/vid1.mp4",
    postThumbDark: "/images/feature-dark-1.jpg",
    postTag: "TECHNOLOGY",
    postDate: "March 26, 2020",
    postTitle: "Best garden wing supplies for the horticu ltural",
  },
  {
    postThumb: "/vid2.mp4",
    postThumbDark: "/vid3",
    postTag: "TECHNOLOGY",
    postDate: "March 26, 2020",
    postTitle: "Best garden wing supplies for the horticu ltural",
  },
  {
    postThumb: "/vid3.mp4",
    postThumbDark: "/images/feature-dark-3.jpg",
    postTag: "TECHNOLOGY",
    postDate: "March 26, 2020",
    postTitle: "Best garden wing supplies for the horticu ltural",
  },
  {
    postThumb: "/vid5.mp4",
    postThumbDark: "/images/feature-dark-4.jpg",
    postTag: "TECHNOLOGY",
    postDate: "March 26, 2020",
    postTitle: "Best garden wing supplies for the horticu ltural",
  },
  {
    postThumb: "/vid4.mp4",
    postThumbDark: "/images/feature-dark-2.jpg",
    postTag: "TECHNOLOGY",
    postDate: "March 26, 2020",
    postTitle: "Best garden wing supplies for the horticu ltural",
  },
];

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
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
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

  const [pause, setPause] = useState(true);
  const videoRefs = postData.map(() => React.createRef());

  const handlePlayClick = (index) => {
    if (videoRefs[index].current) {
      const video = videoRefs[index].current;

      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <section className={`feature-area ${customClass}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={`section-title ${dark ? "section-title-2" : ""}`}>
              <h3 className="title">Feature News</h3>
            </div>
          </div>
        </div>
        <Slider className="row feature-post-slider" {...settings}>
          {postData.map((item, i) => (
            <div className="col" key={i + 1}>
              <div
                className="feature-post-thumb flex justify-center"
                style={{ height: "auto", width: "auto", borderRadius: "10%" }}
              >
                <video
                  className="rounded-2xl bg-orange-100"
                  ref={videoRefs[i]}
                  width="340"
                  height="200"
                  controls={true}
                >
                  <source src={item.postThumb} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="feature-post-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}