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
  const [loading, setLoading] = useState(true); // Track loading state

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
  // Fetch questions for the level when level and player type change
  useEffect(() => {
    if (levelNumber && playerType) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getQuestionsForLevel(
            { level: levelNumber },
            navigate
          );
          console.log("data?.status", data);
          console.log("data?.status", data?.status);
          if (data?.status === true) {
            setPlayerData(data.formattedQuestions);
          }
        } catch (error) {
          console.error("Error fetching questions", error);
          toast.error("Failed to load questions.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [levelNumber, playerType]);

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
            <span className="minutes-text">MINUTE</span>
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
            <span className="seconds-text">SECOND</span>
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
              handleNextQuestion();
              // navigate("/game1result2"); // Navigate to results
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
  }, [currentQuestionIndex, levelNumber]);

  return (
    <div className="Game1-sinlgeplayer-bg">
      <img src={logo} className="mnc-logo" />
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
      {loading ? (
        <div className="loading-container">
          <p>Loading questions...</p>
        </div>
      ) : (
        <>
          <div className="game1-width">
            <div className="single-player-part">
              {countdown > 0 && (
                <div className="countdown">
                  <h2> {countdown}</h2>
                </div>
              )}
              {countdown === 0 && (
                <p className="timer">{formatTime(timeLeft)}</p>
              )}
              <>
                <div className="questions-game1">
                  <div className="question-box">
                    <h4>
                      Question {currentQuestionIndex + 1} {"-"}
                    </h4>
                    <p>{playerData[currentQuestionIndex]?.question}</p>
                  </div>
                  <div className="solution-box">
                    <input
                      type="text"
                      placeholder="Type Your Solution"
                      value={userAnswer} // Bind the input value with state
                      onChange={handleInputChange} // Update state when input changes
                    />
                  </div>
                </div>
              </>
              <div className="text-center d-sm-flex flex-sm-wrap justify-content-sm-center">
                {currentQuestionIndex === 0 && (
                  <div className="">
                    <button
                      className="next-button me-md-3"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                )}
                {currentQuestionIndex < playerData?.length - 1 ? (
                  <div className="">
                    <button
                      className="next-button"
                      onClick={handleNextQuestion}
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <button
                      className="show-button"
                      onClick={handleNextQuestion}
                    >
                      Show Results
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game1SinglePlayer;
