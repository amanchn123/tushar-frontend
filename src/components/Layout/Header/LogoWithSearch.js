import Link from "next/link";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Checkbox } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../app/firebase.config";
import OtpInput from "react-otp-input";
import styless from "../../../styles/newsTab.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function LogoWithSearch() {
  const [number, setNumber] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [slideno, setSlideno] = useState(0);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [users, setUsers] = useState(null);
  const [otp, setOtp] = useState();
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [disablebtn, setDisablebtn] = useState(false);
  const [errorr, setErrorr] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (slideno == 1) {
      const timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1); // Decrement the countdown value
          setDisablebtn(true);
        } else if (countdown == 0) {
          setDisablebtn(false);
        }
      }, 1000); // Update the countdown every 1 second (1000 milliseconds)

      return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }
  }, [countdown]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const getOtp = async () => {
    try {
      if (number.length>12) {
        const recaptchaVerifier = await new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {}
        );

        console.log("recaptchaVerifier", recaptchaVerifier);
        console.log("number.length",number.length)


        try{
          const confirmation = await signInWithPhoneNumber(
            auth,
            number,
            recaptchaVerifier
          );
  
            await setUsers(confirmation);
            console.log("confirmation", confirmation);
            // console.log("confirmation",confirmation)
            setSlideno(slideno + 1);
            // console.log("response", confirmation);
        }catch(error){
          console.log("error",error)
          setErrorr(error)
        }

      }
    } catch (error) {
      setErrorr(error);
      console.log("error in getting otp", error);
    }
  };

  const verifyOtp = async () => {
    setInvalidOtp(false);
    if (errorr == null) {
      try {
        const verify = await users.confirm(otp);
        console.log("verify", verify);
        setOpen(false)
        setSlideno(slideno+1)
      } catch (error) {
        setInvalidOtp(true);
        console.log("error in verifying otp", error);
      }
    }
  };

  const resendOtp=async()=>{
    try{
      if (number.length>12) {
        const recaptchaVerifier = await new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {}
        );

        console.log("recaptchaVerifier", recaptchaVerifier);
        console.log("number.length",number.length)


        try{
          const confirmation = await signInWithPhoneNumber(
            auth,
            number,
            recaptchaVerifier
          );
  
            await setUsers(confirmation);
            console.log("confirmation", confirmation);
            // console.log("confirmation",confirmation)
            // console.log("response", confirmation);
        }catch(error){
          console.log("error",error)
          setErrorr(error)
        }

      }
    }catch(error){
      console.log("error in sending otp")
    }
  }

  const verifSlide = [
    <>
      <div className="logo grid justify-center">
        <Link href="/">
          <img src="/images/logo/logo-black.png" alt="Logo" />
        </Link>
        <Image
            content="center"
            height={200}
            width={200}
            alt="otp"
            src="/images/otp.jpg"
          />

      </div>

      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <PhoneInput
          placeholder="Enter phone number"
          defaultCountry="IN"
          value={number}
          // limitMaxLength={8}
          onChange={setNumber}
          className="rounded-lg"
          style={{ border: "2px solid orange", height: "40px", padding: "5px" }}
        />

        {/* {console.log("firebse errorrrr", errorr ? errorr : "")} */}
        {number ? (
          ""
        ) : (
          <div className="text-red-500 flex justify-end">
            Pls Provide a valid Phone No
          </div>
        )}
        {errorr ? JSON.stringify(errorr.code) : ""}
        <div className="flex items-center mt-4" style={{ padding: "0%" }}>
          <Checkbox
            {...label}
            defaultChecked
            className="rounded-full p-0"
            style={{ color: "orange" }}
          />
          <span>
            Get Updates on WhatsApp{" "}
            <WhatsAppIcon fontSize="small" style={{ color: "green" }} />
          </span>
        </div>
        <div className="flext text-center text-gray-400 mt-4">
          I agreee to the terms and condition
        </div>
        <div id="recaptcha-container"></div>
        <div className="grid items-center justify-center mt-2">
          <button
            className="rounded-2xl bg-orange-400 w-52 h-10 text-white font-semibold"
            onClick={getOtp}
          >
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
        <label
          htmlFor="otp"
          className="font-bold text-xl text-white text-center"
        >
          Enter your OTP
        </label>
        <div className="flex justify-center">
          <OtpInput
            className={styless.optcontainer}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType="tel"
            // renderSeparator={<span>-</span>}
            renderInput={(props, index) => (
              <input
                {...props}
                style={{ border: "2px solid orange" }}
                className={`m-2 text-xl text-center rounded-lg h-10 w-10 ${
                  index === 0 ? "" : ""
                }`}
              />
            )}
          ></OtpInput>
        </div>
        {invalidOtp ? (
          <div className="text-red-500 flex justify-end">Invalid Otp</div>
        ) : (
          ""
        )}
        <div className="justify-center grid">
          <Image
            content="center"
            height={200}
            width={200}
            alt="otp"
            src="/images/otp.jpg"
          />

          <span>
            <button
              disabled={disablebtn}
              className={`rounded-lg text-white px-1 ${disablebtn?"bg-orange-100":"bg-orange-400"} `}
            >
              resend
            </button>{" "}
            otp in {countdown} sec
          </span>
        </div>
        <div id="recaptcha-container"></div>

        <div className="flext text-center mt-4">
          I agreee to the terms and condition
        </div>
        <div className="grid items-center justify-center mt-2">
          <button
            onClick={verifyOtp}
            className="rounded-2xl bg-orange-400 w-52 h-10 text-white font-semibold"
          >
            Verify
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
                <Image  height={100} width={200} src="/images/logo/logo-black.png" alt="Logo" />
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
        <Box sx={style}>{verifSlide[slideno]}</Box>
      </Modal>
    </div>
  );
}
