'use client'
import React from 'react';
import LogoWithSearch from './LogoWithSearch';
import NavigationBar from './NavigationBar';
import TopbarThree from './TopbarThree';


export default function HeaderFour({ action }) {
 
  return (
    <header className="header-area header-style-2 header-style-4">
      <TopbarThree />
      <LogoWithSearch />
      
      <div className="header-menubar">
        <div className="container custom-container">
          <div className="menubar-b ">
            <div className="row align-items-center position-relative shadow-md mt-2">
              
              <div className="col-lg-10 col-sm-3 col-3 ">
                <div className="header-menu newsprk-header-main-menu newsprk-header-main-menu-dark header-menu-style-2 ">
                <div
                onClick={(e) => action(e)}
                className="toggle-btn dark ml-15 pl-15 canvas_open d-lg-none d-block "
              >
                <i className="fa fa-bars" style={{color:"black"}} />
              </div>
                  <NavigationBar customClass="newspark-dark-menu-items " />
                </div>
              </div>
              <div className="col-lg-2 col-sm-9 col-9 " >
                <div className="header-menu-rightbar" >
                  <div className=" inset-0 flex items-center justify-center font-semibold mt-2 " >
                    <p >{Date().slice(0,15)}</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </header>
  );
}
