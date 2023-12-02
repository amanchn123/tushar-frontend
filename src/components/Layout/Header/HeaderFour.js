"use client";
import React, { useEffect } from "react";
import LogoWithSearch from "./LogoWithSearch";
import NavigationBar from "./NavigationBar";
import { Box, Modal } from "@mui/material";
import Link from "next/link";
// import TopbarThree from './TopbarThree';
// import { useMediaQuery } from '@mui/material';
import { Domain } from "@/components/api/domain";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#fbe1c3",
  border: "2px solid orange",
  boxShadow: 24,
  borderRadius: "2%",
  p: 4,
};

export default function HeaderFour({ action }) {
  const pathname = usePathname();
  // const portJoin = useMediaQuery("(max-width:990px)");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setCookie("epaper_status","disable")
  }

  const epaper_status=getCookie("epaper_status") 
  useEffect(() => {
    const alertTimeout = setTimeout(() => {

      if (pathname == "/E-News" || pathname.startsWith("/adminpanel") || epaper_status=="disable") {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }, 4000); // 10 seconds in milliseconds

    return () => {
      // Clear the timeout when the component unmounts to avoid memory leaks
      clearTimeout(alertTimeout);
    };
  }, []);

  return (
    <header className="header-area header-style-2 header-style-4">
      {/* {portJoin?"":<TopbarThree />} */}
      <LogoWithSearch />

      <div className="header-menubar ">
        <div className="container custom-container ">
          <div className="menubar-b ">
            <div className="row align-items-center position-relative shadow-md mt-2 ">
              <div className="col-lg-10 ocl-sm-3 col-3 ">
                <div className="header-menu newsprk-header-main-menu newsprk-header-main-menu-dark header-menu-style-2 ">
                  <div
                    onClick={(e) => action(e)}
                    className="toggle-btn dark ml-15 pl-15 canvas_open d-lg-none d-block "
                  >
                    <i className="fa fa-bars" style={{ color: "black" }} />
                  </div>
                  <NavigationBar customClass="newspark-dark-menu-items " />
                </div>
              </div>
              <div className="col-lg-2 col-sm-9 col-9 ">
                <div className="header-menu-rightbar">
                  <div className=" inset-0 flex items-center justify-center font-semibold mt-2 ">
                    <p>{Date().slice(0, 15)}</p>
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
                  <div className="-mt-5 flex justify-end -mr-4 cursor-pointer">
                    <CloseIcon onClick={handleClose} />
                  </div>
                  Click Here to Read Todays{" "}
                  <Link
                    href={`${Domain}/E-News`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "20px",
                      // marginRight: "30px",
                      // color: "white",
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
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
