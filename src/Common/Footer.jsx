import React, { useEffect } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import logo from "../Assets/images/logoimg.png";
import { FaInstagram } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      {/* <div className="footer">
        <div className="">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-6 col-12">
            <h2>MNC</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </p>
            <div className="position-relative">
              <input
                type="text"
                className="footer-input"
                placeholder="Submit email"
              />
              <MdOutlineMail className="f-input-icon" />
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12">
            <h6 className="f-title">About</h6>
            <h6>About Us</h6>
            <h6>Service</h6>
            <h6>Our Story</h6>
            <h6>Success</h6>
            <h6>Support</h6>
          </div>
          <div className="col-lg-2 col-md-6  col-sm-6 col-12">
            <h6 className="f-title">Service</h6>
            <h6>ProblemPilot</h6>
            <h6>Entrepreneurial Edge</h6>
            <h6>Startegy Trial</h6>
            <h6>Portfolio</h6>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <h6 className="f-title">Get in Touch</h6>
            <div className="d-flex gap-4">
              <MdLocationPin />
              <p>22/1 Lorem ipsum, sshdi india 1348</p>
            </div>
            <div className="d-flex gap-4">
              <MdOutlineMail />
              <p>xuwelkhan@gmail.com</p>
            </div>
            <div className="d-flex gap-4">
              <FaPhoneAlt />
              <p>+91 01679 252595</p>
            </div>
          </div>
        </div>
        <div className="bottom-footer" >
          <div className="f-icons d-flex justify-content-center" >
            <div className="d-flex">
            <h6 style={{fontWeight:"800"}}>Follow Us</h6>
            </div >
            <div className="f-icon-gap">
            <FaFacebookF className="f-icon" style={{color:"#0165E1"}}/>
            <FaTwitter className="f-icon" style={{color:"skyblue"}}/>
            <FaYoutube className="f-icon" style={{color:"red"}}/>
            <FaInstagram className="f-icon" style={{color:"rgb(221, 87, 109)"}}/>
            </div>
          </div>
          <div>
            <p>All rights reserved <b>Multi Networking Company 2024</b></p>
          </div>
        </div>
      </div>
      </div> */}
      <div className="footer">
        <div className="footer-grid">
          <div>
            <img src={logo} className="f-logo" />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </p>
            <div className="position-relative">
              <input
                type="text"
                className="footer-input"
                placeholder="Submit email"
              />
              <MdOutlineMail className="f-input-icon" />
            </div>
          </div>
          <div>
            <h6 className="f-title">About</h6>
            <Link to={"/"}>
              <h6 className="f-subtitle">Home</h6>
            </Link>
            <Link to={"/about"}>
              <h6 className="f-subtitle">About Us</h6>
            </Link>
            <Link to={"/games"}>
              <h6 className="f-subtitle">Games</h6>
            </Link>
            <Link to={"/contactus"}>
              <h6 className="f-subtitle">Contact Us</h6>
            </Link>
          </div>
          <div>
            <h6 className="f-title">Service</h6>
            <h6 className="f-subtitle">ProblemPilot</h6>
            <h6 className="f-subtitle">Entrepreneurial Edge</h6>
            <h6 className="f-subtitle">Startegy Trial</h6>
            <h6 className="f-subtitle">Portfolio</h6>
          </div>
          <div>
            <h6 className="f-title">Get in Touch</h6>
            <div className=" get-in-touch">
              <MdLocationPin className="footer-icon-set" />
              <p>22/1 Lorem ipsum, sshdi india 1348</p>
            </div>
            <div className="get-in-touch">
              <MdOutlineMail className="footer-icon-set"/>
              <p>xuwelkhan@gmail.com</p>
            </div>
            <div className="get-in-touch">
              <FaPhoneAlt className="footer-icon-set"/>
              <p>+91 01679 252595</p>
            </div>
            {/* <div className="icon-group">
              <div>
                <p>
                  <b>Follow Us</b>
                </p>
              </div>

              <div className="socialicons">
                <FaFacebookF style={{ color: "#0165E1" }} />
                <FaTwitter style={{ color: "#1DA1F2" }} />
                <FaYoutube style={{ color: "#FF0000" }} />
                <FaInstagram style={{ color: "#C13584" }} />
              </div>
            </div> */}
          </div>
        </div>

        <div className="text-center sub-footer">
          {/* icons add */}
            
          
          <div className="copyright">
          <div className="icon-group">
             
          <p className="follow-us">
                Follow Us
                </p>
             

              <div className="socialicons">
                <FaFacebookF style={{ color: "#0165E1" }} />
                <FaTwitter style={{ color: "#1DA1F2" }} />
                <FaYoutube style={{ color: "#FF0000" }} />
                <FaInstagram style={{ color: "#C13584" }} />
              </div>
            </div>
            <p className="footer-text">
              All rights reserverd @ <b>Multi networking company</b> 2024 |
              Developed by:
              <a
                className="weblock-link"
                href="https://www.weblockinfosoft.com/"
              >
                {" "}
                WEBLOCK INFOSOFT
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
