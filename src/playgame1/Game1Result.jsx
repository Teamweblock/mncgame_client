import React from "react";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon2.png";
import { useState } from "react";
import icon2 from "../Assets/gameimages/icon3.png";
import { useEffect } from "react";
import logo from "../Assets/gameimages/mnclogo2.png";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/Game1/Game1Result.css";
const Game1Result = () => {
  const [value, setValue] = useState(10);
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
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const selectLevelpage = () => {
    navigate("/game1levelpage");
  };
  return (
    <>
      <div className="Game1-bg-result">
        <img src={logo} className="mnc-logo" />
        <img
          src={icon1}
          className="icon7-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon1}
          className="icon8-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon2}
          className="icon9-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <div>
          <h1 className="welldone-text">WELL DONE</h1>
          <div className="players-width">
            <div className="player-group">
              <div className="player1">
                <div>
                  <div className="text-center">
                    <img src={img1} className="avtar-img2" />
                    <h6 className="player-text">Player 1</h6>
                  </div>
                </div>
                <div>
                  <div className="player1-result">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book
                    </p>
                  </div>
                  <div className="slider-container">
                    <h5>Non implementable</h5>
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                    <h5>Implementable</h5>
                  </div>
                </div>
              </div>
              <div className="player2">
                <div>
                  <div className="text-center">
                    <img src={img1} className="avtar-img2" />
                    <h6 className="player-text">Player 2</h6>
                  </div>
                </div>
                <div>
                  <div className="player1-result">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book
                    </p>
                  </div>
                  <div className="slider-container">
                    <h5>Non implementable</h5>

                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      className="slider"
                      onChange={handleChange}
                      style={{
                        '--value': `${value}%`,
                      }}
                    /> */}
                    <h5>Implementable</h5>
                  </div>
                </div>
              </div>
              <div className="btn-group2">
                <button className="home-btn" onClick={handleHome}>
                  Home
                </button>
                <button className="next-btn" onClick={selectLevelpage}>
                  Next Lavel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game1Result;
