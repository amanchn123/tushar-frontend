"use client";
import Link from "next/link";
import QuesTable from '@/components/Tables/quesTable'
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
import BreadCrumb from "@/components/Others/BreadCrumb";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import axios from "axios";
import { api } from "@/components/api/api";
import { getCookie } from "cookies-next";


const TablesPage = () => {





  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    display: "flex",
    bgcolor: "background.paper",
    border: "2px solid orange",
    boxShadow: 24,
    borderRadius: "2%",
    p: 4,
  };
  return (
    <>
      <div className="home-1-bg">
        <DrawerHeader />

        <div className="post__gallery__area">
          <div className="container grid pt-8">
            <h3 className="title">
              <i>Admin Panel</i>
            </h3>
            {/* <div className=" h-auto  flex shadow">
              <div className="grid">
              <Link
                className="bg-orange-400 m-5 p-3 rounded-lg shadow"
                href="/adminpanel/AdminpostUpload"
              >
                Create New Post
              </Link>
              <Modals />
              </div>
              <div className="grid">
              <Link
                className="bg-orange-400 m-5 p-3 rounded-lg shadow"
                href="/"
              >
                Manage User Question{" "}
              </Link>
              <button
                className="bg-orange-400 m-5 p-3 rounded-lg shadow"
                onClick={handleOpen}
              >
                Upload videos in News Bites{" "}
              </button>
              </div>
            </div> */}
            <div className="grid">
              <QuesTable />
            </div>
          </div>
        
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TablesPage;
