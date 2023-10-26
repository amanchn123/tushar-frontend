"use client";
import "../styles/Home.module.css";
import Footer from "@/components/Layout/Footer/Footer";
import NewsLetter from "@/components/Newsletter/NewsLetter";
import NewsTabs from "@/components/Sidebar/NewsTabs";
import React from "react";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import ScoreComp from "@/components/News/ScoreComp";
import BreakingNews from "@/components/News/BreakingNews";
import FeaturedNews from "@/components/News/FeaturedNews";
import VideoCarousel from "@/components/FeatureNews/VideoCarousel";
import TrendingNews from "@/components/News/E-paperSlide";
import Blogs from "@/components/News/Blogs";
import TrendingCarousel from "@/components/News/TrendingCarousel";


export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">

    <div className="home-1-bg">
      <DrawerHeader />
      <BreakingNews />
      <div className="post__gallery__area">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 ">
              <FeaturedNews />
            </div>
            <div className="col-lg-3">
              <div
                className="post_gallery_sidebar"
                style={{ height: "100%", paddingTop: "6%" }}
              >
                <ScoreComp />
              </div>
            </div>
            
            <div className="col-lg-12">
              <VideoCarousel />
            </div>
            <div className="col-lg-12">
              <NewsLetter />
            </div>
            <div className="col-lg-12">
            <TrendingCarousel />
            </div>
          </div>
        </div>
      </div>
  
      <div className="post__gallery__area">
        <div className="container">
          <div className="row mb-16">
            <div className="col-lg-9 ">
              <Blogs />
            </div>
            <div className="col-lg-3">
              <div
                className="post_gallery_sidebar"
                style={{ height: "100%", paddingTop: "6%" }}
              >
                <NewsTabs />
              </div>
            </div>
          
          </div>
        </div>
      </div>

      <Footer />
    </div>

    // </main>
  );
}
