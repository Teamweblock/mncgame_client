import React, { useState, useEffect } from "react";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon2.png";
import icon2 from "../Assets/gameimages/icon3.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/Game1/Game1Result.css";

const Game1Result = () => {
  // States for player progress, dragging and parallax
  const [player1Progress, setPlayer1Progress] = useState(10);
  const [player2Progress, setPlayer2Progress] = useState(10);
  const [isDraggingPlayer1, setIsDraggingPlayer1] = useState(false);
  const [isDraggingPlayer2, setIsDraggingPlayer2] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Handle mouse move for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };

  // Handle mouse events for player 1's progress bar
  const handleMouseMoveForPlayer1 = (e) => {
    if (isDraggingPlayer1) {
      const progressBar = document.querySelector(
        ".progress-bar-container-player1"
      );
      const rect = progressBar.getBoundingClientRect();
      const newWidth = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const percentage = Math.round((newWidth / rect.width) * 100);
      console.log("percentage", percentage);

      setPlayer1Progress(percentage);
    }
  };

  // Handle mouse events for player 2's progress bar
  const handleMouseMoveForPlayer2 = (e) => {
    if (isDraggingPlayer2) {
      const progressBar = document.querySelector(
        ".progress-bar-container-player2"
      );
      const rect = progressBar.getBoundingClientRect();
      const newWidth = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const percentage = Math.round((newWidth / rect.width) * 100);
      setPlayer2Progress(percentage);
    }
  };

  // Start dragging event for Player 1
  const handleMouseDownPlayer1 = () => {
    setIsDraggingPlayer1(true);
  };

  // Start dragging event for Player 2
  const handleMouseDownPlayer2 = () => {
    setIsDraggingPlayer2(true);
  };

  // Stop dragging and update progress on mouse up for Player 1 and Player 2 sequentially
  const handleMouseUp = () => {
    setIsDraggingPlayer1(false);
    setIsDraggingPlayer2(false);

    // First, update Player 1's progress
    updateDatabase(player1Progress, "player1")
      .then(() => {
        // After Player 1's update is successful, update Player 2's progress
        updateDatabase(player2Progress, "player2");
      })
      .catch((error) => {
        console.error("Error updating player progress:", error);
      });
  };

  // Function to update the database with the current progress values (player-specific)
  const updateDatabase = async (progressValue, player) => {
    try {
      const response = await fetch("https://example.com/api/update-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          progress: progressValue, // Send the specific progress value
        }),
      });

      if (response.ok) {
        console.log(`${player} progress updated successfully!`);
      } else {
        console.error(`Failed to update ${player} progress.`);
      }
    } catch (error) {
      console.error(`Error updating ${player} progress:`, error);
    }
  };

  // Set up mouse event listeners on mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMoveForPlayer1);
    window.addEventListener("mousemove", handleMouseMoveForPlayer2);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveForPlayer1);
      window.removeEventListener("mousemove", handleMouseMoveForPlayer2);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDraggingPlayer1, isDraggingPlayer2]);

  // Navigate functions for Home and Next Level
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const selectLevelpage = () => {
    navigate("/game1singlelevelpage");
  };

  return (
    <>
      <div className="Game1-bg-result">
        <img src={logo} className="mnc-logo" />
        {/* Parallax images */}
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
          <h1 className="text-8xl font-bold text-white max-lg:text-4xl text-center lg:my-20 mt-20 py-4">
            WELL DONE
          </h1>

          <div className="w-[70%] max-lg:w-[90%] mx-auto">
            {/* Player 1 Section */}
            <div className="flex gap-4 max-lg:flex-col max-lg:gap-0 mb-4">
              <div className="flex flex-col items-center ">
                <img
                  src={img1}
                  className="avtar-img2"
                  height={200}
                  width={200}
                />
                <h6 className="text-[1.3rem] text-white mt-2 font-bold">
                  Player 1
                </h6>
              </div>
              <div>
                <div className=" bg-white text-black font-medium text-[1.2rem] rounded-2xl p-4 text-center max-sm:text-[1rem]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </div>
                <div className="flex items-center gap-2 my-4 max-lg:hidden">
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">
                    Non implementable
                  </h5>
                  <div
                    className="progress-bar-container-player1"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "20px",
                      background: "#ddd",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      className="progress"
                      style={{
                        width: `${player1Progress}%`,
                        height: "100%",
                        background: "orange",
                        borderRadius: "10px",
                      }}
                    ></div>
                    <div
                      className="slider"
                      style={{
                        position: "absolute",
                        left: `calc(${player1Progress}% - 15px)`,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "20px",
                        height: "20px",
                        background: "orange",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onMouseDown={handleMouseDownPlayer1}
                    ></div>
                  </div>
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">
                    Implementable
                  </h5>
                </div>
              </div>
            </div>

            {/* Player 2 Section */}
            <div className="flex gap-4 max-lg:flex-col max-lg:gap-0 mb-4">
              <div className="flex flex-col items-center ">
                <img
                  src={img1}
                  className="avtar-img2"
                  height={200}
                  width={200}
                />
                <h6 className="text-[1.3rem] text-white mt-2 font-bold">
                  Player 2
                </h6>
              </div>
              <div>
                <div className=" bg-white text-black font-medium text-[1.2rem] rounded-2xl p-4 text-center max-sm:text-[1rem]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </div>
                <div className="flex items-center gap-2 my-4 max-lg:hidden">
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">
                    Non implementable
                  </h5>
                  <div
                    className="progress-bar-container-player2"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "20px",
                      background: "#ddd",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      className="progress"
                      style={{
                        width: `${player2Progress}%`,
                        height: "100%",
                        background: "orange",
                        borderRadius: "10px",
                      }}
                    ></div>
                    <div
                      className="slider"
                      style={{
                        position: "absolute",
                        left: `calc(${player2Progress}% - 15px)`,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "20px",
                        height: "20px",
                        background: "orange",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onMouseDown={handleMouseDownPlayer2}
                    ></div>
                  </div>
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">
                    Implementable
                  </h5>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="btn-group2 pb-3">
              <button className="home-btn" onClick={handleHome}>
                Home
              </button>
              <button className="next-btn" onClick={selectLevelpage}>
                Next Level
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game1Result;
