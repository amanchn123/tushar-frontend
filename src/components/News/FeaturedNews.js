"use client";
import { Card, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Link from "next/link";
import newsTab from "../../styles/newsTab.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "next/image";
import { imageurl } from "../api/api";

export default function FeaturedNews() {


  const [postData, setPostData] = useState([]);
  const [time, setTime] = useState([]);
  const [mobileV, setMobileV] = useState();
  useEffect(() => {
    const mediaQueryy = window.matchMedia("(max-width: 768px)");

    setMobileV(mediaQueryy.media);
  });

  const getAllPost = async () => {
    try {
      const response = await axios.post(`${api}/getPost`, {
        subCategory: "Featured News",
      });
      // await ;
      setPostData(response.data.slice(0, 2));
    } catch (error) {
      console.log("error in getting featured news in frontend", error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

  // const PostData= getAllPost()

  const imagePath = imageurl;
  return (
    <Grid container>
      <h4 className="title">
        <b>Featured News</b>
      </h4>

      {postData &&
        postData.map((ele, idx) => {
          const timeDifference = Date.now() - new Date(ele.createdAt);
          const minutesDifference = Math.floor(timeDifference / 1000 / 60);
          const hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);

          const convertDays = Math.floor(hoursDifference / 7);
          const bannelurl = `${imagePath}/${ele.banner}`;
          return (
            <Link
              href={`${ele.category}/${ele.slug}`}
              style={{ width: "100%" }}
              key={idx}
            >
              <Card
                sx={{
                  // display: "flex",
                  marginBottom: "10px",
                  // height: "250px",
                  // width:"100%",
                  // backgroundColor:"yellow"
                }}
              >
                <div className="row">
                  <div
                    className={`${newsTab.categorybanner1}  col-lg-3 container rounded grid justify-center w-full`}
                  >
                    <h5 className={`${newsTab.categorybanner1} font-bold p-2`}>
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
                    <div style={{ height: "120px", padding: "10px" }}>
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
                      <span style={{ color: "orange" }}>Read more..</span>
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
  );
}
