
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
import { Checkbox, Dialog, DialogActions, DialogTitle } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../app/firebase.config";
import OtpInput from "react-otp-input";
import styless from "../../../styles/newsTab.module.css";
import Image from "next/image";

import { useMediaQuery } from "@mui/material";
import { getCookie, deleteCookie, hasCookie, setCookie } from "cookies-next";
import LogoutIcon from "@mui/icons-material/Logout";
import { Domain } from "@/components/api/domain";
import { api } from "@/components/api/api";
import axios from "axios";
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
  const handleOpen = () => {
    setOpen(true)};

  const handleClose = () => {
    setOpenAlert(true)
  }
  



  const [slideno, setSlideno] = useState(0);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [users, setUsers] = useState(null);
  const [otp, setOtp] = useState();
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [disablebtn, setDisablebtn] = useState(false);
  const [errorr, setErrorr] = useState(null);
  const [usertoken, setUsertoken] = useState(false);
  const [loginDetails,setLoginDetails]=useState({
    email:"",
    password:""
  })

  const portsize = useMediaQuery("(max-width:769px)");
  const portJoin = useMediaQuery("(max-width:990px)");
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [searchlist,setsearchlist]=useState([])
  const[openAlert,setOpenAlert]=useState(false)

  const handlecloseAll=async()=>{
    setOpenAlert(false)
    setOpen(false)
    setSlideno(0) 
  };

  const handleCloseAlert=()=>{
    setOpenAlert(false)
  }
  

  const [userdata, setUserdata] = useState({
    name: "",
    password: "",
    email: "",
    gender: "",
  });

  const handleSubmit = async() => {
 try{
  const response=await axios.post(`${api}/userRegister`,{
    name:userdata.name,
    password:userdata.password,
    email:userdata.email,
    gender:userdata.gender,
    phone:number
  })

  setCookie("UserDetails", response.data, { sameSite: "Strict" });
  alert("You are successfully logged in");
  setSlideno(0)
  setOpen(false);
 }catch(error){
  console.log("error in registrating user",error)
 }
  };

