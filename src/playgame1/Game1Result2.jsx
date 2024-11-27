import React from "react";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon2.png";
import { useState } from "react";
import icon2 from "../Assets/gameimages/icon3.png";
import { useEffect } from "react";
import logo from "../Assets/gameimages/mnclogo2.png";
import "../Assets/CSS/Game1/Game1Result.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { get1GameResult } from "../utils/axiosInstance";
const Game1Result2 = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [levelNumber, setLevelNumber] = useState(null);
  const [playerType, setPlayerType] = useState(null);
  const [playerResult, setplayerResult] = useState(null);

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

  const handleHome = () => {
    navigate("/");
  };
  const selectLevelpage = () => {
    navigate(`/game1levelpage?playerType=${playerType}`);
  };
  const handlegetresult = async () => {
    try {
      const payload = { level: levelNumber };
      // API call
      const response = await get1GameResult(JSON.stringify(payload));

      // Check response success
      if (response) {
        // Extract the scores from levelScores
        const levelScores = response.levelScores || []; // Ensure it exists
        const scores = levelScores.map((level) => level.score);
        const singleScore = scores[0] || 0; // Fallback to 0 if scores array is empty
        setplayerResult(singleScore);
      } else {
        toast.error("Failed to fetch results. Please try again.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      // Show error toast
      toast.error("There was an error while fetching data. Please try again.");
    }
  };

  // Prevent memory leaks
  useEffect(() => {
    if (levelNumber) {
      handlegetresult(levelNumber);
    }
  }, [levelNumber]);

  useEffect(() => {
    // Get the levelNumber from localStorage
    const storedlevel = localStorage.getItem("levelNumber");
    const storedtype = localStorage.getItem("playerType");
    if (storedlevel && storedtype) {
      setLevelNumber(storedlevel);
      setPlayerType(storedtype);
    }
  }, []);
  return (
    <>
      <div className="Game1-bg-result2">
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
                          style={{ width: `${playerResult}%` }}
                        ></div>
                      </div>
                    </div>
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

export default Game1Result2;
