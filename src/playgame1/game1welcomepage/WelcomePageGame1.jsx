import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import logo from "../../Assets/gameimages/mnclogo2.png";
import icon1 from "../../Assets/gameimages/icon1.png";
import icon2 from "../../Assets/gameimages/icon3.png";
import "../../Assets/CSS/Game1/WelcomePageGame1.css";
const WelcomePageGame1 = () => {
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
  const playGame1 = () => {
    navigate("/game1players");
  };
  const backbtn1 = () => {
    navigate("/");
  };
  return (
    <>
      <div className="Game1-bg">
        <a href="/">
          <img src={logo} className="mnc-logo" />
        </a>
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
          <h1 className="welcome-text1">WELCOME TO PROBLEM PILOT</h1>

          {/* <TextAnimation text="WELCOME TO PROBLEM PILOT" speed={150} /> */}
          <h4 className="welcome-para">Problem Solving Skills Development</h4>
          <div className="playbtn">
            <button className="game1Playbtn" onClick={backbtn1}>
              Back
            </button>
            <button className="game1Playbtn btn-margin" onClick={playGame1}>
              Next
            </button>
          </div>
        </div>
        {/* <h6 className='game-footer-text'><span style={{fontWeight:"700", color:"white"}}>MULTI</span> NETWORKING COMPANY</h6> */}
      </div>
    </>
  );
};

export default WelcomePageGame1;
