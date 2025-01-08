import React, { useState, useEffect } from "react";
import "../Assets/CSS/Game1/Game1Players.css";
import img1 from "../Assets/gameimages/img5.png";
import img2 from "../Assets/gameimages/img4.png";
import icon1 from "../Assets/gameimages/icon1.png";
import icon2 from "../Assets/gameimages/icon4.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import { useNavigate } from "react-router-dom";

const Game1Players = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Parallax effect on mouse move
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth - clientX) / 120;
    const y = (window.innerHeight - clientY) / 120;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Navigate to the level page with playerType stored in local storage
  const handlePlayerLevel = (playerType) => {
    localStorage.setItem("playerType", playerType); // Save playerType to local storage
    console.log("playerType", playerType);

    if (playerType == "multiple") {
      navigate(`/game1multiplelevelpage`); // Navigate to the level page
    } else if (playerType == "single") {
      navigate(`/game1singlelevelpage`); // Navigate to the level page
    }
  };

  // Remove playerType from localStorage on initial load
  useEffect(() => {
    const storedPlayerType = localStorage?.getItem("playerType");
    if (storedPlayerType) {
      localStorage?.removeItem("playerType");
      console.log("playerType removed from localStorage on first load.");
    }
  }, []);

  return (
    <>
      <div className="game1-bg  ">
        <div className="lg:py-20 max-lg:py-6 w-[70%] flex lg:justify-start mx-auto cursor-pointer justify-center">

        <a href="/" className="cursor-pointer">
        <img src={logo} alt="Game Logo " height={50} width={120} />
        </a>
        </div>
        <img
          src={icon1}
          className="icon3-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          alt="Icon1"
        />
        <img
          src={icon2}
          className="icon4-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          alt="Icon2"
        />
        <div className=" absolute inset-0 lg:justify-center lg:gap-20 pt-20 mt-20 flex items-center max-lg:flex-col ">
          <div className="flex flex-col  lg:gap-5  justify-center  ">
            <img src={img1} className=" max-lg:h-[200px] max-lg:w-[200px] h-[350px] w-[350px] hover:scale-105 cursor-pointer  transition-transform duration-300 ease-in-out" alt="Single Player" 
            // height={200}
            // width={200}
            />
              <button
                className="players-btn  mx-auto mt-3 transition duration-700 delay-300"
                onClick={() => handlePlayerLevel("single")}
              >
                SINGLE PLAYER
              </button>
          
          </div>
          <div className="flex flex-col   justify-center  lg:gap-5 ">
            <img src={img2} className="cursor-pointer max-lg:h-[200px] max-lg:w-[200px] h-[350px] w-[350px]   hover:scale-110 transition-transform duration-300 ease-in-out mb-2" alt="Multi Player"
             
            />
              <button
                className="players-btn  mx-auto mt-3 transition duration-700 delay-300"
                onClick={() => handlePlayerLevel("multiple")}
                style={{hover:"white"}}
              >
                MULTI PLAYER
              </button>
              
          </div>
        </div>
      </div>
    </>
  );
};

export default Game1Players;
