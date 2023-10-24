"use client";
import axios from "axios";
import React, { useState } from "react";

export default function ScoreComp() {
  const [cricMatch, setCricMatch] = useState();
  const getScorecard = async () => {
    let apikey = "6c9e2cfa-84ed-4fd5-b43d-ac6f3c853e46";
    try {
      const result = await axios.post(
        `https://api.cricapi.com/v1/currentMatches?apikey=${apikey}&offset=0`,
        {
          apikey: apikey,
          offset: 0,
        }
      );
      const matches = await result?.data?.data;
      const match =
        (await matches) &&
        matches.filter(
          (res) =>
            res.matchStarted == true &&
            res.matchEnded == false &&
            !res.name.includes("Warm-up game") &&
            !res.status.includes("No result")
        );

      // const neww =
      //   (await match) &&
      //   match.find((ele) => ele.teams.includes(["Netherlands,New Zealands,Hyderabad,Jammu and Kashmir"]));
      // console.log(match, "match", neww);
      console.log("matcccc",matches)

      const preferredCountries = [
        "India",
        "Australia",
        "England",
        "New Zealand",
        "South Africa",
        "Sri Lanka",
        "Pakistan",
        "Bangladesh",
        "West Indies",
        "Afghanistan",
        "Netherlands",
        "Hong Kong",
        "Madhya Pradesh",
        "Bihar",
        "Hyderabad",
        "Goa",
        "Delhi"
      ];

      let firstMatch = null;

      for (const country of preferredCountries) {
        const matchingMatch = match.find((matchs) =>
          matchs.teams.includes(country)
        );
        if (matchingMatch) {
          firstMatch = matchingMatch;
          break; // Stop searching once a match is found
        }
      }

      console.log("firstMatch", firstMatch);
      setCricMatch(firstMatch);

      console.log("match", match);

      // const final = await axios.post(
      //   `https://api.cricapi.com/v1/match_scorecard?apikey=${apikey}&id=${firstMatch.id}`,
      //   {
      //     apikey: apikey,
      //     id: firstMatch.id,
      //   }
      // );
      //  setScore(match)
      // console.log("final", final);
    } catch (error) {
      console.log(error);
    }
  };
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
        {/* <button onClick={getScorecard}>get score</button> */}
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