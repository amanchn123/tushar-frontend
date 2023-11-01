"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BRAND } from "./types/brand";
import Image from "next/image";
import axios from "axios";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { imageurl } from "../api/api";
import Tooltip from "@mui/material/Tooltip";


const QuesTable = () => {

  const portsize = useMediaQuery("(max-width: 1000px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:portsize? 400:500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [search, setSearch] = useState("");

  const [ques,setQues]=useState("")
   const [name,setName]=useState("")
   const [email,setEmail]=useState("")
   const [answer,setAnswer]=useState("")
   const [id,setId]=useState()

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = async(q,e,n,i) => {

    setQues(q)
    setEmail(e)
    setName(n)
    setOpen(true);
    setId(i) 
  };

  const handleClose = () => {
    setAnswer("")
    setOpen(false);
    setOpenAlert(false);
  };

  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    
    setOpenAlert(false);
  };

  const token =
    getCookie("AdminDetails") && JSON.parse(getCookie("AdminDetails"))?.token;

  const getAllQues = async () => {
    try {
      const response = await axios.get(`${api}/getallques`);

      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.log("erro in frontend in getting all post");
    }
  };

  useEffect(() => {
    getAllQues();
  }, []);

  const bannerUrl = imageurl;
  const matches = useMediaQuery("(min-width:800px)");
  const Smallmatches = useMediaQuery("(min-width:600px)");

  const DeletePost = async (id) => {
    try {
      const response = await axios.post(
        `${api}/deletepost`,
        { id },
        {
          headers: {
            authorization: token.toString(),
          },
        }
      );

      if (response.data) {
        alert("post deletd successfully");
        getAllPost();
      }
    } catch (error) {
      console.log("error in deleted post in frontend", error);
    }
  };

  const Answer = async () => {
    try {
      if(answer==undefined || answer==""){
        alert("pls enter answer")
      }else{
        const response = await axios.post(
          `${api}/answerToUserQues`,
          {name,email,question:ques,answer,id},
          {
            headers: {
              authorization: token.toString(),
            },
          }
        );
        if(response.data=="not allowed"){
          alert("your Admin Period is over Pls Login again")
        }else{
          alert(`Successfully Responded to ${name}'s opinion`)
          handleClose()
        }
      }

    } catch (error) {
      console.log("error in aswer to user question in frontend", error);
    }
  };

  return (
    <div className="mt-10 rounded-sm border border-stroke bg-white px-5 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h5 className="title">All Post</h5>
      {/* <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4> */}
      {/* <div>
        <TextField
          id="outlined-textarea"
          label="Serach Blog..."
          placeholder="serach Blog..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, height: 20 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Politics">Politics</MenuItem>
            <MenuItem value="WorldNews">World News</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="technology">technology</MenuItem>
            <MenuItem value="business">business</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Subcategory
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <MenuItem></MenuItem>
            <MenuItem value="Breaking News">Breaking News</MenuItem>
            <MenuItem value="Trending News">Trending News</MenuItem>
            <MenuItem value="Featured News">Featured News</MenuItem>
          </Select>
        </FormControl>
      </div> */}

      <div
        className="flex flex-col"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {matches ? (
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Heading
              </h5>
            </div>
          ) : (
            ""
          )}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div> */}
        </div>

        {Array.isArray(data) && data.length > 0 ? (
          data.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5  ${
                key === data.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {matches ? (
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black ">{brand?.question}...</p>
                </div>
              ) : (
                ""
              )}

              <div className="flex items-center justify-between p-2.5 xl:p-5 font-semibold">
                <Tooltip title="Answer">
                  <button onClick={() => handleOpen(brand?.question,brand?.email,brand?.userName,brand?._id)}>
                    Ans
                  </button>{" "}
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Tooltip title="Delete">
                  <span onClick={() => DeletePost(brand._id)}>
                    <DeleteIcon className="cursor-pointer" />
                  </span>
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <RemoveRedEyeIcon className="cursor-pointer" />
              </div>

              {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black ">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.conversion}%</p>
            </div> */}
            </div>
          ))
        ) : (
          <h5 className="title text-center">There is no User's opinion</h5>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClickOpenAlert}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        User Name: <b>{name}</b> &nbsp; &nbsp; User Email: <b>{email}</b> 
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Opinion: {ques}
          </Typography>
          <textarea
            value={answer}
            rows={6}
            placeholder="Enter the Ans..."
            className="bg-orange-100 w-full p-2 shadow"
            onChange={(e)=>setAnswer(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleClickOpenAlert}
              className="shadow bg-red-400 p-2 h-8 text-white rounded-lg w-20"
            >
              cancel
            </button>
            <button className="shadow bg-orange-400 p-2 h-8 text-white rounded-lg w-24" onClick={Answer}>
              Post
            </button>
          </div>
        </Box>
      </Modal>

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
          <Button variant="warning" onClick={handleClose}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuesTable;
