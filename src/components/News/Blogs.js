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
    const response = await axios.get(`${api}/getallopinion`);
    console.log('open',response)
    setPostData(response.data.slice(0, 5));
  };
  useEffect(() => {
    getAllPost();
  }, [time]);

  // const PostData= getAllPost()

  const imagePath = imageurl;
  return (
<>
      <h4 className="title  font-bold tracking-tighter">
        BLOGS&nbsp; AND&nbsp; DISCUSSION 
      </h4>
      
      {postData &&
        postData.map((ele,idx) => {
          const timeDifference = Date.now() - new Date(ele.createdAt);
          const minutesDifference = Math.floor(timeDifference / 1000 / 60);
          const hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);

          const convertDays = Math.floor(hoursDifference / 7);
          return (

              <Card
              key={idx}
                sx={{
                  // display: "flex",
                  marginBottom: "10px",
                  // height: "250px",
                  // width:"100%",
                  backgroundColor:"#e0e0d2"
                }}
              >
                <Grid container>
                  
                  <Grid item lg={12} sm={12} className="p-4">
                    <h5 className={`font-bold`}>
                      {ele?.question}
                    </h5>
                    <div style={{ height: "auto" }}>
                      
                        {ele?.answer}
                        
                    </div>
                    <div
                      style={{
                        // alignSelf: "end",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                        marginBottom:"0%",
                        // backgroundColor:"yellow",
                        
                      }}
                    > 
                      {/* <div style={{display:mobileV?"grid":"flex"}}>Comment &nbsp;&nbsp;&nbsp; <Link href='/' style={{ color: "red" }}>Read more..</Link></div> */}
                      {/* <span>
                        <AccessTimeIcon />{" "}
                        {minutesDifference <= 60
                          ? `${minutesDifference} Minutes`
                          : ""}
                        {minutesDifference > 60
                          ? `${hoursDifference} Hours`
                          : ""}{" "}
                        Ago
                      </span>{" "} */}
                      <div style={{display:"flex"}}>
                        <span className="flex items-center text-lg font-medium mr-2">{ele?.userName?.charAt(0).toUpperCase() +ele?.userName.slice(1)}</span>
                        <img className="h-16 rounded-full" src="/images/profilepng.png" alt="profile pic"/>
                      </div>
                    </div>
                  </Grid>

                </Grid>
              </Card>
          
          );
        })}
        </>
  );
}
