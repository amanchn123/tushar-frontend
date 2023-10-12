// 'use client'
import AdWidgetTwo from "@/components/AdsWidget/AdWidgetTwo";
import WideAdWidget from "@/components/AdsWidget/WideAdWidget";
import CommentForm from "@/components/Comments/CommentForm";
import CommentList from "@/components/Comments/CommentList";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
// import Drawer from '@/components/Layout/Drawer/Drawer';
import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
// import Header from '@/components/Layout/Header/Header';
import Layout from "@/components/Layout/Layout";
import NewsLetter from "@/components/Newsletter/NewsLetter";
import TrendingNewsWidget from "@/components/NewsWidgets/TrendNewsWidget";
import BreadCrumb from "@/components/Others/BreadCrumb";
import LatestNews from "@/components/Others/LatestNews";
// import MostShare from '@/components/Sidebar/MostShare';
import NewsTabs from "@/components/Sidebar/NewsTabs";
import WidgetOne from "@/components/SocialMediaWidgets/WidgetOne";
import TrendingSingleCarousel from "@/components/TrendingNews/TrendingSingleCarousel";
import axios from "axios";
import { api } from "@/components/api/api";
import { redirect } from "next/navigation";
import PostCarousel from "@/components/News/PostCarousel";
// import PostCarousel from "@/components/News/PostCarousel";

async function content(params) {
  const response = await axios.post(`${api}/getpostdetails`, {
    params: params,
  });

  if (!response.data) {
    redirect("/");
  }
  return response.data;
}

export default async function PostDetailsOne({ params }) {
  let Postdata = await content(params);
  let metaDetails = Postdata?.metadata;
  let contentData = Postdata.content;

  // console.log('ele',Postdata)
  let imagePath = "http://localhost:5000/uploads";

  content(params)
    .then(async (data) => {
      console.log("dataa", data);
      // Modify the metadata object with the data from the content function
      metadata.title = await data.metadata.title; // Assuming 'title' is a property in the data
      metadata.description = await data.metadata.description; // Assuming 'description' is a property in the data
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  return (
    <>
      {/* <Content /> */}
      <div className="home-1-bg">
        <DrawerHeader />
        <PostCarousel />/
        <section className="post-layout-1-area pb-80">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <BreadCrumb CategoryName={Postdata.category} /> */}
              </div>
              <div className="col-lg-8 " style={{ marginTop: "-60px" }}>
                <div className="post-layout-top-content post-layout-top-content-3">
                  {/* <div className="post-categories d-flex justify-content-between align-content-center">
                    <div className="categories-share">
                      <ul>
                        <li>
                          <i className="fas fa-comment"></i>45020
                        </li>
                        <li>
                          <i className="fas fa-fire"></i>45020
                        </li>
                        <li>6 minutes read</li>
                      </ul>
                    </div>
                  </div> */}
                  <div className="post-content">
                    <h3 className="title">
                    {Postdata.heading}{" "}
                    </h3>
                    <div className="post-author">
                      <div className="author-info">
                        <div className="thumb">
                          <img src={`${imagePath}/${Postdata.banner}`} alt="" />
                        </div>
                        <h5 className="title">Subash Chandra</h5>
                        <ul>
                          <li>March 26, 2020</li>
                          <li>Updated 1:58 p.m. ET</li>
                        </ul>
                      </div>
                      <div className="author-social">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-youtube"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fal fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fal fa-bookmark"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-ellipsis-v"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="thumb">
                      <img src={`${imagePath}/${Postdata.banner}`} alt="" />
                    </div>
                  </div>
                  {contentData && contentData.map((ele,index)=>{
                    {/* const checkimg =ele.find("img")
                    console.log("checkimg",checkimg) */}
                    return(
                      <div className="post-text mt-35" key={index}>
                      
                      {ele.hasOwnProperty("par")? 
                      <>
                      <h5 className="title">{ele.head}</h5>
                      <p>
                       {ele.par}
                    </p>
                      </>
                     :""}
                    {ele.hasOwnProperty('img') && ele.img?
                    <div className=" pt-10 pb-35">
                      <img src={`${imagePath}/${ele.img.filename}`} alt={`${ele.alt}`} />
                    </div>:""}
                    {/* <p>
                      In global terms the US has the most Covid-19 cases - more
                      than 245,000. And on Thursday the US authorities said more
                      than 1,000 had died in the past 24 hours - the highest
                      daily toll so far in the world.
                    </p> */}
                  </div>
                    )
                  }) }

                  <div className="post-tags">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-tag"></i> Tags
                        </a>
                      </li>
                      <li>
                        <a href="#">Health</a>
                      </li>
                      <li>
                        <a href="#">World</a>
                      </li>
                      <li>
                        <a href="#">Corona</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="post_gallery_sidebar mt-40">
                  {/* <NewsTabs /> */}
                  {/* <WidgetOne customClass="mt-30" /> */}
                  {/* <TrendingSingleCarousel /> */}
                  <TrendingNewsWidget />
                  <AdWidgetTwo />
                  {/* <MostShare customClass="mt-40" /> */}
                  {/* <NewsLetter /> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <LatestNews />
        <CommentForm />
        <CommentList />
        <WideAdWidget />
        <Footer />
        <FooterCopyright />
      </div>
    </>
  );
}

export const metadata = {
  title: "DLS News",
  description: "Blogging website",
};

