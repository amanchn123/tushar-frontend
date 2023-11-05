"use client";
import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function NewsLetter({ dark }) {
  const [email,setEmail]=useState()
  const submit=async()=>{
    try{
      if(email==undefined || email==null){
        alert("pls enter valid email")
      }else{

        alert("you have successfully subscribed Newsletter")
      }
    }catch(error){
      console.log('error in subscrbing email newsletter in frontend')
    }
  }
  const portsize = useMediaQuery("(max-width: 1000px)");
  return (
    <div className="post_gallery_sidebar mt-40">
      <div
        style={{
          width: "100%",
          padding: "20px",
          backgroundColor: "rgb(251, 225, 195)",
        }}
        className=" w-full mt-30"
      >
        <div className="footer-topba">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-5">
              <div className="footer-logo">
                <h2 className="title mt-20 ml-30" style={{ fontSize: "40px" }}>
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
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="email"
                    className="rounded-full"
                    placeholder="Your email address"
                  />
                  <button onClick={submit} type="button" style={{backgroundColor:"transparent",width:"auto",paddingRight:"10px",paddingBottom:"2px"}}>
                    <SendIcon style={{color:"orange",transform:"rotate(-45deg)",fontSize:"35px"}}/>
                  </button>
                </div>
                <p className="text-dark ml-3">We hate spam as much as you do</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
