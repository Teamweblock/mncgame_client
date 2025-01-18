import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import img16 from "../Assets/images/img16.png";
import { useState, useEffect } from "react";
import { ConnectMessage } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Contact = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await ConnectMessage(JSON.stringify(formData));
      console.log("responce", responce);

      if (responce === true) {
        toast.success(
          responce?.message || "Message received and saved successfully!"
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 2 - clientX) / 20;
    const y = (window.innerHeight / 2 - clientY) / 20;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center" }} className="home-container-3  mb-12">
        <h6 className="contact-text mt-5 group relative w-max ">
          CONTACT US
          <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#a90bd4]  group-hover:w-full"></span>
        </h6>
        <h1 className=" text-5xl font-bold max-md:text-3xl my-4 max-md:w-[90%] mx-auto">
          Stay Connected with us
        </h1>
      </div>
      <img
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        src={img16}
        className="absolute-img2 parallax-layer sm:block hidden"
      />
      {/* <div className="contact-grid ">
     
        <div className="row mt-4">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 text-center">
            <div>
            <h3 className="mb-3 ">Write us a message</h3>
            <div className="form">
              <input
                className="form-input"
                type="text"
                placeholder="Your name"
              />
              <input
                className="form-input"
                type="text"
                placeholder="Your email"
              />
              <input className="form-input" type="text" placeholder="Subject" />

              <input
                style={{ paddingBottom: "100px" }}
                className="form-input"
                type="text"
                placeholder="Start writing message here"
              />
            <div className="d-flex">
                <button className="start-btn">Get Started</button>
              </div>
           </div>
             
            </div>
 
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 d-flex">
            <div className="details">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                the industry's standard  
                </p>
                <div className="d-flex gap-3 mt-3" >
                  <div>
                 <img src={icon1} className="contact-icon"/>
                  </div>
                  <div>
                    <h6 style={{fontWeight:"700"}}>Phone</h6>
                    <p>0123-4567-8910</p>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3" >
                  <div>
                  <img src={icon2} className="contact-icon"/>
                  </div>
                  <div>
                    <h6 style={{fontWeight:"700"}}>Email</h6>
                    <p>hello@rainydesign.com</p>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3" >
                  <div>
                  <img src={icon3} className="contact-icon"/>
                  </div>
                  <div>
                    <h6 style={{fontWeight:"700"}}>Address</h6>
                    <p>Lorem ipsum , snfgri<br/> mumbai india</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="">
        <div className="contact-main">
          <div className="contact-part1">
            <div className="text-2xl py-2 font-semibold ">
              Write us a message
            </div>
            {/* <div className="form text-gray-400 font-medium">
              <input
                className="form-input"
                type="text"
                placeholder="Your name"
              />
              <input
                className="form-input"
                type="text"
                placeholder="Your email"
              />
              <input className="form-input" type="text" placeholder="Subject" />

              <input
                style={{ paddingBottom: "100px" }}
                className="form-input"
                type="text"
                placeholder="Start writing message here"
              />
              <div className="d-flex">
                <button className="start-btn transition ease-in-out delay-150 bg-[#C04AE1] hover:-translate-y-1 hover:scale-110 hover:bg-[#C04AE1] duration-300">Get Started</button>
              </div>
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="form text-gray-400 font-medium">
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="subject"
                  value={formData?.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                />
                <input
                  style={{ paddingBottom: "100px" }}
                  className="form-input"
                  type="text"
                  name="message"
                  value={formData?.message}
                  onChange={handleChange}
                  placeholder="Start writing message here"
                  required
                />
                <div className="d-flex">
                  <button
                    type="submit"
                    className="start-btn transition ease-in-out delay-150 bg-[#C04AE1] hover:-translate-y-1 hover:scale-110 hover:bg-[#C04AE1] duration-300"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="contact-part2">
            <div className="details">
              <p>
                We'd love to hear from you! Whether you have a question, need
                support, or just want to share your feedback, our team is here
                to help. Reach out to us through the form below, and we'll get
                back to you as soon as possible. For immediate assistance, you
                can also call our customer service hotline or connect with us on
                social media. Your thoughts and inquiries are important to us,
                and we strive to provide the best possible experience for our
                users.
              </p>
              <div className="d-flex gap-3 mt-3">
                <div className="f-icon1">
                  {/* <img src={icon3} className="contact-icon"/> */}
                  <FaPhoneAlt />
                </div>
                <div>
                  <h6 style={{ fontWeight: "700" }}>Phone</h6>
                  <p>+91 98335 74462</p>
                </div>
              </div>
              <div className="d-flex gap-3 mt-3">
                <div className="f-icon2">
                  {/* <img src={icon2} className="contact-icon"/> */}
                  <MdEmail />
                </div>
                <div>
                  <h6 style={{ fontWeight: "700" }}>Email</h6>
                  <p>multinetworkingcompany@gmail.com</p>
                </div>
              </div>
              <div className="d-flex gap-3 mt-3">
                <div className="f-icon3">
                  {/* <img src={icon2} className="contact-icon"/> */}
                  <FaLocationDot />
                </div>
                <div>
                  <h6 style={{ fontWeight: "700" }}>Address</h6>
                  <p>Mumbai, India</p>
                </div>
              </div>
              {/* <div className="d-flex gap-3 mt-3" >
                <div className="f-icon3">
                  <FaLocationDot />
                </div>
                <div>
                  <h6 style={{ fontWeight: "700" }}>Address</h6>
                  <p>Lorem ipsum , snfgri<br /> mumbai india</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* <img  style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}  src={img17} className="absolute-img3 parallax-layer"/> */}
      </div>
    </div>
  );
};

export default Contact;
