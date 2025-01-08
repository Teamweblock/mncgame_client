import React from "react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import icon1 from "../../Assets/gameimages/icon1.png";
import icon2 from "../../Assets/gameimages/icon5.png";
import logo from "../../Assets/gameimages/mnclogo2.png";
import "../../Assets/CSS/Game3/WelcomePageGame3.css";
import TextAnimation from "../../Common/TextAnimation";
const WelcomePageGame3 = () => {
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
  const playGame3 = () => {
    navigate("/chooserole");
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="welcomepage-bg3">
        <img src={logo} className="mnc-logo" />
        <img
          src={icon1}
          className="icon1-game3"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon2}
          className="icon2-game3"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <div className="welcome-title">
          <h1 className="welcome-text3">WELCOME TO STRATEGIC TRIAL</h1>
          {/* <TextAnimation text="WELCOME TO STRATEGIC TRIAL" speed={150} className="animated-text" /> */}
          <h4 className="welcome-para3">Fundamental Skills Development</h4>
          <div className="playbtn">
            {/* <button
              className="game1Playbtn w-100 py-3"
              style={{ letterSpacing: "2px", fontSize: "20px" }}
            >
              Comming Soon...
            </button> */}
            <button className='game1Playbtn'  onClick={handleBack}>Back</button>
            <button  className='game1Playbtn btn-margin'  onClick={playGame3}>Next</button>
          </div>
        </div>
        {/* <h6 className='game-footer-text'><span style={{fontWeight:"700", color:"white"}}>MULTI</span> NETWORKING COMPANY</h6> */}
      </div>
    </>
  );
};

export default WelcomePageGame3;
