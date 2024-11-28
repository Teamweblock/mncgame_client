// <!-- // src/components/home/Home.jsx -->
import { useEffect } from "react";
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

// E:\MNC\mnc\src\images\HOME\icon\11111.png

const Home = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
      title: "Complete Businesss Control",
      discription:
        "pore et dolore manga aliqua. Ut enim ad minim veniam, quis nostrude exerci tation",
    },
    {
      id: 2,
      img: img3,
      title: "Critical Analytics and report",
      discription:
        "pore et dolore manga aliqua. Ut enim ad minim veniam, quis nostrude exerci tation",
    },
    {
      id: 3,
      img: img4,
      title: "User Satisfaction Guarranted",
      discription:
        "pore et dolore manga aliqua. Ut enim ad minim veniam, quis nostrude exerci tation",
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
        "Develop and practice a solution-oriented mindset with our interactive game. Whether playing individually or in teams, challenge yourself to solve problems cre- atively and measure your solution-oriented abilities",
    },
    {
      id: 4,
      img: imga11,
      title: "Problem Pilot",
      discription:
        "Develop and practice a solution-oriented mindset with our interactive game. Whether playing individually or in teams, challenge yourself to solve problems cre- atively and measure your solution-oriented abilities",
    },
  ]
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
          <div className="banner-part1">
            <div className="banner-text">
              <h1 className="banner-title  max-lg:text-center text-6xl font-bold max-md:text-4xl">
                Work Smartly with Endless Possibility
              </h1>
              <p
                className="text-[1.4rem] text-[#5e5c5c] font-bold max-lg:text-center"
                // style={{
                //   color: "#5e5c5c",
                //   fontWeight: "700",
                //   fontSize: "25px",
                // }}
              >
                Chart your career path with our digital compass
              </p>
              <div>
                <div className=" max-lg:text-center">
                  <button className="border-none text-[1.3rem] font-bold text-[#101010]">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-part2">
            <img className="banner-img1" src={img34} />
          </div>
        </div>
      </div>

      <div className="home-container-3 mt-6">
        <p className="title-text2 mt-5">BUILD TRUST FIRST</p>
        <div className="text-5xl font-bold mt-2 max-md:text-3xl max-md:w-[90%] text-center">
          Why You Should Choose Us ?
        </div>
        <div className="text-5xl font-bold  max-md:text-3xl">What We Are?</div>
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

        <div className="grid lg:grid-cols-3 gap-10  w-[90%] md:w-[70%] mx-auto mt-20  sm:grid-cols-2 grid-cols-1">
          {businessList.map((business, index) => (
            <div
              key={index}
              className={`border-[6px] ${
                index === 0 ? "border-[#fe6686]" : ""
              } ${index === 1 ? "border-[#54d6a1]" : ""} ${
                index === 2 ? "border-[#fe9a3f]" : ""
              }  text-center px-5 md:px-10 rounded-xl flex flex-col items-center gap-2 justify-center md:py-14 py-8 `}
            >
              <img
                src={business.img}
                alt=""
                height={100}
                width={100}
                className=""
              />
              <p className="text-2xl font-extrabold ">{business.title}</p>
              <p className="text-sm font-medium text-gray-400">
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

      <div className=" w-[70%] max-md:w-[90%] mx-auto  about  flex items-center justify-between pt-10 gap-10">
        <div className="ab-part-1  lg:mb-64  mt-14">
          <div className="flex items-center md:gap-4 max-md:text-center max-md:flex-col">
            <p className="text-5xl font-bold max-md:text-3xl">About US</p>
            <div className="h-1 w-32 bg-yellow-300"></div>
          </div>
          {/* <img src={icon20} className="icon20"/> */}
          <div className=" mt-3 text-sm font-medium max-md:text-center">
            <p>
              At The Multi Networking Company, we are dedicated to empowering
              individuals by facilitating their careers.
            </p>
            <p>
              Our service portfolio focuses on promoting discussions on problem
              areas, collaborative problem-solving, and arrang- ing online
              conferences for networking with like minded people.
            </p>
            <p>
              We believe in fostering innovation and helping youth create
              opportunities for themselves while honing their skills in a
              supportive environment.
            </p>
          </div>
          <div className="abutton max-md:text-center">
            <button>KONW MORE</button>
          </div>
        </div>
        <div className="ab-part-2">
          <div className="ab12">
            <img className="img-ab5" src={imgab5} alt="" />
            <img className="img-ab4" src={aboutimg} alt="" />
          </div>
          <div className="extra md:ml-56 justify-sart flex sm:ml-32 ml-24">
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

          <div className=" mt-5  max-md:w-[90%] md:text-right text-center ">
           
            <p className="mt-3 text-nowrap  font-bold max-md:px-4 text-[#a90bd4]">
              WHAT WE DO
            </p>
            <div>
              <div className="text-5xl font-bold max-md:text-3xl ">
                Architects of opportunity, shaping
              </div>
              <div className="text-5xl font-bold max-md:text-3xl  mt-2">
                careers, fostering innovation. Welcome.
              </div>
            </div>
          </div>

          <img
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="image16  parallax-layer"
            src={img16}
            alt=""
          />
        </div>

        <div className="what-main1">
          <img
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="aicon  parallax-layer"
            src={aicon}
            alt=""
          />
          <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:w-[90%] mx-auto md:mt-20 mt-10">
            {shippingList.map((shipping, index) => (
              <div className=" rounded-xl bg-white shadow-md md:px-10 px-5 md:py-20 py-10 flex justify-center text-center items-center flex-col gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <img src={shipping.img} alt="" height={100} width={100}/>
                <p className="text-2xl font-bold">{shipping.title}</p>
                <p className="text-sm font-medium text-gray-400">{shipping.discription}</p>



              </div>
            ))}
          </div>

          {/* <div className="what-box1">
            <img className="boximg1" id="img-box" src={img8} alt="" />
            <h1 style={{ fontWeight: "700", padding: "20px 0px" }}>
              Problem Pilot
            </h1>
            <p>
              Develop and practice a solution-oriented mindset with our
              interactive game. Whether playing individually or in teams,
              challenge yourself to solve problems cre- atively and measure your
              solution-oriented abilities
            </p>
          </div>
          <div className="what-box2">
            <img className="boximg1" id="img-box" src={imga9} alt="" />
            <h1 style={{ fontWeight: "700" }}>Enterpreneurial Edge</h1>
            <p>
              Explore the enterpreneurial spirit within you with our game
              designed to test your innovative thiking and business acumen.
              Discover if you have what it takes to thrive in the world of
              enterpreneurship, regradless of your current venture status.
            </p>
          </div> */}
        </div>

        {/* <div className="what-main1">
          <div className="what-box1">
            <img className="boximg1" id="img-box" src={img10} alt="" />
            <h1 style={{ fontWeight: "700", padding: "20px 0px" }}>
              Strategy Trial
            </h1>
            <p>
              Develop and practice a solution-oriented mindset with our
              interactive game. Whether playing individually or in teams,
              challenge yourself to solve problems cre- atively and measure your
              solution-oriented abilities
            </p>
          </div>
          <div className="what-box2">
            <img className="boximg1" id="img-box" src={imga11} alt="" />
            <h1 style={{ fontWeight: "700" }}>Skills Portfolio</h1>
            <p>
              Explore the enterpreneurial spirit within you with our game
              designed to test your innovative thiking and business acumen.
              Discover if you have what it takes to thrive in the world of
              enterpreneurship, regradless of your current venture status.
            </p>
          </div>
        </div> */}

        <div className="position-relative w-100 max-md:mt-6">
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
            <div className="title-text mt-5">
              <h6 className="title-text2">OUR PROJECT</h6>
              <h1 className="title-text">Pratice Your Skills</h1>
              <h1 className="title-text">With Us In Our Arcade</h1>
            </div>
          </div>
          <div className="">
            <div className="port-part-1">
              <div className="img-b1">
                <img className="img-bi1" src={imgbi1} alt="" />
              </div>
              <div className="part-1-text">
                <div className="font-1">
                  <h3 className="h2">1</h3>

                  <img className="h1" src={imgf17} alt="" />
                </div>
                <h6 className="problem-text">Problem Solving Skills</h6>
                <h2>Problem Pilot</h2>
                <p className="para-text">
                  Welcome to Career Voyage! Conquer challenges, showcase skills
                  and advance your professional journey !
                </p>
                <button onClick={playGame1}>Play Now</button>
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
            <div className="port-part-2">
              <div className="img-b2">
                <img className="img-bi2" src={imgbi2} alt="" />
              </div>
              <div className="part-2-text">
                <div className="font-2">
                  <h3 className="h2">2</h3>

                  <img className="h1" src={imgf22222} alt="" />
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
                <h6>Entrepreneurial Mindset Development</h6>
                <h2>Entrepreneurial Edge</h2>
                <p className="para-text">
                  Welcome to Mindset Mastery! Ignite your entrepreneurial
                  spirit, conquer challenges, and cultivate a mindset for
                  success!
                </p>
                <button onClick={playGame2}>Play Now</button>
              </div>
            </div>
            <div className="port-part-3">
              <div className="img-b3">
                <img className="img-bi3" src={imgbi3} alt="" />
              </div>
              <div className="part-3-text">
                <div className="font-3">
                  <h3 className="h2">3</h3>

                  <img className="h1" src={imgf3333} alt="" />
                </div>
                <h6>Fundamental Skills Development</h6>
                <h2>Strategic Trial</h2>
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
                <p className="para-text">
                  Welcome to SkillForge! Cultivate core skills, hone strategic
                  views, and craft your roadmap to success!
                </p>
                <button onClick={playGame3}>Play Now</button>
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
          <div className="">
            {/* <div className="text-center join-img3">
              <img className="img-p4" src={imgp4} alt="" />
            </div>
            <img className="join-img2" src={img40} /> */}
            <img className="join-img2" src={join} alt="" srcset="" />
            <div className="join-group2">
              <h1>Come on, join with us !</h1>
              <p>Create an account and refer your friend</p>
            </div>
          </div>
        </div>
      </div>

      <div className="join-main">
        <img
          className="img-29 parallax-layer"
          src={img29}
          alt=""
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />

        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000, // Adjust the delay to your preference
            disableOnInteraction: false, // Allows autoplay to continue after user interaction
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="join-us">
              <div className="join-1">
                <div className="join-group">
                  <img className="join-img" src={img28} />
                  <h2 className="">TESTIMONIAL</h2>
                </div>
                <h1>They are awesome!</h1>

                <p className="theyare-content">
                  Kollit a do eiusmod tempor incididunt ut labore et do irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore
                  eu fugiat nulla pariatur.
                </p>
                <div className="name-teg">
                  <img className="img-33" src={img33} alt="" />
                  <h3> Kabir Manja</h3>
                  <h4>Music Producer</h4>
                </div>
              </div>
              {/* <img src={icon21} className="image21" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} /> */}
              <img src={image1} className="testi-img1" />
              <img
                src={aicon}
                className="aicon2"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              />
              <div className="join-2">
                <img className="img-32" src={imgc32} alt="" />
                <img className="img-1313c" src={img1313c} alt="" />
                <img className="img-31-1" src={imgc31} alt="" />
                <img
                  className="img-30"
                  src={imgc30}
                  alt=""
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="join-us">
              <div className="join-1">
                <div className="join-group">
                  <img className="join-img" src={img28} />
                  <h2 className="">TESTIMONIAL</h2>
                </div>
                <h1>They are awesome!</h1>

                <p className="theyare-content">
                  Kollit a do eiusmod tempor incididunt ut labore et do irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore
                  eu fugiat nulla pariatur.
                </p>
                <div className="name-teg">
                  <img className="img-33" src={img33} alt="" />
                  <h3> Kabir Manja</h3>
                  <h4>Music Producer</h4>
                </div>
              </div>
              <img
                src={icon21}
                className="image21"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              />
              <img src={image1} className="testi-img1" />
              <img
                src={aicon}
                className="aicon2"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              />
              <div className="join-2">
                <img className="img-32" src={imgc32} alt="" />
                <img className="img-1313c" src={img1313c} alt="" />
                <img className="img-31-1" src={imgc31} alt="" />
                <img
                  className="img-30"
                  src={imgc30}
                  alt=""
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                  }}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="join-us">
              <div className="join-1">
                <div className="join-group">
                  <img className="join-img" src={img28} />
                  <h2 className="">TESTIMONIAL</h2>
                </div>
                <h1>They are awesome!</h1>

                <p className="theyare-content">
                  Kollit a do eiusmod tempor incididunt ut labore et do irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore
                  eu fugiat nulla pariatur.
                </p>
                <div className="name-teg">
                  <img className="img-33" src={img33} alt="" />
                  <h3> Kabir Manja</h3>
                  <h4>Music Producer</h4>
                </div>
              </div>
              <img
                src={icon21}
                className="image21"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              />
              <img src={image1} className="testi-img1" />
              <img
                src={aicon}
                className="aicon2"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              />
              <div className="join-2">
                <img className="img-32" src={imgc32} alt="" />
                <img className="img-1313c" src={img1313c} alt="" />
                <img className="img-31-1" src={imgc31} alt="" />
                <img
                  className="img-30"
                  src={imgc30}
                  alt=""
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="subscription">
          <div className="subscription-title">
            <h6>SUBSCRIBE PLANS</h6>
            <p>
              Forge Personalized Paths for
              <br /> Your Journey Ahead!
            </p>
          </div>
          <div className="box-main">
            <div className="box-249" id="box-007">
              <div className="line-s" id="line-s1"></div>
              <h1>BASIC</h1>
              <h2>PLAN</h2>
              <div className="line" id="line-1"></div>
              <h3>249/-</h3>
              <h4>PER MONTH</h4>
              <div className="tc">
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Add Free For 10 Round
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Performance Tracking
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Solo Gameplay
                </p>
                <p>
                  <img className="img-133" src={img132} alt="" />
                  Team Gameplay
                </p>
                <p>
                  <img className="img-133" src={img132} alt="" />
                  Comprehensive Portfolio
                </p>
                <p>
                  <img className="img-133" src={img132} alt="" />
                  Access To Preminum Players
                </p>
              </div>
              <button className="bu-1">BUY NOW</button>
            </div>
            <div className="box-299" id="box-007">
              <div className="line-s" id="line-s2"></div>
              <h1>STRNDARD</h1>
              <h2>PLAN</h2>
              <div className="line" id="line-2"></div>
              <h3>299/-</h3>
              <h4>PER MONTH</h4>
              <div className="tc">
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Add Free For 10 Round
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Performance Tracking
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Solo Gameplay
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Team Gameplay
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Comprehensive Portfolio
                </p>
                <p>
                  <img className="img-133" src={img132} alt="" />
                  Access To Preminum Players
                </p>
              </div>
              <button className="bu-2">BUY NOW</button>
            </div>
            {/* <div className="box-399" id="box-007">
              <div className="line-s" id="line-s3"></div>
              <h1>ADVANCED</h1>
              <h2>PLAN</h2>
              <div className="line" id="line-3"></div>
              <h3>399/-</h3>
              <h4>PER MONTH</h4>
              <div className="tc">
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Add Free For 10 Round
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Performance Tracking
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Solo Gameplay
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Team Gameplay
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Comprehensive Portfolio
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Access To Preminum Players
                </p>
              </div>
              <button className="bu-3">BUY NOW</button>
            </div> */}

            <div className="box-249" id="box-007">
              <div className="line-s" id="line-s3"></div>
              <h1>ADVANCED</h1>
              <h2>PLAN</h2>
              <div className="line" id="line-1"></div>
              <h3>399/-</h3>
              <h4>PER MONTH</h4>
              <div className="tc">
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Add Free For 10 Round
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Performance Tracking
                </p>
                <p>
                  <img className="img-133" src={img133} alt="" />
                  Solo Gameplay
                </p>
                <p>
                  <img className="img-133" src={img132} alt="" />
                  Team Gameplay
                </p>
                <p>
                  <img className="img-133" src={img132} alt="" />
                  Comprehensive Portfolio
                </p>
                <p>
                  <img className="img-133" src={img132} alt="" />
                  Access To Preminum Players
                </p>
              </div>
              <button className="bu-3">BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
