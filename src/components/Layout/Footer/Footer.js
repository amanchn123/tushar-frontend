"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoryWidget from "./CategoryWidget";
import Image from "next/image";
import { deleteCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import SendIcon from "@mui/icons-material/Send";

export default function Footer({ dark }) {
  const [token, setToken] = useState(false);

  const router = useRouter();
  const footerClass = `footer-area ${dark ? "footer-dark" : ""}`;
  const copyrightClass = `footer-copyright ${
    dark ? "footer-copyright-dark" : ""
  }`;

  const footerStyles = { backgroundColor: "#FBE1C3", padding: "0%" };
  const copyrightStyles = { backgroundColor: "#FBE1C3", color: "black" };

  useEffect(() => {
    const tokens = hasCookie("AdminDetails");
    setToken(tokens);
  });

  const logout = () => {
    deleteCookie("AdminDetails");
    router.refresh();
  };
  return (
    <footer className={footerClass} style={footerStyles}>
      <div className="container">
        <div className="foote">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-5">
              <div className="footer-logo">
                <Link href="/" className="p-2">
                  <Image
                    style={{ width: "300px" }}
                    height={200}
                    width={200}
                    src="/images/logo/logo-black.png"
                    alt="Logo"
                  />
                </Link>
                <ul>
                  <li>
                    <a href="#">
                      <i
                        style={{ color: "orange" }}
                        className="fab fa-twitter"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i
                        style={{ color: "orange" }}
                        className="fab fa-facebook-f"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i
                        style={{ color: "orange" }}
                        className="fab fa-youtube"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i
                        style={{ color: "orange" }}
                        className="fab fa-instagram"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-7">
              <div className="footer-newaletter">
                <div className="input-box ">
                  <input
                    type="text"
                    className="rounded-full"
                    placeholder="Your email address"
                  />
                  <button
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      width: "auto",
                      paddingRight: "10px",
                      paddingBottom: "2px",
                    }}
                  >
                    <SendIcon
                      style={{
                        color: "orange",
                        transform: "rotate(-45deg)",
                        fontSize: "35px",
                      }}
                    />
                  </button>
                </div>

                <p className="text-dark">We hate spam as much as you do</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={copyrightClass} style={copyrightStyles}>
        <div className="container" style={footerStyles}>
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-item d-block d-md-flex justify-content-between align-items-center">
                <p className="text-dark">
                  © Copyright 2020, All Rights Reserved
                </p>
                <ul>
                  <li>
                    <Link href="/about" style={{ color: "black" }}>
                      About
                    </Link>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Advertise
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Privacy & Policy
                    </a>
                  </li>
                  <li>
                    <Link href="/contact" style={{ color: "black" }}>
                      Contact Us
                    </Link>
                  </li>

                  <li>
                    {token ? (
                      <button
                        className="font-bold text-dark ml-15"
                        onClick={logout}
                      >
                        Admin Logout
                      </button>
                    ) : (
                      <Link
                        href="/adminpanel"
                        style={{
                          color: "black",
                        }}
                      >
                        Admin Login
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      href="/adminpanel"
                      style={{
                        color: "black",
                      }}
                    >
                      Admin Panel
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
