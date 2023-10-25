import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { api } from "../api/api";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function Modals() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageCount, setImageCount] = useState(0);
  let [newsData, setnewsData] = useState({
    pages: [],
    date: null,
    heading: "news",
  });

  let formdata = new FormData();

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

  const imgArr = Array.from({ length: imageCount });
  const submit = async () => {
console.log("date",formdata.get('image'))
    try {
      if (!formdata.get('date') || !formdata.get('image')) {
        alert("pls select all field");
      } else {
        const token = getCookie("AdminDetails")
          ? JSON.parse(getCookie("AdminDetails"))?.token
          : null;
        console.log("forma", formdata);
        const response = await axios.post(`${api}/new-enews`, formdata, {
          headers: {
            authorization: token.toString(),
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data == "not allowed") {
          alert("your are not allowed Pls login Again");
        } else if (response.data.date && response.data.content) {
          let paperdate = JSON.stringify(response?.data?.date);
          alert(`${paperdate.slice(0, 11)} E-Paper Uploaded successfully`);
        } else {
          alert("unsuccessfull pls try again");
        }
      }

    } catch (error) {
      console.log("error in submiting E-newspaper in frontend", error);
    }
  };

  return (
    <>
      <button
        className="bg-orange-400 m-5 p-3 rounded-lg shadow"
        onClick={handleOpen}
      >
        Upload E-News
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                No of pages
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
                onChange={(e) => setImageCount(e.target.value)}
              >
                <MenuItem></MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
              </Select>
            </FormControl>
            <input
              type="date"
              onChange={(e) => formdata.append("date", e.target.value)}
              className="mt-10"
            ></input>
            <button
              className="rounded-xl bg-orange-400 w-32 h-8 mt-10 text-white"
              onClick={submit}
            >
              Submit
            </button>
          </div>
          <div className="grid">
            {imgArr &&
              imgArr.map((ele, indx) => (
                <input
                  required
                  className="mt-4"
                  placeholder="image 1"
                  onChange={(e) => {
                    // let updated=[...newsData.pages]
                    // updated[indx]=e.target.files[0]

                    // setnewsData({...newsData,pages:updated})
                    formdata.append("image", e.target.files[0]);
                  }}
                  type="file"
                  accept="image/*"
                ></input>
              ))}
          </div>
        </Box>
      </Modal>
    </>
  );
}
