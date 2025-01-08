// <!-- // src/components/home/Home.jsx -->
import { useEffect, useRef } from "react";
import { useState } from "react";
import React from "react";
import "../Home/home.css";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../Assets/icon/4.png";
import img2 from "../Assets/icon/1.png";
import img3 from "../Assets/icon/121.png";
import img4 from "../Assets/icon/3.png";
import img5 from "../Assets/icon/5.png";
import img6 from "../Assets/icon/6.png";
import imgab5 from "../Assets/icon/ab5.png";
import imgab4 from "../Assets/icon/ab5.png";
import img8 from "../Assets/icon/8.png";
import imga9 from "../Assets/icon/9.png";
import img10 from "../Assets/icon/10.png";
import imga11 from "../Assets/icon/11.png";
import imga12 from "../Assets/icon/12.png";
import img1313 from "../Assets/icon/1313.png";
import img14 from "../Assets/icon/14.png";
import img15 from "../Assets/icon/15.png";
import img16 from "../Assets/icon//16.png";
import img23 from "../Assets/icon/23.png";
import img24 from "../Assets/icon/24.png";
import img25 from "../Assets/icon/25.png";
import img26 from "../Assets/icon/26.png";
import img27 from "../Assets/icon/27.png";
import img28 from "../Assets/icon/img1.png";
import img31 from "../Assets/icon/31.png";
import img32 from "../Assets/icon/32.png";
import img33 from "../Assets/icon/33.png";
import imgf3333 from "../Assets/icon/3333.png";
import imgf22222 from "../Assets/icon/22222.png";
import imgf17 from "../Assets/icon/11111.png";
import img1121 from "../Assets/icon/121.png";
import imgp4 from "../Assets/images/img19.png";
import imgbi1 from "../Assets/CHANGES/1.png";
import imgbi2 from "../Assets/CHANGES/2.png";
import imgbi3 from "../Assets/CHANGES/3.png";
import img29 from "../Assets/icon/29 copy.png";
import img1313c from "../Assets/icon/1313.png";
import img34 from "../Assets/images/bannerimg3.png";
import imgc30 from "../Assets/icon/30 copy.png";
import imgc31 from "../Assets/icon/31 copy.png";
import img21 from "../Assets/images/img21.png";
import imgc32 from "../Assets/icon/32 copy.png";
import img132 from "../Assets/icon/132.png";
import img133 from "../Assets/icon/133.png";
import icon1 from "../Assets/icon/icon17.png";
import icon19 from "../Assets/icon/icon19.png";
import icon18 from "../Assets/icon/icon18.png";
import icon2 from "../Assets/icon/icon2.png";
import icon3 from "../Assets/icon/icon3.png";
import icon4 from "../Assets/icon/icon4.png";
import icon5 from "../Assets/icon/icon5.png";
import icon6 from "../Assets/icon/icon6.png";
import icon7 from "../Assets/icon/icon7.png";
import icon8 from "../Assets/icon/icon8.png";
import icon9 from "../Assets/icon/icon9.png";
import icon10 from "../Assets/icon/icon10.png";
import icon11 from "../Assets/icon/icon11.png";
import icon12 from "../Assets/icon/icon12.png";
import icon13 from "../Assets/icon/icon13.png";
import icon14 from "../Assets/icon/icon14.png";
import icon15 from "../Assets/icon/icon15.png";
import icon16 from "../Assets/icon/icon16.png";
import { useNavigate } from "react-router-dom";
import img22 from "../Assets/images/img22.png";
import Contact from "../Auth/Contact";
import aboutimg from "../Assets/images/img23.png";
import aicon from "../Assets/images/aicon1.png";
import image1 from "../Assets/icon/img2.png";
import icon20 from "../Assets/icon/icon4.png";
import icon21 from "../Assets/icon/131.png";
import img40 from "../Assets/illustration/411.png";
import join from "../Assets/illustration/Group 1.png";
import SwipeSide from "./Testimonials";
import { FaArrowRightLong } from "react-icons/fa6";

// E:\MNC\mnc\src\images\HOME\icon\11111.png

