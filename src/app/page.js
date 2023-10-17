"use client";
import "../styles/Home.module.css";
import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
import Layout from "@/components/Layout/Layout";
import NewsLetter from "@/components/Newsletter/NewsLetter";
import NewsTabs from "@/components/Sidebar/NewsTabs";
import React from "react";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import ScoreComp from "@/components/News/ScoreComp";
import BreakingNews from "@/components/News/BreakingNews";
import FeaturedNews from "@/components/News/FeaturedNews";
import VideoCarousel from "@/components/FeatureNews/VideoCarousel";
import TrendingNews from "@/components/News/TrendingNews";
import Blogs from "@/components/News/Blogs";

  
export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Layout>
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
                <NewsLetter />
              </div>
              <div className="col-lg-12">
                <VideoCarousel />
              </div>
            </div>
          </div>
        </div>

        <TrendingNews />
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

        {/* <section className="all-post-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <EntertainmentNews />
                <div className="sports-news-area">
                  <div className="section-title ">
                    <h3 className="title">Sports News</h3>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="trending-news-item mb-30">
                        <div className="trending-news-thumb">
                          <img src="/images/sports-news.jpg" alt="sports" />
                        </div>
                        <div className="trending-news-content">
                          <div className="post-meta">
                            <div className="meta-categories">
                              <Link href="/post-details-two">TECHNOLOGY</Link>
                            </div>
                            <div className="meta-date">
                              <span>March 26, 2020</span>
                            </div>
                          </div>
                          <h3 className="title">
                            <Link href="/post-details-two">
                              There may be no consoles in the future ea exec
                              says
                            </Link>
                          </h3>
                          <p className="text">
                            The property, complete with 30-seat screening from
                            room, a 100-seat amphitheater and a swimming pond
                            with sandy shower…
                          </p>
                          <Link href="/post-details-two">Read more</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <SportsNewsCarousel />
                    </div>
                  </div>
                </div>
                <div className="post-add mt-30">
                  <a href="#">
                    <img src="/images/ads/banner.png" alt="ad" />
                  </a>
                </div>
                <BusinessNews />
              </div>
              <div className="col-lg-4">
                <MostShare />
                <SportsFixtures />

                <SidebarCategories />
                <AdOne />
              </div>
            </div>
          </div>
        </section> */}
        <Footer />
      </div>
    </Layout>
    // </main>
  );
}
