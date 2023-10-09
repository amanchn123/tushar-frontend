"use client";
import { Card, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Link from "next/link";
import newsTab from "../../styles/newsTab.module.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function NewsGallary() {
  const [postData, setPostData] = useState([]);
  const [time, setTime] = useState([]);

  const getAllPost = async () => {
    const response = await axios.post(`${api}/getPost`, {
      subCategory: "Featured News",
    });
    // await ;
    setPostData(response.data.slice(1, 3));
  };
  useEffect(() => {
    getAllPost();
  }, [time]);

  // const PostData= getAllPost()
  console.log("breee", postData);
  const imagePath = "http://localhost:5000/uploads";
  return (
    <Grid container lg={12}>
      <h4 className="title ">
        <b>Featured News</b>
      </h4>

      {postData &&
        postData.map((ele) => {
          const timeDifference = Date.now() - new Date(ele.createdAt);
              const minutesDifference = Math.floor(timeDifference / 1000 / 60);
              const hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);

              const convertDays=Math.floor(hoursDifference / 7)
          return (
            <Link href={`${ele.category}/${ele.slug}`}>
              <Card
                sx={{
                  // display: "flex",
                  marginTop: "10px",
                  // height: "250px",
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
                  <Grid item lg={9} sm={9} className="p-4">
                    <h5 className={`${newsTab.category2banner} font-bold`}>
                      {ele.heading}
                    </h5>
                    <div style={{}}>
                      {ele.metadata?.description.slice(0, 240)}
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
                      <span><AccessTimeIcon /> {minutesDifference<=60?`${minutesDifference} Minutes`:""}{minutesDifference>60?`${hoursDifference} Hours`:""} Ago</span>{" "}
                    </div>
                  </Grid>
                  <Grid
                    className={`${newsTab.category2banner} rounded`}
                    item
                    lg={3}
                    sm={3}
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
  );
}
