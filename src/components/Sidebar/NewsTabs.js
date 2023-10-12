'use client'


import React, { useEffect, useState } from 'react'
import newsTab from  '../../styles/newsTab.module.css'
import axios from 'axios';

// async function getScore(){
//  try{
//   const result=await axios.post("https://api.cricapi.com/v1/currentMatches?apikey=0ddf3585-3fc4-43da-a7d3-3b31487e30c0&offset=0",{
//     "apikey": "0ddf3585-3fc4-43da-a7d3-3b31487e30c0",
//     "offset": 0
//   })
//   return result.data
//  }catch(error){
//   return "something is wrong"
//  }
// }

export default function NewsTabs() {
  const[score,setScore]=useState(null)
  
  const getScorecard=async()=>{
    let apikey="6c9e2cfa-84ed-4fd5-b43d-ac6f3c853e46"
     try{
  const result=await axios.post
  (`https://api.cricapi.com/v1/currentMatches?apikey=${apikey}&offset=0`,{
    "apikey":apikey,
    "offset": 0
  })
 const matches= await result?.data?.data
 const match=await matches&&matches.filter((res)=>res.matchStarted==true && res.matchEnded==false && !res.name.includes("Warm-up game") && !res.status.includes("No result") )
 console.log("matchesss",matches,match)
 const neww=await match&&match.find((ele)=>ele.teams.includes(["Netherlands,New Zealands"]))
 console.log(match,'match',neww)
 const final=await axios.post(`https://api.cricapi.com/v1/match_scorecard?apikey=${apikey}&id=${match[0].id}`,{
  "apikey": apikey,
  "id": `${match[0].id}`
 })
//  setScore(match) 
console.log("final",final)
 }catch(error){
  console.log(error)
 }
  }

  return (
<>
<div className="post-newsletter post-newsletter-3-style mt-30" style={{height:"30%"}}>
    <div>

    </div>
    <p>
      Your email address will not be this published. Required fields are News
      Today.
    </p>
  </div>


    <div className="post-newsletter post-newsletter-3-style mt-10 " style={{height:"63%"}}>
    <h3 className="title">Newsletter</h3>
    <p>
      Your email address will not be this published. Required fields are News
      Today.
    </p>
    <button onClick={getScorecard}>getscore</button>
    <form action="#">
      <div className="input-box">
        <input type="text" placeholder="Your email address" />
        <button type="button">SIGN UP</button>
      </div>
    </form> 
  </div></>

  )
}
