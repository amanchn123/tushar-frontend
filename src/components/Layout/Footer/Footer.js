import Link from "next/link";
import React from "react";
import CategoryWidget from "./CategoryWidget";

export default function Footer({ dark }) {
  const footerClass = `footer-area ${dark ? "footer-dark" : ""}`;
  const copyrightClass = `footer-copyright ${
    dark ? "footer-copyright-dark" : ""
  }`;

  const footerStyles = { backgroundColor: "#FBE1C3" };
  const copyrightStyles = { backgroundColor: "#FBE1C3", color: "black" };

  return (
    <footer className={footerClass} style={footerStyles}>
      <div className="container">
        <div className="foote">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-5">
              <div className="footer-logo">
                <Link href="/">
                  <img src="images\dlslogo.png" alt="" />
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
                <div className="input-box">
                  <input
                    type="text"
                    className="rounded"
                    placeholder="Your email address"
                  />
                  <button type="button" className="rounded-ee rounded-se">
                    SIGN UP
                  </button>
                </div>

                <p>We hate spam as much as you do</p>
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
