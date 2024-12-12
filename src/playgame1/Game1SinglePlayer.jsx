import React, { useState, useEffect } from "react";
import "../Assets/CSS/Game1/Game1SinglePlayer.css";
import { useLocation, useNavigate } from "react-router-dom";
import icon1 from "../Assets/gameimages/icon1.png";
import icon2 from "../Assets/gameimages/icon4.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import {
  getQuestionsForLevel,
  submitGame1Answer,
} from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Game1SinglePlayer = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [playerData, setPlayerData] = useState([]);
  const [userAnswer, setUserAnswer] = useState(""); // To store the input value
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [countdown, setCountdown] = useState(3); // 3-second countdown
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelNumber, setLevelNumber] = useState(null);
  const [playerType, setPlayerType] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };
  const handleInputChange = (e) => {
    setUserAnswer(e.target.value); // Update the state with input value
  };

  const handleNextQuestion = async () => {
    // e.preventDefault();
    try {
      if (currentQuestionIndex <= playerData?.length - 1) {
        if (userAnswer?.trim() === "") {
          alert("Please enter an answer before proceeding.");
          return; // Don't proceed if the input is empty
        }

        const payload = {
          level: levelNumber,
          answers: userAnswer,
          questionId: playerData[currentQuestionIndex]?.questionId?._id,
          index: currentQuestionIndex,
        };
        const response = await submitGame1Answer(JSON.stringify(payload));

        if (response?.success === true) {
          setUserAnswer("");
          // Check if it's the last question
          if (currentQuestionIndex === playerData?.length - 1) {
            // Clear only the `currentQuestionIndex` for the specific `levelNumber`
            localStorage.removeItem(`currentQuestionIndex_${levelNumber}`);
            navigate("/game1result2");
          } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(180); // Reset timer
          }
        }
      } else {  
        alert("Game Over! You have answered all questions.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("There was an error while fetching data. Please try again.");
    }
  };
  // The updated handleLevelClick function
  const handleLevelClick = async (levelNumber, playerType) => {
    // Construct the payload to be sent to the API
    const payload = {
      level: levelNumber,
    };

    // Define the API function to be called based on player type
    let apiCall;
    if (playerType === "single") {
      apiCall = getQuestionsForLevel; // Use getQuestionsForLevel for single-player
    }
    try {
      const data = await apiCall(payload); // Call the appropriate API with the payload
      if (data?.status === true) {
        setPlayerData(data.formattedQuestions);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleBack = () => {
    navigate("/game1players"); // Implement your back navigation here
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      <div className="timer">
        
     


        <div className="time-group">
          <div>
            <span className="minutes">{minutes}</span>
            <span className="dot2">:</span>
          </div>
          <div>
            <span className="text-white font-bold text-[1.2rem]">MINUTE</span>
          </div>
        </div>
        <div className="time-group">
          <div>
            <span className="seconds">
              {seconds < 10 ? "0" : ""}
              {seconds}
            </span>
          </div>
          <div>
            <span className="text-white font-bold text-[1.2rem]">SECOND</span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Countdown Effect
  useEffect(() => {
    if (countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [countdown]);

  // Load level and player type from query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const level = queryParams.get("levelNumber");
    const player = queryParams.get("playerType");

    if (level && player) {
      setLevelNumber(level);
      setPlayerType(player);
    }
  }, [location]);

  // Timer Effect (starts after countdown reaches 0)
  useEffect(() => {
    if (countdown === 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);

            // Check if we are on the last question
            if (currentQuestionIndex >= playerData?.length - 1) {
              navigate("/game1result2"); // Navigate to results
            } else {
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
              setTimeLeft(180); // Reset timer
            }
            return 0; // Stop the timer
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [countdown, currentQuestionIndex, playerData?.length, navigate]);

  useEffect(() => {
    if (levelNumber && playerType) {
      handleLevelClick(levelNumber, playerType);
    }
  }, [levelNumber, playerType]);

  useEffect(() => {
    if (levelNumber) {
      // Retrieve the saved index from localStorage
      const savedIndex = localStorage.getItem(
        `currentQuestionIndex_${levelNumber}`
      );
      // Parse and set the current question index, defaulting to 0 if none is found
      setCurrentQuestionIndex(savedIndex ? Number(savedIndex) : 0);
    }
  }, [levelNumber]);

  useEffect(() => {
    if (levelNumber) {
      // Save the currentQuestionIndex to localStorage when it updates
      localStorage.setItem(
        `currentQuestionIndex_${levelNumber}`,
        currentQuestionIndex // Convert to string for storage
      );
    }
  }, [currentQuestionIndex, levelNumber, playerData]);

  return (
    <div className="Game1-sinlgeplayer-bg">
      <img src={logo} className="mnc-logo flex justify-center items-center" />
      <img
        src={icon1}
        className="icon3-game1 parallax-layer"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <img
        src={icon2}
        className="icon4-game1 parallax-layer"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <div className="game1-width max-md:w-[90%] w-[70%] mx-auto">
        <div className="single-player-part">
          {countdown > 0 && (
            <div className="countdown">
              <h2> {countdown}</h2>
            </div>
            
          )}
          {countdown === 0 && <p className="timer">{formatTime(timeLeft)}</p>}
          {playerData?.length > 0 ? (
            <>
              <div className="questions-game1">
                <div className="bg-gradient-to-t from-[#37d4f1] via-[#c3f2fb] to-white max-md:w-full text-[17px] md:text-[1.4rem] font-semibold  items-center  rounded-lg text-center md:py-5 max-md:py-3  justify-center">
                  {/* <h4>
                    Question {currentQuestionIndex + 1} {"-"}
                  </h4> */}
                  <p>{playerData[currentQuestionIndex]?.questionText}</p>
                </div>
            
                  <input
                    type="text"
                    className="outline-none max-md:py-3 md:py-[35px] w-[90%] flex justify-center mt-10  text-wrap px-1 mx-auto rounded-lg text-center font-bold text-[18px] text-black "
                    placeholder="Type Your Solution"
                    value={userAnswer} // Bind the input value with state
                    onChange={handleInputChange} // Update state when input changes
                  />
                
              </div>
            </>
          ) : (
            <div className="loading-container">
              <p>Loading questions...</p>
            </div>
          )}
          <div className="text-center d-sm-flex flex-sm-wrap justify-content-sm-center">
            {currentQuestionIndex === 0 && (
              <div className="">
                <button className="next-button me-md-3" onClick={handleBack}>
                  Back
                </button>
              </div>
            )}
            {currentQuestionIndex < playerData?.length - 1 ? (
              <div className="">
                <button className="next-button" onClick={handleNextQuestion}>
                  Next 
                </button>
              </div>
            ) : (
              <div className="">
                <button className="show-button text-nowrap" onClick={handleNextQuestion}>
                  Show Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game1SinglePlayer;
