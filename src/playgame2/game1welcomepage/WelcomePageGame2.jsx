import React from "react";
import "../../Assets/CSS/Game2/WelcomePageGame2.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../../Assets/gameimages/mnclogo2.png";
import icon1 from "../../Assets/gameimages/icon1.png";
import icon2 from "../../Assets/gameimages/icon3.png";

const WelcomePageGame2 = () => {
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
  const navigate = useNavigate("/");
  // const playGame2=()=>{
  //   navigate("/game2question")
  // }
  const handlePlayerLevel = () => {
    navigate(`/game2levelpage`);
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="welcomepage-bg">
        <img src={logo} className="mnc-logo" />
        <img
          src={icon1}
          className="icon1-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon2}
          className="icon2-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <div className="welcome-title">
          <h1 className="mt-5 text-center text-white font-bold 2xl:text-8xl xl:text-6xl max-lg:text-5xl max-sm:text-3xl max-md:text-4xl">WELCOME TO ENTREPRENEURIAL EDGE</h1>
          {/* <TextAnimation text="WELCOME TO  ENTREPRENEURIAL EDGE" speed={150} className="animated-text" /> */}
          <h4 className="welcome-para2">Entrepreneurial Mindset Development</h4>
          <div className="playbtn">
            <button className="game1Playbtn" onClick={handleBack}>
              Back
            </button>
            <button
              className="game1Playbtn btn-margin"
              onClick={handlePlayerLevel}
            >
              Next
            </button>
          </div>
        </div>
        {/* <h6 className='game-footer-text'><span style={{fontWeight:"700", color:"white"}}>MULTI</span> NETWORKING COMPANY</h6> */}
      </div>
    </>
  );
};

export default WelcomePageGame2;
