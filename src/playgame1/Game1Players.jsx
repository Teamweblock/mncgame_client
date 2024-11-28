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
          <img src={logo} className="mnc-logo" alt="Logo" />
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
        <div className="players-part">
          <div className="single-player">
            <img src={img1} className="player-img" alt="Single Player" />
            <div className="center-btn" style={{ marginTop: "30px" }}>
              <button
                className="players-btn"
                onClick={() => handlePlayerLevel("single")}
              >
                SINGLE PLAYER
              </button>
            </div>
          </div>
          <div className="multi-player">
            <img src={img2} className="player-img" alt="Multi Player" />
            <div className="center-btn" style={{ marginTop: "30px" }}>
              <button
                className="players-btn"
                onClick={() => handlePlayerLevel("multiple")}
              >
                MULTI PLAYER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game1Players;
