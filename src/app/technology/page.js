import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
import Layout from "@/components/Layout/Layout";
import NewsLetter from "@/components/Newsletter/NewsLetter";
import TrendingNewsWidget from "@/components/NewsWidgets/TrendNewsWidget";
import BreadCrumb from "@/components/Others/BreadCrumb";
import NewsTabs from "@/components/Sidebar/NewsTabs";
import TrendingSingleCarousel from "@/components/TrendingNews/TrendingSingleCarousel";
import axios from "axios";
import Link from "next/link";
import { api } from "@/components/api/api";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import NewsGallary from "@/components/News/NewsGallary";
import { Card, Grid } from "@mui/material";
import { SvgIcon } from "@mui/material";
// import { useMediaQuery } from "@mui/material";
import newsTab from "../../styles/newsTab.module.css";
import PostCarousel from "@/components/News/PostCarousel";
import AccessTimeIcon from '@mui/icons-material/AccessTime'


async function getAllPost() {
  
 try{
  const response = await axios.post(`${api}/getPost`, {
    category: "technology",
  });
  return response.data;
 }catch(error){
  console.log("error in calling getPost in frontend")
 }
}

export default async function Technology({ params }) {
  // let portSize=useMediaQuery("(max-width: 1000px)");
  let postData = await getAllPost();

  let bloglist1 = await postData&&postData.slice(0, 3);
  let bloglist2 = await postData&&postData.slice(3, 5);

  let imagePath = "http://localhost:5000/uploads";

  return (
    <div className="home-1-bg">
      <DrawerHeader />
      <PostCarousel />
      <section className="about-item-area">
        <div className="container px-4">
          <div className="row">
            <div className="col-lg-12"></div>
            <div className="row">
              <div className="col-lg-9 ">
                <Grid container lg={12}>
                  <h4 className="title font-bold">
                    Technology News
                  </h4>

                  {bloglist1 &&
                    bloglist1.map((ele,index) => {
                      const timeDifference = Date.now() - new Date(ele.createdAt);
              const minutesDifference = Math.floor(timeDifference / 1000 / 60);
              const hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);

              const convertDays=Math.floor(hoursDifference / 7)
                      return (
                        <Link href={`${ele.category}/${ele.slug}`} style={{width:"100%"}} key={index}>
              <Card
                sx={{
                  // display: "flex",
                  marginTop: "10px",
                  // height: "250px",
                  // width:"100%",
                  // backgroundColor:"yellow"
                  
                }}
              >
                <Grid container lg={12}>
                  <Grid
                    className={`${newsTab.categorybanner1} rounded `}
                    item
                    lg={3}
                    sm={3}
                    sx={{
                      placeItems: "center",
                      display: "grid",
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    <h5 className={`${newsTab.categorybanner1} font-bold p-2`}>
                      {ele.heading}
                    </h5>
                    <img
                      style={{
                        // display: "block",
                        height: "250px",
                        width: "100%",

                        // objectFit: "cover",
                        // borderRadius: "5%",
                      }}
                      src={`${imagePath}/${ele.banner}`}
                    />
                  </Grid>
                  <Grid item lg={8.5} sm={7} className="p-4">
                    <h5 className={`${newsTab.category2banner} font-bold`}>
                      {ele.heading}
                    </h5>
                    <div style={{height:"120px"}}>
                      {ele.metadata?.description.slice(0, 250)}
                    </div>
                    <div
                      style={{
                        // alignSelf: "end",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <span style={{color:"red"}}>Read more..</span>
                      <span><AccessTimeIcon /> 
                      {minutesDifference<=60?`${minutesDifference} Minutes`:minutesDifference>60?`${hoursDifference} hrs`:hoursDifference>24?`${convertDays} days`:""} 
                      Ago</span>
                      {" "}
                    </div>
                  </Grid>
                  <Grid
                    className={`${newsTab.category2banner} rounded shadow hover:shadow-lg focus:shadow-outline active:shadow-inner`}
                    item
                    lg={3.5}
                    sm={5}
                    sx={{ placeItems: "center", display: "grid" }}
                  >
                    <img
                      style={{
                        // display: "block",
                        height: "100%",
                        width: "100%",

                        // objectFit: "cover",
                        // borderRadius: "5%",
                      }}
                      src={`${imagePath}/${ele.banner}`}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Link>
                      );
                    })}
                </Grid>
              </div>
              <div className={`col-lg-3 ${newsTab.mobileView}`}>
                <div
                  className="post_gallery_sidebar"
                  style={{ height: "100%",paddingTop: "6%",marginTop:"10px"  }}
                >
                  <NewsTabs />
                
                </div>
              </div>
              <div className="col-lg-12">
                <div className="post_gallery_sidebar mt-40">
                  <div
                    style={{
                      width: "100%",
                      padding: "20px",
                      backgroundColor: "rgb(251, 225, 195)",
                    }}
                    className=" w-full mt-30"
                  >
                    <div className="footer-topbar">
                      <div className="row align-items-center">
                        <div className="col-lg-7 col-md-5">
                          <div className="footer-logo">
                            <h2
                              className="title mt-20 ml-30"
                              style={{ fontSize: "40px" }}
                            >
                              <b>Subscribe</b>To Our
                              <br /> Newsletter
                            </h2>
                            <p className="title4 mt-25 ml-30">
                              Get News Updates, Exam / Job Notifications,
                              <br /> GK, Current Affairs, etc
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-7">
                          <div className="footer-newaletter">
                            <div className="input-box ">
                              <input
                                type="text"
                                className="rounded"
                                placeholder="Your email address"
                              />
                              <button
                                type="button"
                                className="rounded-ee rounded-se"
                              >
                                SIGN UP
                              </button>
                            </div>
                            <p>We hate spam as much as you do</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`col-lg-12 ${newsTab.desktopView} mt-10 bg-gray-300 flex justify-center`}
              >
                Advertisement
              </div>
              <div className="col-lg-9 mt-12">
                <Grid container lg={12}>
                {bloglist2 &&
                    bloglist2.map((ele,index) => {
                      const timeDifference = Date.now() - new Date(ele.createdAt);
              const minutesDifference = Math.floor(timeDifference / 1000 / 60);
              const hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);

              const convertDays=Math.floor(hoursDifference / 7)
                      return (
                        <Link href={`${ele.category}/${ele.slug}`} style={{width:"100%"}} key={index}>
              <Card
                sx={{
                  // display: "flex",
                  marginTop: "10px",
                  // height: "250px",
                  // width:"100%",
                  // backgroundColor:"yellow"
                  
                }}
              >
                <Grid container lg={12}>
                  <Grid
                    className={`${newsTab.categorybanner1} rounded `}
                    item
                    lg={3}
                    sm={3}
                    sx={{
                      placeItems: "center",
                      display: "grid",
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    <h5 className={`${newsTab.categorybanner1} font-bold p-2`}>
                      {ele.heading}
                    </h5>
                    <img
                      style={{
                        // display: "block",
                        height: "250px",
                        width: "100%",

                        // objectFit: "cover",
                        // borderRadius: "5%",
                      }}
                      src={`${imagePath}/${ele.banner}`}
                    />
                  </Grid>
                  <Grid item lg={8.5} sm={7} className="p-4">
                    <h5 className={`${newsTab.category2banner} font-bold`}>
                      {ele.heading}
                    </h5>
                    <div style={{height:"120px"}}>
                      {ele.metadata?.description.slice(0, 250)}
                    </div>
                    <div
                      style={{
                        // alignSelf: "end",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <span style={{color:"red"}}>Read more..</span>
                      <span><AccessTimeIcon /> 
                      {minutesDifference<=60?`${minutesDifference} Minutes`:minutesDifference>60?`${hoursDifference} hrs`:hoursDifference>24?`${convertDays} days`:""} 
                      Ago</span>
                      {" "}
                    </div>
                  </Grid>
                  <Grid
                    className={`${newsTab.category2banner} rounded shadow hover:shadow-lg focus:shadow-outline active:shadow-inner`}
                    item
                    lg={3.5}
                    sm={5}
                    sx={{ placeItems: "center", display: "grid" }}
                  >
                    <img
                      style={{
                        // display: "block",
                        height: "100%",
                        width: "100%",

                        // objectFit: "cover",
                        // borderRadius: "5%",
                      }}
                      src={`${imagePath}/${ele.banner}`}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Link>
                      );
                    })}
                </Grid>
              </div>
              <div className="col-lg-3 mt-10 col-md-12">
                <div className="post_gallery_sidebar mt-40">
                  {/* <NewsLetter /> */}
                  {/* <TrendingSingleCarousel /> */}
                  <div
                    style={{
                      height: "35%",
                      width: "80%",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="rounded col-lg-12 bg-gray-300"
                  >
                    Advertisement
                  </div>
                  <div
                    style={{
                      height: "35%",
                      width: "80%",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="rounded col-lg-12 bg-gray-300"
                  >
                    Advertisement
                  </div>
                  <div
                    style={{
                      height: "35%",
                      width: "80%",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="rounded col-lg-12 bg-gray-300"
                  >
                    Advertisement
                  </div>
                  {/* <TrendingNewsWidget /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FooterCopyright />
    </div>
  );
}
