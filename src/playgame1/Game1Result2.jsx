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
    // Increment the level
    const newLevelNumber = Number(levelNumber) + 1;
    // Store the updated level back in localStorage
    localStorage.setItem("levelNumber", newLevelNumber);
    // Navigate to the new level with updated levelNumber in the URL
    navigate(
      `/game1singleplayer?levelNumber=${newLevelNumber}&playerType=${playerType}`
    );
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

  const selectLevelPage = () => {
    // Define the maximum level number (adjust this as per your requirements)
    const maxLevel = 10;

    // Increment the level
    const newLevelNumber = Number(levelNumber) + 1;

    // Check if the new level number is greater than or equal to 4 or exceeds maxLevel
    if (newLevelNumber >= 4) {
      alert("You have not moved to the next level.");
      return; // Stop further execution
    }
    if (newLevelNumber >= maxLevel) {
      // Show a message if the new level exceeds or is equal to maxLevel
      alert(
        "You have not moved to the next level. You've reached the maximum level."
      );
      return; // Stop further execution
    }
    // Store the updated level back in localStorage
    localStorage.setItem("levelNumber", newLevelNumber);
    // Navigate to the new level with updated levelNumber in the URL
    navigate(
      `/game1singleplayer?levelNumber=${newLevelNumber}&playerType=${playerType}`
    );
  };

  return (
    <>
      <div className="Game1-bg-result2">
        <div className=" px-10 flex items-center justify-between w-[90%] mx-auto max-lg:justify-center ">
          <a href="/">
            <img src={logo} className="" alt="Logo" />
          </a>
          <div className="gap-4 flex max-lg:hidden">
            <button
              onClick={selectLevelPage}
              className="bg-[#ff5024] w-[200px]  text-white text-[1.4rem] font-bold rounded-full px-6 py-2 max-md:text-[1.2rem]"
            >
              NEXT LEVEL
            </button>
            <button
              onClick={handleHome}
              className="bg-[#ff5024] w-[200px]  text-white text-[1.4rem] font-bold rounded-full px-6 py-2 max-md:text-[1.2rem]"
            >
              EXIT{" "}
            </button>
          </div>
        </div>
        {/* <img
          src={icon1}
          className="icon7-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        /> */}
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
          <div className="flex justify-center items-center mx-auto flex-col mt-5">
            <img
              src="./profileimg.png"
              className="lg:h-[200px] lg:w-[200px] max-lg:h-[150px] max-lg:w-[150px] h-[100px] w-[100px] "
              alt=""
            />
            <p className="text-white text-[1.5rem] max-sm:text-[1.2rem] font-bold mt-2">
              Player 1
            </p>
            <p className="2xl:text-8xl text-4xl font-bold text-white max-sm:text-3xl mt-2">
              CONGRATULATIONS
            </p>
            <div className="text-white text-[1.5rem] max-sm:text-[1.2rem] font-bold text-center mt-2">
              <div>
                Great work! Here's how your peers rated your performance.
              </div>
              <div>let's see your progress!</div>
            </div>

            <div className=" lg:w-[70%] w-full mx-auto flex  items-center mt-16 px-2 max-lg:hidden">
              <h5 className="text-white text-[1.5rem] font-bold max-md:text-[1rem] ">
                Non implementable
              </h5>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${playerResult}%` }}
                  ></div>
                </div>
              </div>
              <h5 className="text-white text-[1.5rem] font-bold max-md:text-[1rem]">
                Implementable
              </h5>
            </div>
            <div className="flex items-center  flex-col  mt-16 px-2 lg:hidden w-[90%]">
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${playerResult}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-2">
                <h5 className="text-white text-[1.5rem] font-bold max-md:text-[15px] ">
                  Non implementable
                </h5>
                <h5 className="text-white text-[1.5rem] font-bold max-md:text-[15px]">
                  Implementable
                </h5>
              </div>
            </div>

            <div className="gap-4 flex  flex-col lg:hidden mt-10 pb-4">
              <button
                className="bg-[#ff5024] w-[200px]  text-white text-[1.4rem] font-bold rounded-full px-6 py-2 max-md:text-[1.2rem]"
                onClick={selectLevelpage}
              >
                NEXT LEVEL
              </button>
              <button
                className="bg-[#ff5024] w-[200px]  text-white text-[1.4rem] font-bold rounded-full px-6 py-2 max-md:text-[1.2rem]"
                onClick={handleHome}
              >
                EXIT
              </button>
            </div>
          </div>
          {/* <h1 className="welldone-text">WELL DONE</h1> */}
          {/* <div className="players-width">
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
                    <h5>Non implementable ajau</h5>
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Game1Result2;
