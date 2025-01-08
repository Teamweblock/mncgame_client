import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon1.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import "../Assets/CSS/Game1/Game1MultiPlayers.css";
import {
  getQuestionsFormultipleLevel,
  submitGame1Answer,
} from "../utils/axiosInstance";
import { toast } from "react-toastify";
import socket from "../utils/socket"; // Import the shared socket instance
import { useLocation } from "react-router-dom";

const Game1MultiPlayer = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [userAnswer, setUserAnswer] = useState(""); // To store the input value
  const [levelNumber, setLevelNumber] = useState(null);
  const [playerType, setPlayerType] = useState(null);
  const [playersAnswered, setPlayersAnswered] = useState(0); // To track who has submitted answers
  const [playerData, setPlayerData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // Timer per question
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const roomCode = location.state?.roomCode;
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
        console.log("playersAnswered ---------------", playersAnswered);
        console.log("playerData --------------", playerData?.length);

        if (playersAnswered === playerData?.length) {
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

  // socket.on("playerDisconnected", (data) => {
  //   console.log(data.message);
  //   removeOpponent(data.id);
  // });

  // function removeOpponent(playerId) {
  //   const opponentElements = document.querySelectorAll(".opponent");
  //   opponentElements.forEach((element) => {
  //     if (element.dataset.playerId === playerId) {
  //       element.remove();
  //     }
  //   });
  // }

  // Listen for opponent data
  // socket.on("opponentData", (opponents) => {
  //   console.log("Received opponent data:", opponents);
  //   updateOpponentUI(opponents);
  // });

  // function updateOpponentUI(opponents) {
  //   opponents.forEach((opponent, index) => {
  //     const opponentElement = document.getElementById(`opponent-${index + 1}`);
  //     if (opponentElement) {
  //       opponentElement.querySelector(".opponent-name").textContent =
  //         opponent.name || "Unknown";
  //       opponentElement.querySelector(".opponent-avatar").src =
  //         opponent.avatar || "default-avatar.png";
  //       opponentElement.querySelector(".opponent-status").textContent =
  //         opponent.status || "Unknown";
  //     }
  //   });
  // }

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

  function handleTimeout() {
    console.log("Time is up for this question!");
    socket.emit("timeout", { message: "No answer submitted in time." });
  }

  // Submit an answer
  function submitAnswer(answer) {
    socket.emit("answer", { answer });
  }

  useEffect(() => {
    socket.on("joinRoom", ({ roomCode }) => {
      console.log(`Joined room: ${roomCode}`);
      // Handle room join logic (e.g., UI updates)
    });

    function displayQuestion(question) {
      console.log("Displaying question:", question);
      questionElement = question.question; // Adjust based on the question structure
    }

    function startCountdown(time) {
      console.log(`Starting countdown for ${remainingTime} seconds`);
      const timerElement = document.getElementById("timer");
      let remainingTime = time;

      const countdown = setInterval(() => {
        remainingTime--;
        timerElement = `Time Remaining: ${remainingTime}s`;

        if (remainingTime <= 0) {
          clearInterval(countdown);
          handleTimeout();
        }
      }, 1000);
    }
    // Event: New Question
    const handleNewQuestion = (data) => {
      console.log("data ------------> ", data);

      const { question, remainingTime } = data;
      displayQuestion((prev) => [...prev, question]);
      startCountdown(remainingTime || 180);
    };

    // Event: Player Disconnection
    const handlePlayerDisconnected = (data) => {
      toast.info(`${data.name} disconnected.`);
      setPlayerData((prev) => prev.filter((p) => p.id !== data.id));
    };

    // Attach event listeners
    socket.on("newQuestion", handleNewQuestion);
    socket.on("playerDisconnected", handlePlayerDisconnected);

    return () => {
      // Cleanup listeners and disconnect socket on unmount
      socket.off("newQuestion", handleNewQuestion);
      socket.off("playerDisconnected", handlePlayerDisconnected);
    };
  }, []);

  // Load questions for multiplayer from the server
  // useEffect(() => {
  //   if (levelNumber && playerType) {
  //     const payload = { level: levelNumber };
  //     getQuestionsFormultipleLevel(payload)
  //       .then((data) => {
  //         if (data?.status === true) {
  //           console.log(
  //             "data.formattedQuestions --------------> ",
  //             data.formattedQuestions
  //           );
  //           setPlayerData(data.formattedQuestions);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error during API call:", error);
  //         toast.error("An error occurred. Please try again.");
  //       });
  //   }
  // }, [levelNumber, playerType]);

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
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Load level and player type from localStorage
  useEffect(() => {
    const level = localStorage.getItem("levelNumber");
    const player = localStorage.getItem("playerType");

    if (level && player) {
      setLevelNumber(level);
      setPlayerType(player);
    }
  }, []);

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
      <div className="max-lg:flex max-lg:justify-center max-lg:mx-auto">
        <img
          src={logo}
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
          {countdown === 0 && (
            <div className="timer">{formatTime(timeLeft)}</div>
          )}
          <div className="">
            <div className="bg-gradient-to-t from-[#37d4f1] via-[#c3f2fb] to-white max-md:w-full text-[17px] md:text-[1.4rem] font-semibold  items-center  rounded-lg text-center md:py-5 max-md:py-3  justify-center">
              <p>{playerData[currentQuestionIndex]?.question}</p>
            </div>

            <input
              type="text"
              placeholder="Type Your Solution"
              value={userAnswer}
              onChange={handleInputChange}
              className="outline-none text-wrap max-md:py-3 leading-relaxed md:py-[35px] w-[90%] flex justify-center mt-10   px-2 mx-auto rounded-lg text-center font-bold text-[18px] text-black"
            />

            <div className="text-center flex gap-2 justify-center flex-wrap pb-4">
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
                  className="show-btn text-nowrap"
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
