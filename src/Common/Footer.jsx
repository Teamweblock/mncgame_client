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
      <div className="footer grid gap-2 md:w-[90%] pt-20">
        <div className=" grid xl:grid-cols-4 lg md:gap-10 md:grid-cols-2 max-xl:grid-cols-3 max-sm:grid-cols-1 ">
          <div className="text-start">
            <div className="max-md:flex justify-center mx-auto">

              <img src={logo} className="f-logo" />
            </div>
            <p className="text-[1.3rem] text-[#bba692]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </p>
            <div className=" relative">
              <input
                type="text"
                className="footer-input text-[1rem] text-[#bba692]"
                placeholder="Submit email"
              />
              <MdOutlineMail className="right-3 top-4 absolute" size={20} />
            </div>
          </div>
          <div className=" ">
            <div className="   text-start text-lg font-normal ">
              <h6 className="f-title">About</h6>


              <Link to={"/"}>
                <h6 className="f-subtitle text-[#bba692]">Home</h6>
              </Link>
              <Link to={"/about"}>
                <h6 className="f-subtitle text-[#bba692]">About Us</h6>
              </Link>
              <Link to={"/games"}>
                <h6 className="f-subtitle text-[#bba692]">Games</h6>
              </Link>
              <Link to={"/contactus"}>
                <h6 className="f-subtitle text-[#bba692]">Contact Us</h6>
              </Link>
            </div>
          </div>
          <div className="">
            <div className=" gap-4  text-start text-lg font-semibold ">
              <h6 className="f-title">Service</h6>


            
              <Link to={"/welcomepagegame1"}>
              <h6 className="f-subtitle text-[#bba692]">ProblemPilot</h6>
              </Link>
              <Link to={"/welcomepagegame2"}>
              <h6 className="f-subtitle text-[#bba692]">Entrepreneurial Edge</h6>
              </Link>
              <Link to={"/welcomepagegame3"}>
              <h6 className="f-subtitle text-[#bba692]">Startegy Trial</h6>
              </Link>
              <Link to={"profile/overview"}>
              <h6 className="f-subtitle text-[#bba692]">Portfolio</h6>
              </Link>
            </div>
          </div>
          <div className="">
            <div className=" gap-4  text-start text-[1.3rem] font-normal">
              <h6 className="f-title">Get in Touch</h6>



              <div className=" flex gap-2 items-center">
                <MdLocationPin className="footer-icon-set" size={25} />
                <p className="text-[#bba692] text-[1.3rem] font-normal">Mumbai, India</p>
              </div>
              <div className="flex gap-1 items-center">
                <MdOutlineMail className="footer-icon-set" size={25} />
                <p className="text-[#bba692] text-[1.3rem] font-normal">multinetworkingcompany@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaPhoneAlt className="footer-icon-set" size={25} />
                <p className="text-[#bba692] text-[1.3rem] font-normal">+91 98335 74462</p>
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
        </div>

        <div className=" mt-10">
          {/* icons add */}


          <div className=" sm:flex justify-between max-sm:flex-col max-sm:text-center max-sm:justify-center ">
            <div className="sm:flex gap-2 grid items-center ">

              <p className="text-[18px] text-nowrap font-semibold max-sm:text-center sm:text-[14px] md:text-[12px] ">
                Follow Us
              </p>


              <div className="flex gap-2 justify-center  items-center mb-3">
                <FaFacebookF style={{ color: "#0165E1" }} size={15} />
                <FaTwitter style={{ color: "#1DA1F2" }} size={15} />
                <FaYoutube style={{ color: "#FF0000" }} size={15} />
                <FaInstagram style={{ color: "#C13584" }} size={15} />
              </div>
            </div>
            <p className="text-gray-400 text-sm font-semibold mt-2">
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
