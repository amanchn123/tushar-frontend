"use client";
import { Card, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Link from "next/link";
import newsTab from "../../styles/newsTab.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "next/image";

export default function Blogs() {
  const [postData, setPostData] = useState([]);
  const [time, setTime] = useState([]);
  const [mobileV, setMobileV] = useState();
  useEffect(() => {
    const mediaQueryy = window.matchMedia("(max-width: 768px)");

    setMobileV(mediaQueryy.media);
    // console.log('mediaQuery',mobileV)
  });

  const getAllPost = async () => {
    const response = await axios.post(`${api}/getPost`, {
      subCategory: "Featured News",
    });
    // await ;
    setPostData(response.data.slice(1, 4));
  };
  useEffect(() => {
    getAllPost();
  }, [time]);

  // const PostData= getAllPost()

  const imagePath = "http://localhost:5000/uploads";
  return (
<>
      <h4 className="title mt-5 font-bold">
        Blogs and Discussion
      </h4>

      {postData &&
        postData.map((ele,idx) => {
          const timeDifference = Date.now() - new Date(ele.createdAt);
          const minutesDifference = Math.floor(timeDifference / 1000 / 60);
          const hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);

          const convertDays = Math.floor(hoursDifference / 7);
          const bannelurl = `${imagePath}/${ele.banner}`;
          return (

              <Card
              key={idx}
                sx={{
                  // display: "flex",
                  marginBottom: "10px",
                  // height: "250px",
                  // width:"100%",
                //   backgroundColor:"yellow"
                }}
              >
                <Grid container>
                  
                  <Grid item lg={12} sm={12} className="p-4">
                    <h5 className={`font-bold`}>
                      {ele.heading}
                    </h5>
                    <div style={{ height: "80px" }}>
                      
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
                      <div>Comment &nbsp;&nbsp;&nbsp; <Link href='/' style={{ color: "red" }}>Read more..</Link></div>
                      <span>
                        <AccessTimeIcon />{" "}
                        {minutesDifference <= 60
                          ? `${minutesDifference} Minutes`
                          : ""}
                        {minutesDifference > 60
                          ? `${hoursDifference} Hours`
                          : ""}{" "}
                        Ago
                      </span>{" "}
                    </div>
                  </Grid>

                </Grid>
              </Card>
          
          );
        })}
        </>
  );
}
