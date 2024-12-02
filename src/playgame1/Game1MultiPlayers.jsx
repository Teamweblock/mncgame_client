import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon1.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import "../Assets/CSS/Game1/Game1MultiPlayers.css";
import {
  getQuestionsForLevel,
  submitGame1Answer,
} from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Game1MultiPlayer = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [playerData, setPlayerData] = useState([]);
  const [userAnswer, setUserAnswer] = useState(""); // To store the input value
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [countdown, setCountdown] = useState(3); // 3-second countdown
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelNumber, setLevelNumber] = useState(null);
  const [playerType, setPlayerType] = useState(null);
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
    try {
      // if (userAnswer?.trim() === "") {
      //   alert("Please enter an answer before proceeding.");
      //   return; // Don't proceed if the input is empty
      // }

      const payload = {
        level: levelNumber,
        answers: userAnswer,
        questionId: playerData[currentQuestionIndex]?.questionId?._id,
        index: currentQuestionIndex,
      };
      const response = await submitGame1Answer(JSON.stringify(payload));

      if (response?.success === true) {
        setUserAnswer("");
        if (currentQuestionIndex === playerData?.length - 1) {
          localStorage.removeItem(`currentQuestionIndex_${levelNumber}`);
          navigate("/game1result");
        } else {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setTimeLeft(180); // Reset timer
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(
        "There was an error while submitting your answer. Please try again."
      );
    }
  };

  const handleBack = () => {
    navigate("/game1players"); // Implement your back navigation logic here
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
  const UserTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          <div className="">
            <span className="text-white" style={{ fontSize: "1.1rem" }}>
              {minutes}
            </span>
            <span className="text-white" style={{ fontSize: "1.1rem" }}>
              :
            </span>
          </div>
          <div className="">
            <span className="text-white" style={{ fontSize: "1.1rem" }}>
              {seconds < 10 ? "0" : ""}
              {seconds}
            </span>
          </div>
        </div>
      </>
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

  // Timer Effect (starts after countdown reaches 0)
  useEffect(() => {
    if (countdown === 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            handleNextQuestion();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [countdown, currentQuestionIndex]);

  // Load level and player type from localStorage
  useEffect(() => {
    const level = localStorage.getItem("levelNumber");
    const player = localStorage.getItem("playerType");

    if (level && player) {
      setLevelNumber(level);
      setPlayerType(player);
    }
  }, []);

  // Load questions for multiplayer from the server
  useEffect(() => {
    if (levelNumber && playerType) {
      const payload = {
        level: levelNumber,
      };

      const apiCall = getQuestionsForLevel;
      apiCall(payload)
        .then((data) => {
          if (data?.status === true) {
            setPlayerData(data.formattedQuestions);
          }
        })
        .catch((error) => {
          console.error("Error during API call:", error);
          toast.error("An error occurred. Please try again.");
        });
    }
  }, [levelNumber, playerType]);

  // Timer to save the current question index on every change
  useEffect(() => {
    if (levelNumber) {
      const savedIndex = localStorage.getItem(
        `currentQuestionIndex_${levelNumber}`
      );
      setCurrentQuestionIndex(savedIndex ? parseInt(savedIndex, 10) : 0);
    }
  }, [levelNumber]);

  // Save the currentQuestionIndex to localStorage whenever it updates
  useEffect(() => {
    if (levelNumber !== null) {
      localStorage.setItem(
        `currentQuestionIndex_${levelNumber}`,
        currentQuestionIndex
      );
    }
  }, [currentQuestionIndex, levelNumber]);

  return (
    <div className="Game1-bg2">
      <img src={logo} className="mnc-logo" />
      <img
        src={icon1}
        className="icon6-game1 parallax-layer"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      {/* <div className="players-group">
        <div className="player-1">
          {countdown > 0 && <h6>{countdown}</h6>}
          {countdown === 0 && <h6>{UserTimer(timeLeft)}</h6>}
          <img className="avtar-img" src={img1} alt="Avatar" />
          <h6>Opponent 1</h6>
        </div>
        <div className="player-2">
          {countdown > 0 && <h6>{countdown}</h6>}
          {countdown === 0 && <h6>{UserTimer(timeLeft)}</h6>}
          <img className="avtar-img" src={img1} alt="Avatar" />
          <h6>Opponent 2</h6>
        </div>
      </div> */}
      <div className="game1-width">
        <div className="multiple-player-part">
          {countdown > 0 && (
            <div className="countdown">
              <h2 style={{ fontSize: "130px" }}> {countdown}</h2>
            </div>
          )}
          {countdown === 0 && <p className="timer">{formatTime(timeLeft)}</p>}
          <div className="questions-game1">
            <div className="question-box">
              <h4>
                Question {currentQuestionIndex + 1} {"-"}
              </h4>
              <p>{playerData[currentQuestionIndex]?.questionText}</p>
            </div>
            <div className="solution-box">
              <input
                type="text"
                placeholder="Type Your Solution"
                value={userAnswer}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-center">
              {currentQuestionIndex === 0 && (
                <button className="show-btn me-sm-3" onClick={handleBack}>
                  Back
                </button>
              )}
              {currentQuestionIndex < playerData?.length - 1 ? (
                <button className="show-btn" onClick={handleNextQuestion}>
                  Next
                </button>
              ) : (
                <button
                  className="show-btn"
                  onClick={() => navigate("/game1result")}
                >
                  Show Results
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game1MultiPlayer;
