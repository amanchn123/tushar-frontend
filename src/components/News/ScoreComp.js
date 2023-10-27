"use client";
import axios from "axios";
import React, { useState } from "react";

export default function ScoreComp() {
  const [cricMatch, setCricMatch] = useState();
  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
    headers: {
      'X-RapidAPI-Key': '2552b4ce0dmshe670dcf5e6029ddp1d0145jsna59dac20b650',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  
  const getscore=async()=>{
    try {
      const response = await axios.request(options);
      console.log("scoreeee",response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const toss =cricMatch!==null?cricMatch?.status?.split(" "):null;
  console.log("toss",toss);
  return (
    <div className="h-full">
      <div
        className="post-newsletter post-newsletter-3-style mt-30 "
        style={{ backgroundColor: "#FBE1C3", height: "30%" }}
      >
        <div className="flex justify-between">
          <img
            style={{ height: "30px", width: "40px" }}
            src={`${cricMatch?.teamInfo[0]?.img}`}
          />
          <h1
            style={{
              fontSize: "16px",
              textAlign: "center",
              marginTop: "6px",
              fontWeight: "revert",
            }}
          >
            V/S
          </h1>
          <img
            class="img "
            style={{ height: "30px", width: "40px" }}
            src={`${cricMatch?.teamInfo[1]?.img}`}
          />
        </div>
        <div className="flex justify-between">
          <h1 style={{ fontSize: "16px", fontWeight: "bold" }}>
            {cricMatch?.teamInfo[0]?.name}
          </h1>
          <h5 style={{ fontSize: "14px", textAlign: "center" }}>
            {cricMatch?.status}
          </h5>
          <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
            {cricMatch?.teamInfo[1]?.name}
          </h3>
        </div>
        {/* <div className="flex justify-between">
          <h1 style={{ fontSize: "16px", fontWeight: "bold" }}>
            {cricMatch?.teamInfo[0]===toss?toss[0]:"" && toss?toss[3]:""=="Bowl"?cricMatch.score[1]?.r:0-0}
            {cricMatch?.teamInfo[0]===toss?toss[0]:"" && toss?toss[3]:""=="Bat"?cricMatch.score[0]?.r:"unavailable"}
          </h1>
          <h5 style={{ fontSize: "14px", textAlign: "center" }}>
            score
          </h5>
          <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
          {cricMatch?.teamInfo[1]===toss?toss[0]:"" && toss?toss[3]:""=="Bowl"?cricMatch.score[1]?.r:0-0}
          {cricMatch?.teamInfo[1]===toss?toss[0]:"" && toss?toss[3]:""=="Bat"?cricMatch.score[0]?.r:"unavailable"}
          </h3>
        </div> */}
        <button onClick={getscore}>get score</button>
      </div>
      <div
        className="post-newsletter post-newsletter-3-style mt-10 "
        style={{ backgroundColor: "#FBE1C3", height: "63%", padding: "0px" }}
      >
        <h1
          className="title rounded-tr rounded-tl"
          style={{
            backgroundColor: "orange",
            fontSize: "20px",
            textAlign: "center",
            color: "white",
          }}
        >
          Sponsered
        </h1>
        <div style={{ height: "100%" }}>.</div>
      </div>
          
    </div>
  );
}