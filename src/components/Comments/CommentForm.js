'use client'
import React, { useState } from 'react';
import { api } from '../api/api';
import axios from 'axios';


export default function CommentForm() {
  const [quesData,setQuesData]=useState({
    userName:"",
    email:"",
    question:""
  })

  const submit=async(e)=>{
    e.preventDefault()
    
    try{
      if(quesData.email!==undefined && quesData.userName!==undefined && quesData.question!==undefined){
        const response=await axios.post(`${api}/userQues`,{userName:quesData.userName,email:quesData.email,question:quesData.question})
        if(response.data){
          alert("Your opinion has been recorded")
          setQuesData({userName:"",email:"",question:""})
        }
      }else{
        alert("Pls select all fields")
      }
      
    }catch(error){
      console.log("error in posting question from frontend",error)
    }
   
  }
  return (
    <div className="post-form-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title">
              <h3 className="title">Leave an opinion</h3>
            </div>
            <div className="post-form-box">
              <form id='submitt' onSubmit={submit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="input-box">
                      <input required type="text" value={quesData.userName} placeholder="Full name" onChange={(e)=>setQuesData({...quesData,userName:e.target.value})} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="input-box">

                      <input  value={quesData.email} required type="email" placeholder="Email address" onChange={(e)=>setQuesData({...quesData,email:e.target.value})}/>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-box">
                      <textarea
                      value={quesData.question}
                      required
                        name="#"
                        id="#"
                        cols="30"
                        rows="10"
                        placeholder="Tell us about your opinion…"
                        onChange={(e)=>setQuesData({...quesData,question:e.target.value})}
                      ></textarea>
                      <button className="main-btn " type="submit" 
                      style={{backgroundColor:"orange"}} 
                      
                      >
                        POST OPINION
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