const login=async()=>{
  try{
    if(!loginDetails.email || !loginDetails.password){
    alert("pls fill both fields")
    }else{
      const response=await axios.post(`${api}/userLogin`,{
        email:loginDetails.email,
        password:loginDetails.password
      })
      
      if(response.data.success){
        setCookie("UserDetails", response.data.result, { sameSite: "Strict" }); 
        alert("successfully logged in")
        setOpen(false)
      }else{
        alert("Pls check your crendentials")
      }
      
    }
  }catch(error){
    console.log("error in logging in frontend",error)
  }
}  

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
      if (number.length == 13) {
        setInputDisabled(true);
        const recaptchaVerifier = await new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {}
        );

        // console.log("recaptchaVerifier", recaptchaVerifier);
        // console.log("number.length",number.length)

        try {
          const confirmation = await signInWithPhoneNumber(
            auth,
            number,
            recaptchaVerifier
          )
            .then((confirmationResult) => {
              // console.log("cccccc",confirmation)
              // console.log("confirmation", confirmationResult);
              // console.log("uuuuuuu",users)
              setUsers(confirmationResult);
              alert("otp sent successfully");
              setSlideno(slideno + 1);
            })
            .catch((error) => {
              console.log("errorrrrrr", error);
              alert("error", error);
            });

          // console.log("response", confirmation);
        } catch (error) {
          console.log("error", error);
          setErrorr(error);
        }
      } else {
        alert(`pls eneter ${number.length} valid Phone no`);
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
        // setOpen(false);
        setSlideno(slideno + 1);
      } catch (error) {
        setInvalidOtp(true);
        console.log("error in verifying otp", error);
      }
    }
  };

  const resendOtp = async () => {
    try {
      if (number.length > 12) {
        const recaptchaVerifier = await new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {}
        );

        console.log("recaptchaVerifier", recaptchaVerifier);
        console.log("number.length", number.length);

        try {
          const confirmation = await signInWithPhoneNumber(
            auth,
            number,
            recaptchaVerifier
          );

          await setUsers(confirmation);
          console.log("confirmation", confirmation);
          // console.log("confirmation",confirmation)
          // console.log("response", confirmation);
        } catch (error) {
          console.log("error", error);
          setErrorr(error);
        }
      }
    } catch (error) {
      console.log("error in sending otp");
    }
  };

  const verifSlide = [
    <>
      <div className="logo grid justify-center">
        <Link href="/">
          <img src="/images/logo/logo-black.png" alt="Logo" />
        </Link>
        <div className="flex justify-center">
          <Image
            content="center"
            height={200}
            width={200}
            alt="otp"
            src="/images/otp.jpg"
          />
        </div>
      </div>

      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <PhoneInput
          placeholder="Enter phone number"
          defaultCountry="IN"
          value={number}
          // limitMaxLength={13}
          onChange={setNumber}
          className="rounded-lg"
          disabled={isInputDisabled}
          style={{ border: "2px solid orange", height: "40px", padding: "5px" }}
        />

        {/* {console.log("firebse errorrrr", errorr ? errorr : "")} */}
        {/* {number ? (
          ""
        ) : (
          <div className="text-red-500 flex justify-end">
            Pls Provide a valid Phone No
          </div>
        )} */}
        
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
          <div className="text-blue-400 flex mt-2">
            alreday have an Account? &nbsp;
            <button onClick={()=>setSlideno(3)}>Login</button>
          </div>
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
              className={`rounded-lg text-white px-1 ${
                disablebtn ? "bg-orange-100" : "bg-orange-400"
              } `}
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
          onChange={(e) => setUserdata({ ...userdata, name: e.target.value })}
          placeholder="Name"
        />
        <input
          className="rounded-lg w-full mt-4 p-2"
          style={{ border: "2px solid orange", height: "40px" }}
          type="email"
          onChange={(e) => setUserdata({ ...userdata, email: e.target.value })}
          placeholder="Email"
        />
        <input
          className="rounded-lg w-full mt-4 p-2"
          style={{ border: "2px solid orange", height: "40px" }}
          onChange={(e) =>
            setUserdata({ ...userdata, password: e.target.value })
          }
          type="text"
          placeholder="Create Password"
        />
        <select
          className="rounded-lg w-full mt-4 p-2 bg-transparent"
          style={{ border: "2px solid orange", height: "40px" }}
          onChange={(e) => setUserdata({ ...userdata, gender: e.target.value })}
          type="select"
          placeholder="Gender"
        >
          <option className="bg-transparent" selected>
            Male
          </option>
          <option className="bg-transparent">FeMale</option>
          <option className="bg-transparent">Prefered not to Disclose</option>
        </select>
        <div className="flext text-center mt-4">
          By Joining I agreee to the terms and condition
        </div>
        <div className="grid items-center justify-center mt-2">
          <button
            onClick={handleSubmit}
            className="rounded-2xl bg-orange-400 w-52 h-10 text-white font-semibold"
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

        <input
          className="rounded-lg w-full mt-4 p-2"
          style={{ border: "2px solid orange", height: "40px" }}
          type="email"
          onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
          placeholder="Enter email"
        />
        <input
          className="rounded-lg w-full mt-4 p-2"
          style={{ border: "2px solid orange", height: "40px" }}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
          type="text"
          placeholder="Enter Password"
        />

        <div className="grid items-center justify-center mt-4">
          <button
            onClick={login}
            className="rounded-2xl bg-orange-400 w-32 h-10 text-white font-semibold"
          >
            Login
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

  const router = useRouter();
  // const token = hasCookie("AdminDetails")
  // console.log("tttt",token)
  // const token ="jgbg"
  useEffect(() => {
  
    const Usertokens = hasCookie("UserDetails");
    setUsertoken(Usertokens)
  });

  const logout = () => {
    deleteCookie("UserDetails");
    router.refresh();
  };

  const serach=async(e)=>{
    try{
      const response=await axios.post(`${api}/searchPost`,{naming:e.target.value})
      setsearchlist(response?.data)
      const selectedOption = searchlist.find(
        (ele) => ele.heading === e.target.value
      );
      if (selectedOption) {
        router.push(`${Domain}/${selectedOption.category}/${selectedOption.slug}`);
      }
    }catch(error){
      console.log("error in seraching post in frontend",error)
    }
  }


  return (
    <div className="header-centerbar" style={{ padding: "0%" }}>
      <div className="container custom-container">
        <div className="row align-items-center bg-orange-400 pt-1 pb-1">
          <div className="col-lg-3 col-md-5  flex justify-between logo p-0">
            {/* <div className=" bg-green-200"> */}
            {portJoin ? (
              <Link href="/">
                <Image
                  height={200}
                  width={200}
                  src="/images/logo/logo-black.png"
                  alt="Logo"
                />
              </Link>
            ) : (
              <Link href="/">
                <Image
                  style={{ width: "300px" }}
                  height={200}
                  width={200}
                  src="/images/logo/logo-black.png"
                  alt="Logo"
                />
              </Link>
            )}
            {/* </div> */}
            {/* {portsize ? (
              <button
                onClick={handleOpen}
                className=" rounded-full bg-orange-400 w-20 h-8 text-sm text-white font-semibold mt-2"
              >
                Join Now
              </button>
            ) : (
              ""
            )} */}
          </div>
          <div className="col-lg-5 col-md-7">
            <div className="header-search  w-full items-center ">
              <div className=" flex items-center mt-2 ">
                {/* <div className=" bg-red-600"> */}
                <span className="absolute left-8 top4 text-gray-400">
                  <SearchIcon />{" "}
                </span>
                <input
                list="serachlist"
                  className="rounded-full px-10"
                  style={{
                    border: "2px solid orange",
                    height: portsize ? "40px" : "50px",
                    width: portsize ? "100%" : "100%",
                  }}
                  type="text"
                  placeholder="Search..."
                  onChange={serach}
                />
                <datalist id="serachlist" className="bg-red-300 rounded" >
                 {searchlist && searchlist.map((ele,idx)=><option  key={idx} value={ele?.heading}>{ele?.heading}</option>)}
                </datalist>

                {/* </div> */}
                &nbsp;
                {portJoin ? (
                  <div className=" flex items-center">
                    <NotificationsSharpIcon
                      style={{ cursor: "pointer", fontSize: "30px" }}
                    />
                    {usertoken?<button
                      onClick={handleOpen}
                      className=" rounded-full bg-dark w-24 h-10 text-sm text-white font-semibold  ml-4"
                    >
                      Logout
                    </button>:<button
                      onClick={handleOpen}
                      className=" rounded-full bg-dark w-24 h-10 text-sm text-white font-semibold  ml-4"
                    >
                      Join Now
                    </button>}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4" style={{ padding: "0%" }}>
            <div
              className="header-temperature justify-evenly d-none d-lg-flex "
              style={{ padding: "0%", margin: "0%" }}
            >
              <Link
                href={`${Domain}/E-News`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  // marginRight: "30px",
                  color: "white",
                }}
              >
                <i
                  style={{ fontSize: "30px" }}
                  class="fas fa-newspaper  mr-2"
                ></i>
                <span className="flex items-center text-center">
                  E-<p className="flex text-center mt-3"> Paper</p>
                </span>{" "}
              </Link>
           
              {/* &nbsp;&nbsp;&nbsp; */}
              <NotificationsSharpIcon
                style={{ cursor: "pointer", fontSize: "30px", color: "white" }}
              />{" "}
              {/* &nbsp;&nbsp;&nbsp; */}
              
              {usertoken?<button
                onClick={logout}
                className=" rounded-full w-32 bg-dark h-12 text-white font-semibold mr-1"
              >
                Logout
              </button>:<button
                onClick={handleOpen}
                className=" rounded-full bg-dark w-32  h-12 text-white font-semibold mr-1"
              >
                Join Now
              </button>}
            </div>
          </div>
          {portJoin ? (
            <div className="col-md-6 flex items-center justify-start px-4 pt-4 pb-2">
              <Link
                href={`${Domain}/E-News`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15px",
                  marginRight: "30px",
                  color: "white",
                }}
              >
                <i
                  style={{ fontSize: "25px" }}
                  class="fas fa-newspaper font-bold mr-2"
                ></i>
                E-Paper
              </Link>
              
            </div>
          ) : (
            ""
          )}
        </div>
        
      </div>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseAlert}>Cancel</Button>
          <Button variant="warning" onClick={handlecloseAll}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>

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
