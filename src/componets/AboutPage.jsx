import React, { useState, useEffect } from "react";
import "../Assets/CSS/AboutPage.css";
import img1 from "../Assets/Aboutimages/img1.png";
import img2 from "../Assets/Aboutimages/img2.png";
import img3 from "../Assets/Aboutimages/img3.png";
import img4 from "../Assets/Aboutimages/img4.png";
import img5 from "../Assets/Aboutimages/img5.png";
import img6 from "../Assets/Aboutimages/img6.png";
import img7 from "../Assets/Aboutimages/img7.png";
import img8 from "../Assets/Aboutimages/img8.png";
import img9 from "../Assets/Aboutimages/img9.png";
import img10 from "../Assets/Aboutimages/img10.png";
import img11 from "../Assets/Aboutimages/img11.png";
import img12 from "../Assets/Aboutimages/img12.png";
import logo from "../Assets/images/logoimg.png";
import Contact from "../Auth/Contact";
import aicon from "../Assets/images/aicon1.png";
import image1 from "../Assets/icon/img2.png";
import img23 from "../Assets/icon/23.png";

const AboutPage = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", animateOnScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", animateOnScroll); // Clean up the listener
    };
  }, []);

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to add the 'visible' class
  function animateOnScroll() {
    const textElements = document.querySelectorAll('.text-animated');

    textElements.forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible'); // Optional: remove class if out of view
      }
    });
  }

  return (
    <>
      <div>
        <div className="top-text-group">
          <div className="logo-text-group lg:w-[60%] max-sm:w-[90%] mx-auto ">
            <h1 className="title-top">Let's Introduce </h1>
            <img className=" lg:h-[50px] lg:w-40 w-28 h-9" src={logo} alt="Logo"/>
          </div>
          <p className="text-lg font-semibold text-gray-400 lg:w-[60%] mx-auto text-center w-full">
            The Multi Networking Company empowers career growth through
            collaborative problem-solving and innovative networking, fostering meaningful connections and skill development.
          </p>
        </div>
        <img className="about-img1" src={img3} alt="About" />
        <div className="mnc-group w-[70%] mx-auto max-md:w-[90%]">
          <div className=" max-md:flex flex-col items-center justify-center max-md:text-center ">
            <div>
              <img className="logo-img2" src={img10} alt="Multi" />
            </div>
            <div>
              <h3 className="multi-text mt-4 text-animated">Multi</h3>
              <p className="about-para-text">
                Abroad approach to networking, involving various types of interactions and opportunities
              </p>
            </div>
          </div>
          <div className="max-md:flex flex-col items-center justify-center max-md:text-center ">
            <div>
              <img className="logo-img2" src={img11} alt="Networking" />
            </div>
            <div className="mt-4">
              <h3 className="networking-text text-animated">Networking</h3>
              <p className="about-para-text">
                Central to your services, involving connecting people, promoting discussions, <br /> and facilitating professional relationships
              </p>
            </div>
          </div>
          <div className="max-md:flex flex-col items-center justify-center max-md:text-center ">
            <div>
              <img className="logo-img2" src={img12} alt="Company" />
            </div>
            <div className="mt-4">
              <h3 className="company-text text-animated">Company</h3>
              <p className="about-para-text">
                A dedicated organization that offers structured support for <br />
                career development through these networking <br /> opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="img5-div">
          <img className="about-img5" src={img5} alt="Image 5" />
        </div>
        <div className="row images-row2">
          <div className="col-md-7 max-lg:pt-10 max-sm:pt-24 ">
            <img className="about-img4" src={img4} alt="Image 4" />
          </div>
          <div className="col-md-5">
            <img className="about-img6" src={img6} alt="Image 6" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="title-top">Our Mission</h1>
          <p className="about-para-text lg:w-[70%] mx-auto w-[90%]">
            In the years ahead, The Multi Networking Company will ignite career growth by blending collaboration, innovation, and networking.<br />
            Our mission is to connect, inspire, and transform futures with endless possibilities.
          </p>
        </div>
        <div className="position-relative">
          <div>
            <img
              src={aicon}
              className="about-icon1"
              style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              alt="Icon"
            />
          </div>
          <div className="whymnc-group w-[70%] mx-auto max-lg:w-[90%] mt-20">
            <div className="grid lg:grid-cols-2 gap-20 grid-cols-1">
              <div className="">
                <h1 className="title-top  max-lg:text-center ">Why MNC?</h1>
                <div className="h-1 w-40 bg-[#0dbfff] max-lg:text-center max-lg:mx-auto"></div>
                <p className="about-para-text mt-4 max-lg:text-center">
                  At The Multi Networking Company, we're on a mission to empower career growth and innovation.<br /><br />
                  We provide a dynamic platform for collaborative problem-solving and networking, helping individuals forge meaningful connections and develop essential skills.<br /><br />
                  Our focus is on transforming careers through a supportive environment that encourages creativity and professional development. Join us to unlock endless opportunities and shape a brighter future together.
                </p>
              </div>
              <div className="lg:text-center justify-center flex w-full ">
                <div className="img-center">
                  <img className="about-img2  lg:h-[530px] w-full h-[700px] max-sm:h-[400px]" src={img7} alt="About Image 2"  />
                  <img
                    src={image1}
                    className="about-icon2 mxx-lg:hidden"
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row images-row">
          <div className="col-md-6 text-center">
            <img className="about-img8" src={img9} alt="About Image 8" />
          </div>
          <div className="col-md-6 text-center">
            <img className="about-img9" src={img8} alt="About Image 9" />
          </div>
        </div>
        <div className="ourservice-group w-[70%] mx-auto max-lg:w-[90%] my-10">
          <div className="text-center">
            <h1 className="title-top">Our Services</h1>
            <p className="about-para-text">
              Unlock your potential with our dynamic and interactive platform designed to enhance your skills through engaging games and real-world challenges.
              Whether you're looking to sharpen your problem-solving abilities, test your entrepreneurial mindset, or develop executive-level strategies, we've got you covered.
            </p>
            <br />
            <p>
              Our unique approach combines fun, practicality, and measurable growth, allowing you to track your progress and showcase your skills in a comprehensive portfolio. With every challenge you take on, you're not just learning; you're leveling up and preparing yourself for the opportunities ahead.
            </p>
          </div>
          <img
            className="about-icon4"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            src={img23}
            alt="Icon"
          />
        </div>

        <div id="contact">
          <Contact />
        </div>

      </div>
    </>
  );
};

export default AboutPage;
