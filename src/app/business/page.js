import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
import NewsTabs from "@/components/Sidebar/NewsTabs";
import axios from "axios";
import Link from "next/link";
import { api } from "@/components/api/api";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import { Card, Grid } from "@mui/material";
import newsTab from "../../styles/newsTab.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BreakingNews from "@/components/News/BreakingNews";
import ScoreComp from "@/components/News/ScoreComp";
import NewsLetter from "@/components/Newsletter/NewsLetter";

export function generateMetadata({ params }) {
  return {
    title: "DLS technology New",
    description:
      "DLS news Business news latest,breaking news about Business",
  };
}

async function getAllPost() {
  try {
    const response = await axios.post(`${api}/getPost`, {
      category: "Entertainment",
    });
    return response.data;
  } catch (error) {
    console.log("error in calling getPost in frontend");
  }
}

export default async function Technology({ params }) {
  let postData = await getAllPost();

  let bloglist1 = (await postData) && postData.slice(0, 3);
  let bloglist2 = (await postData) && postData.slice(3, 5);

  let imagePath = "http://localhost:5000/uploads";

  return (
    <div className="home-1-bg">
      <DrawerHeader />
      <BreakingNews />
      <section className="about-item-area">
        <div className="container px-4">
          <div className="row">
            <div className="col-lg-12"></div>
            <div className="row">
              <div className="col-lg-9 ">
                <Grid container lg={12}>
                  <h4 className="title font-bold">Technology News</h4>

                  {bloglist1 &&
                    bloglist1.map((ele, index) => {
                      const timeDifference =
                        Date.now() - new Date(ele.createdAt);
                      const minutesDifference = Math.floor(
                        timeDifference / 1000 / 60
                      );
                      const hoursDifference = Math.floor(
                        timeDifference / 1000 / 60 / 60
                      );

                      const convertDays = Math.floor(hoursDifference / 7);
                      return (
                        <Link
                          href={`${ele.category}/${ele.slug}`}
                          style={{ width: "100%" }}
                          key={index}
                        >
                          <Card
                            sx={{
                              marginTop: "10px",
                            }}
                          >
                            <div className="row">
                              <div
                                className={`${newsTab.categorybanner1}  col-lg-3 container rounded grid justify-center w-full`}
                              >
                                <h5
                                  className={`${newsTab.categorybanner1} font-bold p-2`}
                                >
                                  {ele.heading}
                                </h5>
                                <img
                                  style={{
                                    display: "block",
                                    height: "250px",
                                    position: "relative",
                                    width: "100%",
                                    padding: "0%",
                                  }}
                                  src={`${imagePath}/${ele.banner}`}
                                />
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-12">
                                <h5
                                  className={`${newsTab.category2banner} hidden md:block font-bold text-center p-3 px-2`}
                                >
                                  {ele.heading}
                                </h5>
                                <div
                                  style={{ height: "120px", padding: "10px" }}
                                >
                                  {ele.metadata?.description.slice(0, 250)}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "20px",
                                    padding: "10px",
                                  }}
                                >
                                  <span style={{ color: "orange" }}>
                                    Read more..
                                  </span>
                                  <span>
                                    <AccessTimeIcon />
                                    {minutesDifference <= 60
                                      ? `${minutesDifference} Minutes`
                                      : minutesDifference > 60
                                      ? `${hoursDifference} hrs`
                                      : hoursDifference > 24
                                      ? `${convertDays} days`
                                      : ""}
                                    Ago
                                  </span>{" "}
                                </div>
                              </div>

                              <div
                                className={`${newsTab.category2banner} col-lg-4 col-md-4 col-sm-12 `}
                                style={{ height: "280px", width: "280px" }}
                              >
                                <img
                                  className=" rounded shadow hover:shadow-lg focus:shadow-outline active:shadow-inner"
                                  style={{
                                    display: "block",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                  src={`${imagePath}/${ele.banner}`}
                                />
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                </Grid>
              </div>
              <div className={`col-lg-3 ${newsTab.mobileView}`}>
                <div
                  className="post_gallery_sidebar"
                  style={{
                    height: "100%",
                    paddingTop: "6%",
                    marginTop: "10px",
                  }}
                >
                  <ScoreComp />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="post_gallery_sidebar mt-40">
                  <NewsLetter />
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
                    bloglist2.map((ele, index) => {
                      const timeDifference =
                        Date.now() - new Date(ele.createdAt);
                      const minutesDifference = Math.floor(
                        timeDifference / 1000 / 60
                      );
                      const hoursDifference = Math.floor(
                        timeDifference / 1000 / 60 / 60
                      );

                      const convertDays = Math.floor(hoursDifference / 7);
                      return (
                        <Link
                          href={`${ele.category}/${ele.slug}`}
                          style={{ width: "100%" }}
                          key={index}
                        >
                          <Card
                            sx={{
                              marginTop: "10px",
                            }}
                          >
                            <div className="row">
                              <div
                                className={`${newsTab.categorybanner1}  col-lg-3 container rounded grid justify-center w-full`}
                              >
                                <h5
                                  className={`${newsTab.categorybanner1} font-bold p-2`}
                                >
                                  {ele.heading}
                                </h5>
                                <img
                                  style={{
                                    display: "block",
                                    height: "250px",
                                    position: "relative",
                                    width: "100%",
                                    padding: "0%",
                                  }}
                                  src={`${imagePath}/${ele.banner}`}
                                />
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-12">
                                <h5
                                  className={`${newsTab.category2banner} hidden md:block font-bold text-center p-3 px-2`}
                                >
                                  {ele.heading}
                                </h5>
                                <div
                                  style={{ height: "120px", padding: "6px" }}
                                >
                                  {ele.metadata?.description.slice(0, 250)}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "20px",
                                    padding: "10px",
                                  }}
                                >
                                  <span style={{ color: "orange" }}>
                                    Read more..
                                  </span>
                                  <span>
                                    <AccessTimeIcon />
                                    {minutesDifference <= 60
                                      ? `${minutesDifference} Minutes`
                                      : minutesDifference > 60
                                      ? `${hoursDifference} hrs`
                                      : hoursDifference > 24
                                      ? `${convertDays} days`
                                      : ""}
                                    Ago
                                  </span>{" "}
                                </div>
                              </div>

                              <div
                                className={`${newsTab.category2banner} col-lg-4 col-md-4 col-sm-12 `}
                                style={{ height: "280px", width: "280px" }}
                              >
                                <img
                                  className=" rounded shadow hover:shadow-lg focus:shadow-outline active:shadow-inner"
                                  style={{
                                    display: "block",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                  src={`${imagePath}/${ele.banner}`}
                                />
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                </Grid>
              </div>
              <div className="col-lg-3 mt-10 col-md-12">
                <div className="post_gallery_sidebar mt-40 h-full">
                  <div
                    style={{
                      height: "30%",
                      width: "80%",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="rounded col-lg-12 bg-gray-300 mb-4"
                  >
                    Advertisement
                  </div>
                  <div
                    style={{
                      height: "25%",
                      width: "80%",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="rounded col-lg-12 bg-gray-300 mt-4"
                  >
                    Advertisement
                  </div>
                  <div
                    style={{
                      height: "30%",
                      width: "80%",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="rounded col-lg-12 bg-gray-300 mt-4"
                  >
                    Advertisement
                  </div>
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
