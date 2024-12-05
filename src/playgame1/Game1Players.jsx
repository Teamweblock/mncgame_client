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
    navigate(`/game1levelpage?playerType=${playerType}`);
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
      <div className="game1-bg">
        <a href="/">
          <img src={logo} className="h-[45px] w-[100px] absolute md:top-20 top-10 left-20" alt="Logo" />
        </a>
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
        <div className=" absolute inset-0 justify-center md:gap-20  flex items-center max-lg:flex-col max-sm:mt-28">
          <div className="flex flex-col  lg:gap-5  justify-center  ">
            <img src={img1} className="player-img hover:scale-110 cursor-pointer  transition-transform duration-300 ease-in-out" alt="Single Player"  />
              <button
                className="players-btn  mx-auto"
                onClick={() => handlePlayerLevel("single")}
              >
                SINGLE PLAYER
              </button>
          
          </div>
          <div className="flex flex-col   justify-center  lg:gap-5 ">
            <img src={img2} className="cursor-pointer  player-img hover:scale-110 transition-transform duration-300 ease-in-out mb-2" alt="Multi Player" />
              <button
                className="players-btn  mx-auto"
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
