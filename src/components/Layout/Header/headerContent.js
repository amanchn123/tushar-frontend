'use client'
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Button from "@mui/material/Button";
import NavigationBar from "./NavigationBar";
import { deleteCookie } from "cookies-next";
import { useRouter } from 'next/navigation'


export default function HeaderContent({className, action, dark}) {
  const[isLoggedin,setIsLoggedin]=useState(false)
  const router=useRouter()
    
  useEffect(()=>{
   const checkAdmin=getCookie("AdminDetails")
   if(checkAdmin!==undefined){
    setIsLoggedin(true)
   } 
  })


 const handleLogout=async()=>{
  await deleteCookie('AdminDetails')
  setIsLoggedin(false)
  router.push('/')
 }
  return (
    <div>
      <div className={`newsprk-header-area ${className || ""}`}>
        <div className="container">
          <div className="header-nav-box">
            <div className="row align-items-center position-relative">
              <div
                onClick={(e) => action(e)}
                className="toggle-btn ml-15 canvas_open d-lg-none d-block"
              >
                <i className="fa fa-bars" />
              </div>
              <div className="col-lg-8">
                <div
                  className={`newsprk-header-main-menu ${
                    dark ? "newsprk-header-main-menu-dark" : ""
                  }`}
                >
                  <NavigationBar />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="header-menu-rightbar">
                  <div className="header-menu-search">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fal fa-search"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fal fa-user-circle"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {isLoggedin ?(
                    <Button variant="contained" className=' border border-2 border-red-500 rounded p-1 bg-orange-400' onClick={handleLogout}>Logout</Button>
                  ): (
                    
                    <Link
                      style={{
                        border: "1px solid grey",
                        
                      }}
                      className="border border-2 border-red-500 rounded p-1 bg-orange-400"
                      href="/auth/Adminlogin"
                      // variant="outlined"
                    >
                      Login as Admin 
                    </Link>
                    
                  ) }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
