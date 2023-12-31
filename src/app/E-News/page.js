"use client";
import "../../styles/Home.module.css";
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
import E_News from "@/components/News/E-news";


export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">

    <div className="ho-1-bg">
      <DrawerHeader />
      <BreakingNews />
      <div className="post_aller">
        <div className="contain">
          <div className="ow"> 
          <div className="col-lg-12">
            {/* <E_News /> */}
            <TrendingNews />
          </div>   
            
          </div>
        </div>
      </div>

      <Footer />
    </div>

    // </main>
  );
}