const Home = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const divRef3 = useRef(null);
  // const divRef4 = useRef(null);

  // const handleRedirect = () => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/profile/overview'); 
  //   } else {
  //     navigate('/login');
  //   }
  // };
  // const scrollToAndFocus = (index) => {
  //   let ref;
  //   if (index === 3) {
  //     return;
  //   }
  //   if (index === 0) {
  //     ref = divRef1;
  //   } else if (index === 1) {
  //     ref = divRef2;
  //   } else if (index === 2) {
  //     ref = divRef3;
  //   }else if (index === 3){
  //     return handleRedirect();
  //   }
  //   ref.current.scrollIntoView({ behavior: 'smooth' });
  //   ref.current.focus();
  // };


  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile/overview");
    } else {
      navigate("/login");
    }
  };

  const scrollToAndFocus = (index) => {
    let ref;
    if (index === 3) {
      handleRedirect();
      return;
    }
    if (index === 0) {
      ref = divRef1;
    } else if (index === 1) {
      ref = divRef2;
    } else if (index === 2) {
      ref = divRef3;
    }
    ref.current.scrollIntoView({ behavior: "smooth" });
    ref.current.focus();
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Unobserve after it's visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const navigate = useNavigate();
  const playGame1 = () => {
    navigate("/welcomepagegame1");
  };
  const playGame2 = () => {
    navigate("/welcomepagegame2");
  };
  const playGame3 = () => {
    navigate("/welcomepagegame3");
  };

  const businessList = [
    {
      id: 1,
      img: img2,
      title: " Revolutionizing Learning",
      discription:
        "Turning skill development into an engaging and game-based experience.",
    },
    {
      id: 2,
      img: img3,
      title: "Empowering the Future Workforce",
      discription:
        "Equipping youth with essential skills to thrive in professional and entrepreneurial landscapes.",
    },
    {
      id: 3,
      img: img4,
      title: "Building Connections Through Play",
      discription:
        "Fostering meaningful networks while nurturing personal and professional growth.",
    },
  ];
  const shippingList = [
    {
      id: 1,
      img: img8,
      title: "Problem Pilot",
      discription:
        "Develop and practice a solution-oriented mindset with our interactive game. Whether playing individually or in teams, challenge yourself to solve problems cre- atively and measure your solution-oriented abilities",
    },
    {
      id: 2,
      img: imga9,
      title: "Enterpreneurial Edge",
      discription:
        "Explore the enterpreneurial spirit within you with our game designed to test your innovative thiking and business acumen. Discover if you have what it takes to thrive in the world of enterpreneurship, regradless of your current venture status.",
    },
    {
      id: 3,
      img: img10,
      title: "Strategy Trial",
      discription:
        "Step into the shoes of a CXO and test your strategic decision-making skills in various scenarios. Navigate challenges, manage resources, and thrive in a simulated corporate environment to prove your capabilities.",
    },
    {
      id: 4,
      img: imga11,
      title: "Skills Portfolio",
      discription:
        "Track your skill development journey comprehensively with our skill assessment feature. Receive detailed insights and progress reports, distinguishing your skills from the average and empowering you to showcase your strengths effectively.",
    },
  ];

  const PlanList = [
    {
      title: "Basic ",
      price: "299",
      time: "1 month",
      bgColor: "#facc15",

      about: [
        {
          icon: img133,
          text: "This package is ad free",
        },
        {
          icon: img133,
          text: "Performance Tracking",
        },
        {
          icon: img133,
          text: "Solo Gameplay",
        },
        {
          icon: img132,
          text: "Team Gameplay",
        },
        {
          icon: img132,
          text: "Comprehensive Portfolio",
        },
        {
          icon: img132,
          text: "Access To Preminum Players",
        },
      ],
    },
    {
      title: "Standard ",
      price: "299",
      time: "1 month",
      bgColor: "#3085b0",
      about: [
        {
          icon: img133,
          text: "This package is ad free",
        },
        {
          icon: img133,
          text: "Performance Tracking",
        },
        {
          icon: img133,
          text: "Solo Gameplay",
        },
        {
          icon: img133,
          text: "Team Gameplay",
        },
        {
          icon: img133,
          text: "Comprehensive Portfolio",
        },
        {
          icon: img132,
          text: "Access To Preminum Players",
        },
      ],
    },
    {
      title: "Advanced ",
      price: "399",
      time: "1 month",
      bgColor: "#49e26e",
      about: [
        {
          icon: img133,
          text: "This package is ad free",
        },
        {
          icon: img133,
          text: "Performance Tracking",
        },
        {
          icon: img133,
          text: "Solo Gameplay",
        },
        {
          icon: img133,
          text: "Team Gameplay",
        },
        {
          icon: img133,
          text: "Comprehensive Portfolio",
        },
        {
          icon: img133,
          text: "Access To Preminum Players",
        },
      ],
    },
  ];

  return (
    <>
      {/* <div className="home-container-2">
        <div className="home-container">
          <h1>Work Smartly with Endless Possibility</h1>
          <p>Chart your career path with our digital compass</p>
          <button>Get Started</button>
        </div>
      </div> */}

      <div className="home-container1 position-relative">
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon1 parallax-layer"
          src={icon19}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-14 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon2 parallax-layer"
          src={icon2}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-14 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon3 parallax-layer"
          src={icon3}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-15 parallax-layer"
          src={icon14}
        />

        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-24 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-25 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-26 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-27 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-28 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-29 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-30 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-31 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-32 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon4 parallax-layer"
          src={icon4}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-16 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon5 parallax-layer"
          src={icon5}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-17 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon6 parallax-layer"
          src={icon6}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-18 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-21 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-22 parallax-layer"
          src={icon14}
        />

        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon9 parallax-layer max-lg:hidden"
          src={icon9}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-19 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon10 parallax-layer"
          src={icon10}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon11 parallax-layer"
          src={icon11}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon-20 parallax-layer"
          src={icon14}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon13 parallax-layer"
          src={icon13}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon15 parallax-layer"
          src={icon1}
        />
        <img
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="home-icon18 parallax-layer"
          src={icon18}
        />

        <div className="banner-main">
          <div className="banner-part1 md:pb-28 ">
            <div className="banner-text grid gap-2 md:w-[60%] md:ml-[35%] animate__animated animate__fadeInUp">
              <h1 className="banner-title max-lg:text-center text-7xl leading-tight font-bold max-md:text-4xl md:mt-10 max-xl:text-5xl animate-spring-in animate-delay-1000">
                Work Smartly With Endless Possibility
              </h1>
              <p className="text-[1.6rem] mt-6 text-[#5e5c5c] font-bold text-3xl max-lg:text-center animate-spring-in animate-delay-2000">
              Guide your career path with our digital compass.
              </p>
              {/* <div>
                <div className="max-lg:text-center xl:mt-[25%] lg:ml-[7%]">
                  <button className="border-none text-[1.6rem] font-bold text-[#101010] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-[#00bcd4]">
                    Get Started
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <div className="banner-part2">
            <img className="banner-img1" src={img34} />
          </div>
        </div>
      </div>

      <div className="home-container-3 ">
        <p className="text-nowrap group relative w-fit text-lg m-6 text-[1.3rem] font-medium tracking-widest pt-40 text-[#a90bd4]">
          BUILD TRUST FIRST
          <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#a90bd4]  group-hover:w-full"></span>
        </p>
        <div className="text-5xl font-bold mt-2 max-md:text-3xl max-md:w-[90%] text-center text-[#151310]">
          Why You Should Choose Us ?
        </div>
        <div className="text-5xl mt-2 font-bold max-md:text-3xl text-[#151310]">
        “What we do”
        </div>

        <div className="img-b21">
          <img
            className="img-21 parallax-layer"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            src={img21}
            alt=""
          />
        </div>
        <div className="img-b">
          <img
            className="img-5 parallax-layer"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            src={img5}
            alt=""
          />
        </div>
        {/* <div className="box-main">
          <div className="box2" id="box-box">
            <img className="img-2" src={img2} alt="" />
            <h1>Complete Businesss Control</h1>
            <p>
              pore et dolore manga aliqua. Ut enim ad minim veniam, quis
              nostrude exerci tation
            </p>
          </div>
          <div className="box3" id="box-box">
            <img className="img-3" src={img3} alt="" />
            <h1>Critical Analytics and report</h1>
            <p>
              pore et dolore manga aliqua. Ut enim ad minim veniam, quis
              nostrude exerci tation
            </p>
          </div>
          <div className="box4" id="box-box">
            <img className="img-4" src={img4} alt="" />
            <h1>User Satisfaction Guarranted</h1>
            <p>
              pore et dolore manga aliqua. Ut enim ad minim veniam, quis
              nostrude exerci tation
            </p>
          </div>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-10  w-[90%] lg:w-[80%] mx-auto mt-32  sm:grid-cols-2 grid-cols-1">
          {businessList.map((business, index) => (
            <div
              key={index}
              className={`border-[6px] ${index === 0 ? "border-[#ffcdbd]" : ""
                } ${index === 1 ? "border-[#d7efc2]" : ""} ${index === 2 ? "border-[#ffca9d]" : ""
                }  text-center px-3 md:px-10 rounded-xl flex flex-col items-center gap-2 justify-center md:py-20 py-16 bg-cover hover:cursor-pointer object-contain shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300`}
            >
              <img
                src={business.img}
                alt=""
                height={100}
                width={100}
                className=""
              />
              <p className="text-[1.7rem] font-bold ">{business.title}</p>
              <p className="text-[1.2rem] font-medium text-[#5a4d43]">
                {business.discription}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <img
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) ` }}
            className="img-26 parallax-layer"
            src={img26}
            alt=""
          />
        </div>
      </div>

      <div className=" lg:w-[70%] w-[90%]   mx-auto  about  flex items-center justify-between pt-40 gap-10 max-lg:flex-col">
        <div className="ab-part-1 ">
          <div className="flex items-center md:gap-4 max-lg:text-center max-lg:flex-col">
            <p className="text-2xl font-bold text-[#24201c] md:text-5xl sm:text-4xl xs:text-3xl whitespace-nowrap">
              About Us
            </p>
            <div className="h-1 w-40 bg-[#ffe744]"></div>
          </div>
          {/* <img src={icon20} className="icon20"/> */}
          <div className=" mt-3 text-[1.2rem] font-medium max-lg:text-center">
            <p>
              At The Multi Networking Company, we are dedicated to empowering
              individuals by facilitating their careers.
            </p>
            <p className="py-2">
              Our service portfolio focuses on promoting discussions on problem
              areas, collaborative problem-solving, and arrang- ing online
              conferences for networking with like minded people.
            </p>
            <p>
              We believe in fostering innovation and helping youth create
              opportunities for themselves while honing their skills in a
              supportive environment.
            </p>
            <button className="text-white font-bold bg-[#a90bd4] w-[180px] h-[50px] rounded-[5px] border-0 outline-none cursor-pointer mt-2.5" onClick={() => navigate("/about")}>KNOW MORE</button>
          </div>
          {/* <div className="abutton max-md:text-center max-lg:text-center flex items-center">
          </div> */}
        </div>
        <div className="ab-part-2 ">
          <div className="ab12 flex max-lg:flex-col max-lg:justify-center max-lg:mx-auto">
            <img
              className="img-ab5 flex justify-center mx-auto "
              src={imgab5}
              alt=""
            />
            <img
              className="img-ab4 flex max-lg:justify-center max-lg:mx-auto -ml-[100px] mt-20 "
              src={aboutimg}
              alt=""
            />
          </div>
          <div className="extra md:ml-48 justify-sart flex sm:ml-32 ml-24 max-2xl:hidden">
            <img className="img-6" src={img6} alt="" />
          </div>
        </div>
      </div>

      <div className="what">
        <div className="wh1">
          <img
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="img-14 parallax-layer"
            src={img14}
            alt=""
          />
          <div className="mt-4 max-md:w-[90%] lg:text-right w-[72%] max-lg:text-center px-4">
            {/* <div
              ref={sectionRef}
              className={`transition-all duration-1000 transform ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                }`}
            > */}
            <p className="font-medium relative group  w-fit ml-auto text-[1.3rem] text-[#a90bd4] tracking-widest pt-32">
              WHAT WE DO
              <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#a90bd4]  group-hover:w-full"></span>
            </p>
            <div>
              <div className="text-4xl font-bold max-md:text-3xl text-[#24201c]  delay-[0.3s]">
                Architects of opportunity, shaping
              </div>
              <div className="text-4xl font-bold max-md:text-3xl text-[#24201c] mt-2 mb-12  delay-[0.6s]">
                careers, fostering innovation. Welcome.
              </div>
            </div>
            {/* </div> */}
          </div>
          <img
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="image16  parallax-layer"
            src={img16}
            alt=""
          />
        </div>

        <div className="what-main1 w-[70%] max-lg:w-[90%] mx-auto">
          <img
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="aicon  parallax-layer"
            src={aicon}
            alt=""
          />
          <div className="grid grid-cols-2 gap-10 px-4 max-md:grid-cols-1 max-lg:w-[90%] mx-auto md:mt-20 mt-10">
            {shippingList.map((shipping, index) => (
              <div
                className="  bg-white shadow-md md:px-10 px-5 md:py-20 py-10 flex justify-center text-center items-center flex-col gap-2 hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{ borderRadius: "20px" }}
                key={index}
              >
                <img src={shipping.img} alt="" height={100} width={100} />
                <p className="text-2xl mt-2 font-bold">{shipping.title}</p>
                <p className="text-[1.2rem] font-medium text-[#5a4d43]">
                  {shipping.discription}
                </p>
                <FaArrowRightLong onClick={() => scrollToAndFocus(index)} className="text-[#C04AE2] text-5xl" />
              </div>
            ))}
          </div>
         </div>
        <div className=" max-md:mt-6">
          <img
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="e-box-img1 parallax-layer"
            src={img1313}
            alt=""
          />

          <div className="e-box1">
            <img
              style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              className="e-box-img2 parallax-layer"
              src={img15}
              alt=""
            />
          </div>
        </div>
        <div className="portfoliyo" id="portfolio">
          <div className="port-title">
            <div className="title-img">
              <img
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                className="img-23 parallax-laye"
                src={img23}
                alt=""
              />
            </div>
            <div className="home-container-3 mt-6 ">
              <p className="text-nowrap group relative w-max  text-[1.3rem] font-medium tracking-widest  pt-36 text-[#a90bd4]">
                OUR PROJECT
                <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#a90bd4]  group-hover:w-full"></span>
              </p>

              <div className="text-5xl font-bold max-md:text-3xl text-[#24201c]">
                Pratice Your Skills
              </div>
              <div className="text-5xl font-bold max-md:text-3xl mb-12 mt-3 text-[#24201c]">
                With Us In Our Arcade
              </div>
            </div>
          </div>
          <div className="">
            <div className="port-part-1 mt-10 relative   lg:w-[70%] w-[90%] mx-auto pt-16 flex justify-between max-lg:items-center gap-20 max-lg:flex-col">
              <div
                className="border-[6px] border-[#ffcdbd] ]  w-[220px] h-[230px]  sm:w-[300px] sm:h-[330px] "
                style={{ borderRadius: "15px" }}
              >
                <img
                  className="absolute top-16 sm:h-[400px] sm:w-[400px] h-[270px] w-[270px] "
                  src={imgbi1}
                  alt=""
                />
              </div>
              <div ref={divRef1} className="part-1-text  lg:pl-20 flex justify-center flex-col max-lg:text-center  lg:w-[60%]">
                <div className="font-1 max-lg:mx-auto ">
                  <h3 className="h2 text-[#151310]">1</h3>

                  <img
                    className=" w-8 h-16 mt-7 -ml-[25px] "
                    src={imgf17}
                    alt=""
                  />
                </div>
                <div className="text-2xl font-bold text-[#fd6784]">
                  Problem Solving Skills
                </div>
                <div className="text-4xl text-[#161310] font-bold mt-2 mb-4 max-md:text-3xl max-sm:text-2xl">
                  Problem Pilot
                </div>

                <div className=" max-lg:mx-auto text-[1.3rem] text-[#5a4d43] font-medium mb-4 max-md:px-4 mt-2">
                Step into real-life scenarios and test your creativity and quick thinking! Can you find unique solutions under pressure? Play and find out how innovative your solutions are.
                </div>
                <button onClick={playGame1} className="max-lg:mx-auto ">
                  Play Now
                </button>
                <div className="">
                  <img
                    className="image-26 parallax-layer"
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px)`,
                    }}
                    src={img26}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div ref={divRef2} className=" sm:mt-10 port-part-2 lg:w-[70%] lg:flex-row-reverse w-[90%] mx-auto pt-16 flex justify-between  max-lg:items-center gap-20 max-lg:flex-col relative">
              <div
                className=" border-[6px] border-[#9cf6d2] w-[220px] h-[230px] sm:w-[300px] sm:h-[330px]"
                style={{ borderRadius: "15px" }}
              >
                <img
                  className="absolute top-16 right-3  sm:h-[400px] sm:w-[400px] h-[250px] w-[250px]  "
                  src={imgbi2}
                  alt=""
                />
              </div>

              <div className="part-2-text lg:pr-20 flex justify-center flex-col max-lg:mx-auto max-lg:text-center lg:w-[60%]  ">
                <div className="font-1 max-lg:mx-auto ">
                  <h3 className="h2 text-[#151310]">2</h3>
                  <img
                    className=" w-10 h-[70px] mt-6 -ml-[34px]"
                    src={imgf22222}
                    alt=""
                  />
                </div>
                <div className="img-d">
                  <img
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px)`,
                    }}
                    className="img-27 parallax-layer"
                    src={img27}
                    alt=""
                  />
                </div>
                <div className="text-2xl font-bold text-[#55d6a3] ">
                  Entrepreneurial Mindset Development
                </div>
                <div className="text-4xl text-[#161310] font-bold mt-2  mb-4 max-md:text-3xl max-sm:text-2xl">
                  Entrepreneurial Edge
                </div>
                <div className=" max-lg:mx-auto text-[1.3rem] text-[#5a4d43] font-medium mb-4 max-md:px-4 mt-2">
                Ignite your entrepreneurial spirit, conquer challenges, and cultivate a mindset for success! It's a game of Mindset mastery!
                </div>
                <button onClick={playGame2} className="max-lg:mx-auto">
                  Play Now
                </button>
              </div>
            </div>
            <div ref={divRef3} className="port-part-3 sm:mt-10  relative  lg:w-[70%] w-[90%] mx-auto pt-16 flex justify-between max-lg:items-center gap-20 max-lg:flex-col">
              <div
                className="border-[6px] border-[#ffb1d9] ] w-[220px] h-[230px]  sm:w-[300px] sm:h-[330px] "
                style={{ borderRadius: "15px" }}
              >
                <img
                  className="absolute top-16 sm:h-[400px] sm:w-[400px] h-[270px] w-[270px]"
                  src={imgbi3}
                  alt=""
                />
              </div>
              <div className="part-1-text lg:pl-20 flex justify-center flex-col max-lg:text-center lg:w-[60%]">
                <div className="font-1 max-lg:mx-auto ">
                  <h3 className="h2 text-[#151310]">3</h3>

                  <img
                    className="w-12 h-[74px] mt-[25px] -ml-[42px]"
                    src={imgf3333}
                    alt=""
                  />
                </div>
                <div className="text-2xl font-bold text-[#d542fd]">
                  Fundamental Skills Development
                </div>
                <div className="text-4xl text-[#161310] font-bold mt-2 mb-4 max-md:text-3xl max-sm:text-2xl">
                  Strategic Trial
                </div>
                <div className="img-e">
                  <img
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px)`,
                    }}
                    className="img-25 parallax-layer"
                    src={img25}
                    alt=""
                  />
                </div>
                <div className=" max-lg:mx-auto text-[1.3rem] text-[#5a4d43] font-medium mb-4 max-md:px-4 mt-2">
                  Navigate complex business scenarios and uncover the secrets to corporate success. A challenge for your fundamental skills and strategic thinking!

                </div>
                <button onClick={playGame3} className="max-lg:mx-auto">
                  Play Now
                </button>
              </div>
            </div>
          </div>
          <div className="center-img">
            <img
              style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              className="img-24 parallax-layer"
              src={img24}
              alt=""
            />
            <img
              style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              className="img-1121 parallax-layer"
              src={img22}
              alt=""
            />
          </div>

          {/* <div className="text-center">
      <img className="w-full h-[500px] max-sm:h-auto" src={join} alt="" srcset="" />

      <h1 className="text-[#221f1b] font-bold text-6xl max-md:text-3xl">Come on, join with us !</h1>
      <p className="text-[1.3rem] text-[#5a4d43] font-medium mt-3">Create an account and refer your friend</p>
      </div> */}
        </div>
      </div>
      <div className="xxl:-mt-[150px] xl:-mt-[275px] lg:-mt-52 md:-mt-40 sm:-mt-20 -mt-[73px]">
        <img
          className="w-full h-auto object-cover relative z-50"
          src={join}
          alt="Join section background"
        />

        <div className="text-center mx-auto flex justify-center flex-col px-4 pt-10
            w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[65%]">
          <h1 className="text-[#221f1b] font-bold
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Come on, join with us!
          </h1>

          <p className="text-[#5a4d43] font-medium mt-3
              text-base sm:text-lg md:text-xl lg:text-2xl">
            Create an account and refer your friend
          </p>
        </div>
      </div>


      <div className="join-main ">
        <img
          className="img-29 parallax-layer"
          src={img29}
          alt=""
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        {/* <SwipeSide /> */}
        {/* <div className="subscription-title  pt-20 sm:pt-32 md:pt-18 lg:pt-40 xl:pt-72 ">
          <div className="text-nowrap group relative w-max  text-[1.3rem] font-medium tracking-widest   text-[#a90bd4]">
            SUBSCRIBE PLANS
            <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#a90bd4]  group-hover:w-full"></span>
          </div>
          <div className="text-5xl font-bold max-md:text-3xl text-[#24201c]">
            Forge Personalized Paths for
          </div>
          <div className="text-5xl font-bold max-md:text-3xl mt-2 mb-12 text-[#24201c]">
            Your Journey Ahead!
          </div>
        </div>

        <div className=" grid lg:grid-cols-3 xs:w-[70%] w-[80%] max-md:grid-cols-1 max-lg:w-[90%] md:grid-cols-2 gap-6 md:gap-14 my-20  mx-auto  pb-40">
          {PlanList.map((plan, planIndex) => (
            <div
              key={planIndex}
              className="box-249 px-8 py-10 bg-white rounded-lg shadow-lg"
              id={`box-${planIndex}`}
            >
              <div className="line-s" id="line-s1"></div>
              <div className="text-4xl font-normal max-sm:text-2xl">
                {plan.title.toUpperCase()}
                <br />
                <span className="font-bold"> PLAN</span>
              </div>
              <div
                className={`line my-3 ${plan.bgColor}`}
                style={{ backgroundColor: plan.bgColor }}
              ></div>
              <div className="text-5xl text-[#27231f] font-bold max-sm:text-3xl">
                {plan.price}/-
              </div>
              <div className="text-[17px] text-[#413a33] font-normal">
                {plan.time.toUpperCase()}
              </div>
              <div className="list-none mt-4 space-y-2 ">
                {plan.about.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-2 text-sm font-bold"
                  >
                    <img
                      className="img-133"
                      src={feature.icon}
                      alt=""
                      height={20}
                      width={20}
                    />
                    {feature.text}
                  </li>
                ))}
              </div>

              <button
                className={`${plan.bgColor} text-white py-2 px-4 rounded-lg text-lg font-bold w-full mt-4`}
                style={{ backgroundColor: plan.bgColor }}
              >
                BUY NOW
              </button>
            </div>
          ))}
        </div> */}
      </div>
      <div id="contact" className="">
        <Contact />
      </div>
    </>
  );
};

export default Home;
