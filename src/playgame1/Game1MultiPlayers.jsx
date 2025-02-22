import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon1.png";
import "../Assets/CSS/Game1/Game1MultiPlayers.css";
import { submitGame1Answer } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { SocketContext } from "../SocketContext.js";

const Game1MultiPlayer = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [userAnswer, setUserAnswer] = useState(""); // To store the input value
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [countdown, setCountdown] = useState(3); // 3-second countdown
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelNumber, setLevelNumber] = useState(
    localStorage.getItem("levelNumber")
  );
  const [playersAnswered, setPlayersAnswered] = useState(0); // To track who has submitted answers
  const [playerData, setPlayerData] = useState([]);
  const [roomCode, setRoomCode] = useState(urlParams.get("roomCode"));
  const [opponentsTimeLeft, setOpponentsTimeLeft] = useState({});

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };
  const handleBack = () => {
    navigate("/game1players"); // Implement your back navigation logic here
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value); // Update the state with input value
  };

  const handleNextQuestion = async () => {
    if (userAnswer.trim() === "") {
      navigate("/game1result");

      // toast.error("Please enter an answer before proceeding.");
      return;
    }

    const payload = {
      level: levelNumber,
      answers: userAnswer,
      questionId:
        playerData[currentQuestionIndex]?.questionId?._id ||
        playerData[currentQuestionIndex]?._id,
      index: currentQuestionIndex,
    };

    try {
      const response = await submitGame1Answer(JSON.stringify(payload));
      if (response?.success === true) {
        setUserAnswer(""); // Reset the answer input
        setPlayersAnswered((prev) => prev + 1); // Increment answered players

        if (playersAnswered === playerData.length) {
          // Move to next question or show results
          if (currentQuestionIndex === playerData?.length - 1) {
            localStorage.removeItem(`currentQuestionIndex_${levelNumber}`);
            navigate("/game1result");
          } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(180); // Reset timer for the next question
            setPlayersAnswered(0); // Reset the answered players counter
          }
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(
        "There was an error while submitting your answer. Please try again."
      );
    }
  };

  const handleStart = ({ question, remainingTime }) => {
    console.log(
      `🔹 Player ${socket.id} requested a new question for room: ${roomCode}`
    );
    console.log("Received new question:", question);
    const questionText = question?.questionId?.question;
    // Reset countdown and timer
    setCountdown(3);
    setTimeout(() => {
      setTimeLeft(remainingTime);
    }, 3000);
    setUserAnswer(""); // Reset the answer input

    // Update player data with the new question
    setPlayerData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentQuestionIndex] = {
        ...updatedData[currentQuestionIndex],
        question: questionText,
      };
      return updatedData;
    });

    console.log("Updated player data:--------------", playerData);
  };

  useEffect(() => {
    if (!roomCode) {
      console.warn("No valid room code found.");
      return;
    }

    console.log("Rejoining room:", roomCode);
    socket.emit("joinlevelRoom", { roomCode });

    const handleRoomJoined = (data) => {
      console.log("Rejoined room successfully:", data);
      socket.emit("requestNewQuestionTimer", { roomCode }); // Auto request a question after joining
    };

    const handleErrorMessage = (error) => {
      localStorage.removeItem("roomCode"); // Remove invalid roomCode
    };
    socket.on("playerStates", (playerDetails) => {
      console.log("Received player states:", playerDetails);

      // Convert playerId to string if needed
      const opponents = playerDetails.filter(
        (p) => p.playerId.toString() !== socket.id
      );

      // Ensure at least two opponents exist before updating state
      setOpponentsTimeLeft({
        opponent1: opponents[0]?.timeLeft ?? 180, // Default to 180 if not available
        opponent2: opponents[1]?.timeLeft ?? 180,
        opponent3: opponents[2]?.timeLeft ?? 180,
      });
    });

    // // Timer countdown
    // const timer = setInterval(() => {
    //   setTimeLeft((prevTime) => {
    //     if (prevTime === 0) {
    //       clearInterval(timer);
    //       handleSubmitAnswer(); // Auto-submit when time runs out
    //       return 0;
    //     }

    //     // Broadcast remaining time to other players
    //     socket.emit("updateTime", { gameId, playerId, timeLeft: prevTime - 1 });
    //     return prevTime - 1;
    //   });
    // }, 1000);

    // // Listen for time updates from other players
    // socket.on("playerTimeUpdate", ({ playerId, timeLeft }) => {
    //   setPlayerTimes((prevTimes) => ({
    //     ...prevTimes,
    //     [playerId]: timeLeft,
    //   }));
    // });

    // // Listen for "moveToScorePage" event
    // socket.on("moveToScorePage", () => {
    //   setCurrentQuestion(currentQuestionIndex + 1); // Move to next question
    // });

    // Attach event listeners
    socket.on("levelroomJoined", handleRoomJoined);
    socket.on("newQuestion", handleStart);
    socket.on("errorMessage", handleErrorMessage);

    // Cleanup listeners when component unmounts or `roomCode` changes
    return () => {
      socket.off("levelroomJoined", handleRoomJoined);
      socket.off("newQuestion", handleStart);
      socket.off("errorMessage", handleErrorMessage);
      socket.off("playerStates");
      // clearInterval(timer);
      // socket.off("playerTimeUpdate");
      // socket.off("moveToScorePage");
    };
  }, [roomCode]);

  // const handleSubmitAnswer = () => {
  //   socket.emit("submitAnswer", {
  //     gameId,
  //     questionIndex: currentQuestionIndex,
  //     answer,
  //   });
  // };

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
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdownRef.current);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0 && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleNextQuestion();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [countdown]);

  useEffect(() => {
    if (levelNumber) {
      const savedIndex = localStorage.getItem(
        `currentQuestionIndex_${levelNumber}`
      );
      setCurrentQuestionIndex(savedIndex ? parseInt(savedIndex, 10) : 0);
    }
  }, [levelNumber]);

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
      <div className="max-lg:flex max-lg:justify-center max-lg:mx-auto">
        <img
          src="/mnclogo2.png"
          className="absolute top-[10%] lg:left-[15%] "
          width={100}
          height={45}
        />
      </div>
      <img
        src={icon1}
        className="icon6-game1 parallax-layer max-md:hidden"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <div className="flex gap-6 items-center justify-end max-md:justify-center max-lg:pt-44 px-10 pt-20">
        <div className="flex flex-col items-center">
          {countdown > 0 && <h6>{countdown}</h6>}
          {countdown === 0 && <h6>{UserTimer(timeLeft)}</h6>}
          <img className="avtar-img" src={img1} alt="Avatar" />
          <h6 className="text-white">Opponent 1</h6>
        </div>
        <div className="flex flex-col items-center">
          {countdown > 0 && <h6>{countdown}</h6>}
          {countdown === 0 && <h6>{UserTimer(timeLeft)}</h6>}
          <img className="avtar-img" src={img1} alt="Avatar" />
          <h6 className="text-white">Opponent 2</h6>
        </div>
      </div>

      <div className=" max-md:w-[90%] w-[70%] mx-auto  max-md:pt-12">
        {/* multiple-player-part */}
        <div className="">
          {countdown > 0 && (
            <div className="countdown">
              <h2> {countdown}</h2>
            </div>
          )}
          {countdown === 0 && <p className="timer">{formatTime(timeLeft)}</p>}
          <div className="">
            <div className="bg-gradient-to-t from-[#37d4f1] via-[#c3f2fb] to-white max-md:w-full text-[17px] md:text-[1.4rem] font-semibold  items-center  rounded-lg text-center md:py-5 max-md:py-3  justify-center">
              <p>{playerData[currentQuestionIndex]?.question}</p>
            </div>

            <textarea
              type="text"
              className="outline-none max-md:py-3 md:py-[35px] w-[90%] flex justify-center mt-10 text-wrap px-1 mx-auto rounded-lg text-center font-bold text-[18px] text-black resize-none overflow-y-auto"
              placeholder="Type Your Solution"
              value={userAnswer} // Bind the input value with state
              onChange={handleInputChange} // Update state when input changes
            />

            <div className="text-center flex gap-2 justify-center flex-wrap pb-4">
              {currentQuestionIndex === 0 && (
                <button
                  className="show-btn me-sm-3 transition duration-700 ease-in-out"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              {currentQuestionIndex < playerData?.length - 1 ? (
                <button
                  className="show-btn transition duration-700 ease-in-out"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              ) : (
                <button
                  className="show-btn text-nowrap transition duration-700 ease-in-out"
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
