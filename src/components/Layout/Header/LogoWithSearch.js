import Link from "next/link";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Checkbox } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid orange",
  boxShadow: 24,
  borderRadius: "2%",
  p: 4,
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function LogoWithSearch() {
  const[number,setNumber]=useState("")
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [slideno, setSlideno] = useState(0);
  const verifSlide = [
    <>
        <div className="logo flex justify-center">
      <Link href="/">
        <img src="/images/logo/logo-black.png" alt="Logo" />
      </Link>
    </div>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    <PhoneInput
        placeholder="Enter phone number"
        defaultCountry="IN"
        // value={number}
        onChange={setNumber}
  
        />
      <div className="flex items-center ">
      <Checkbox {...label} defaultChecked className="rounded-full" style={{color:"orange"}}/>
      <span>Get Updates on WhatsApp <WhatsAppIcon fontSize="small" style={{backgroundColor:"green"}}/></span>
      </div>  
      <div className="flext text-center text-gray-400 mt-4">
        I agreee to the terms and condition
      </div>
      <div className="grid items-center justify-center mt-2">
        <button className="rounded-2xl bg-orange-400 w-52 h-10 text-white font-semibold">
          Join Now
        </button>
      </div>
    </Typography>
    </>,
    <>
    <div className="logo flex justify-center">
      <Link href="/">
        <img src="/images/logo/logo-black.png" alt="Logo" />
      </Link>
    </div>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <input
        className="rounded-lg w-full mt-4 p-2"
        style={{ border: "2px solid orange", height: "40px" }}
        type="text"
        placeholder="Name"
      />
      <input
        className="rounded-lg w-full mt-4 p-2"
        style={{ border: "2px solid orange", height: "40px" }}
        type="text"
        placeholder="Email"
      />
      <input
        className="rounded-lg w-full mt-4 p-2"
        style={{ border: "2px solid orange", height: "40px" }}
        type="text"
        placeholder="Password"
      />
      <input
        className="rounded-lg w-full mt-4 p-2"
        style={{ border: "2px solid orange", height: "40px" }}
        type="text"
        placeholder="Gender"
      />
      <div className="flext text-center mt-4">
        I agreee to the terms and condition
      </div>
      <div className="grid items-center justify-center mt-2">
        <button className="rounded-2xl bg-orange-400 w-52 h-10 text-white font-semibold">
          Join Now
        </button>
      </div>
    </Typography>
    </>,
     <>
     <div className="logo flex justify-center">
       <Link href="/">
         <img src="/images/logo/logo-black.png" alt="Logo" />
       </Link>
     </div>
     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
       {/* <input
         className="rounded-lg w-full mt-4 p-2"
         style={{ border: "2px solid orange", height: "40px" }}
         type="text"
         placeholder="Name"
       />
       <input
         className="rounded-lg w-full mt-4 p-2"
         style={{ border: "2px solid orange", height: "40px" }}
         type="text"
         placeholder="Email"
       />
       <input
         className="rounded-lg w-full mt-4 p-2"
         style={{ border: "2px solid orange", height: "40px" }}
         type="text"
         placeholder="Password"
       />
       <input
         className="rounded-lg w-full mt-4 p-2"
         style={{ border: "2px solid orange", height: "40px" }}
         type="text"
         placeholder="Gender"
       /> */}
       <div className="flext text-center mt-4">
         I agreee to the terms and condition
       </div>
       <div className="grid items-center justify-center mt-2">
         <button className="rounded-2xl bg-orange-400 w-52 h-10 text-white font-semibold">
           Join Now
         </button>
       </div>
     </Typography>
     </>,
  ];
  return (
    <div className="header-centerbar">
      <div className="container custom-container">
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-5">
            <div className="logo">
              <Link href="/">
                <img src="/images/logo/logo-black.png" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-7">
            <div className="header-search  w-full">
              <form action="#">
                <div className=" p-2">
                  <span className="absolute left-8 top-4 text-gray-400">
                    <SearchIcon />{" "}
                  </span>
                  <input
                    className="rounded-full px-10"
                    style={{
                      border: "2px solid orange",
                      height: "40px",
                      width: "75%",
                    }}
                    type="text"
                    placeholder="Search..."
                  />

                  {/* <button type="button">Search</button> */}
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className="header-temperature justify-content-end d-none d-lg-flex ">
              <NotificationsSharpIcon style={{ cursor: "pointer" }} />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={handleOpen}
                className=" rounded-full bg-orange-400 w-32 h-10 text-white font-semibold"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {verifSlide[slideno]}
        </Box>
        
      </Modal>
    </div>
  );
}
