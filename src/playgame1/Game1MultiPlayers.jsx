import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon1.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import data from "../playgame1/Game1Data"; // Assuming you have a data file with questions
import "../Assets/CSS/Game1/Game1MultiPlayers.css";
import { io } from "socket.io-client";
import { joinMultipleGame } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Game1MultiPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [countdown, setCountdown] = useState(3); // 3-second countdown
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [PlayerData, setPlayerData] = useState(null);
  const [socket, setSocket] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameStatus, setGameStatus] = useState("Playing...");
  const roomCode = new URLSearchParams(location.search).get("roomCode");
  const levelNumber = new URLSearchParams(location.search).get("levelNumber");

  useEffect(() => {
    let playerId;
    // Join the game room
    socket.emit("joinRoom", { roomCode, playerId });
    // Listen for a new question
    socket.on("questionReceived", (data) => {
      setQuestion(data);
      setGameStatus("Playing...");
    });

    // Listen for game over
    socket.on("gameOver", (result) => {
      setGameStatus("Game Over");
      navigate("/gameResult", { state: { result } });
    });

    // Handle opponent disconnection
    socket.on("playerDisconnected", (message) => {
      toast.warn(message.message);
      navigate("/game1levelpage");
    });

    return () => {
      socket.emit("leaveRoom", { roomCode, playerId });
      socket.off("questionReceived");
      socket.off("gameOver");
      socket.off("playerDisconnected");
    };
  }, [roomCode, navigate]);

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

  // const handleNextQuestion = () => {
  //   if (currentQuestionIndex < data.length - 1) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  //     setTimeLeft(180); // Reset timer
  //   } else {
  //     navigate("/game1levelpage?playerType=multiple");
  //   }
  // };

  const handleNextQuestion = async (levelNumber, playerType) => {
    try {
      const payload = { level: levelNumber };
      const apiCall = joinMultipleGame;
      const response = await apiCall(payload);

      if (response?.status === true) {
        setPlayerData(response.formattedQuestions || []);
        if (currentQuestionIndex < data.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setTimeLeft(180); // Reset timer
        } else {
          navigate("/game1levelpage?playerType=multiple");
        }
      } else {
        toast.error("Failed to fetch questions. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Error while fetching questions. Check your connection.");
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

  return (
    <div className="Game1-bg2">
      <img src={logo} className="mnc-logo" />
      <img
        src={icon1}
        className="icon6-game1 parallax-layer"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <div className="players-group">
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
      </div>
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
              <p>{data[currentQuestionIndex].question}</p>
            </div>
            <div className="solution-box">
              <input type="text" placeholder="Type Your Solution" />
            </div>
            <div className="text-center">
              {currentQuestionIndex === 0 && (
                <button className="show-btn me-sm-3" onClick={handleBack}>
                  Back
                </button>
              )}
              {currentQuestionIndex < data.length - 1 ? (
                <button className="show-btn" onClick={handleNextQuestion}>
                  Next
                </button>
              ) : (
                <button
                  className="show-btn"
                  onClick={() => navigate("/game1result")}
                >
                  Show Result
                </button>
              )}

              {/* Conditionally render the Back button for the first question */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game1MultiPlayer;
