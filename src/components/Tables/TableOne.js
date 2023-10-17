'use client'
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { BRAND } from "./types/brand";
import Image from "next/image";
import axios from "axios";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "next/link";
import { getCookie } from "cookies-next";


const TableOne = () => {
  const[category,setCategory]=useState("")
  const[subcategory,setSubcategory]=useState("")
  const[search,setSearch]=useState("")
  const [data, setData] = useState([]);
  const[filtereddata,setFiltereddata]=useState([])
  const token =
  getCookie("AdminDetails") && JSON.parse(getCookie("AdminDetails"))?.token;
  const getAllPost = async () => {
    try {
      const response = await axios.get(`${api}/admingetpost`, {
        headers: {
          authorization: token.toString(),
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        setData(response.data);
      }
      console.log("all post", response);
    } catch (error) {
      console.log("erro in frontend in getting all post");
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const bannerUrl = "http://localhost:5000/uploads";
  const matches = useMediaQuery('(min-width:800px)');
  const Smallmatches = useMediaQuery('(min-width:600px)');


  return (
    <div className="mt-10 rounded-sm border border-stroke bg-white px-5 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h5 className="title">All Post</h5>
      {/* <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4> */}
      <div>
      <TextField
            
            id="outlined-textarea"
            label="Serach Blog..."
            placeholder="serach Blog..."
          
            onChange={(e)=>setSearch(e.target.value)}
          />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120,height:20 }}>
          <InputLabel id="demo-simple-select-standard-label">
          Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            onChange={(e)=>setCategory(e.target.value)}
          >
            <MenuItem value="Politics">Politics</MenuItem>
            <MenuItem value="World News">World News</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="technology">technology</MenuItem>
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
            onChange={(e)=>setSubcategory(e.target.value)}
          >
            <MenuItem >
            </MenuItem>
            <MenuItem value="Breaking News">Breaking News</MenuItem>
            <MenuItem value="Trending News">Trending News</MenuItem>
            <MenuItem value="Featured News">Featured News</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex flex-col" style={{display:"flex",justifyContent:"space-between"}}>
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5" style={{display:"flex",justifyContent:"space-between"}}>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Blog
            </h5>
          </div>
           {matches? <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Heading
            </h5>
          </div>:""}
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

        {data!==[]? data.filter((ele)=>ele.heading.toLowerCase().includes(search.toLowerCase()) && ele.category.includes(category) && ele.subCategory.includes(subcategory) ).map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5  ${
              key === data.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
            style={{display:"flex",justifyContent:"space-between"}}
          >
            <div className="flex items-center gap-2 p-1 xl:p-2 " >
              {Smallmatches?<div className="flex-shrink-0">
                <img src={`${bannerUrl}/${brand.banner}`} alt="Brand" width={48} height={48} />
              </div>:""}
              <p className="text-black ">{brand.heading}</p>
            </div>

           {matches?           <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black ">{brand.metadata?.description?.slice(0,100)}...</p>
            </div>:""}

            <div className="flex items-center justify-between p-2.5 xl:p-5">
              <Link href={`adminpanel/${brand._id}`}>
              <EditIcon className="cursor-pointer"/>
              </Link> &nbsp;&nbsp;&nbsp;&nbsp;
              <DeleteIcon className="cursor-pointer"  />&nbsp;&nbsp;&nbsp;&nbsp;
              <RemoveRedEyeIcon className="cursor-pointer"/>
            </div>

            {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black ">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.conversion}%</p>
            </div> */}
          </div>
        )):""}
      </div>
    </div>
  );
};

export default TableOne;
