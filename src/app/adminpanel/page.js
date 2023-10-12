"use client";
import { Metadata } from "next";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import TableOne from "@/components/Tables/TableOne";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
import BreadCrumb from "@/components/Others/BreadCrumb";
import axios from "axios";
import { api } from "@/components/api/api";
import { useEffect } from "react";

const TablesPage = () => {

  return (
    <>
      <div className="home-1-bg">
        <DrawerHeader />

        <div className="post__gallery__area">
          <div className="container">
            <div className=" bg-red-400 ">
              <TableOne />
              {/* <TableThree />  */}
            </div>
          </div>
        </div>

        <Footer />
        <FooterCopyright />
      </div>
    </>
  );
};

export default TablesPage;
