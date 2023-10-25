"use client";
import Link from "next/link";
import TableOne from "@/components/Tables/TableOne";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
import BreadCrumb from "@/components/Others/BreadCrumb";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import axios from "axios";
import { api } from "@/components/api/api";
import { getCookie } from "cookies-next";
import Modals from '../../components/e-newsAdmin/modal'

const TablesPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vid, setVid] = useState();
  const [videoUrl, setVideoUrl] = useState("");

  const handlevid = (e) => {
    const doc = e.target.files[0];
    if (doc.type !== "video/mp4") {
      setVid("");
      alert("pls select only video");
    } else if (doc.size > 42120000) {
      setVid("");
      alert("size should be smaller than 40 MB");
    } else {
      const videoURL = URL.createObjectURL(doc);
      setVideoUrl(videoURL);
    }
    setVid(doc);
  };

  const token = getCookie("AdminDetails")
    ? JSON.parse(getCookie("AdminDetails"))?.token
    : null;

  const SubmitVideo = async () => {
    const formdata = new FormData();

    await formdata.append("shortvideo", vid);
    try {
      const response = await axios.post(`${api}/uploadVideos`, formdata, {
        headers: {
          authorization: token.toString(),
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        alert("Video uploaded successfully");

        setVid("");
      } else {
        alert("unable to upload pls try again");
      }
    } catch (error) {
      console.log("error in uploading videos in frontend", error);
    }
  };

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
            <div className=" h-auto  flex shadow">
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
            </div>
            <div className="grid">
              <TableOne />
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="">
                {vid ? (
                  <div className="grid justify-center">
                    <video
                      className="rounded-2xl bg-orange-100 align-center"
                      // controls={true}
                      style={{ height: "200px" }}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      className="bg-orange-200 h-8 p-2 rounded-xl items-center w-32 pb-2 mt-4"
                      onClick={SubmitVideo}
                    >
                      Upload
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <label>Pls Select the video</label>
                <input
                  onChange={handlevid}
                  type="file"
                  accept="video/*"
                ></input>
              </div>
              {/* {vid? <div>
        <input  onChange={handlevid} type="file" accept="video/*" ></input>
        </div>:""} */}
            </Box>
          </Modal>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TablesPage;
