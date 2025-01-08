import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { joinmultipleGame } from "../utils/axiosInstance";
import io from "socket.io-client";
import male from "../Assets/images/male.avif";
import female from "../Assets/images/female.avif";
import "../Assets/CSS/Game1/Game1WaitingPage.css"; // CSS applied

const socket = io("http://localhost:8000"); // Update with your backend URL

const Game1WaitingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(120); // Countdown timer
  const [playerId, setPlayerId] = useState("");
  const [queueStatus, setQueueStatus] = useState("Waiting for opponent...");
  const [opponent, setOpponent] = useState(null); // Track opponent status
  const levelNumber = new URLSearchParams(location.search).get("levelNumber");
  const queueStatusRef = useRef(queueStatus);

  // Sync queue status with the ref to avoid stale closures
  useEffect(() => {
    queueStatusRef.current = queueStatus;
  }, [queueStatus]);

  // Handle socket events
  useEffect(() => {
    if (!playerId) return;
    socket.emit("joinQueue", { level: levelNumber, playerId });
    // Handle opponent match found
    const handleStart = ({ roomCode, opponentName }) => {
      console.log("opponentName", opponentName);
      setQueueStatus("Match found! Starting the game...");
      setOpponent({ name: opponentName, avatar: female }); // Assuming opponent avatar is female for now
      setTimeout(() => {
        navigate(
          `/game1multiplayer?roomCode=${roomCode}&levelNumber=${levelNumber}`
        );
      }, 5000);
    };

    // Handle queue timeout or disconnection
    const handleDisconnectMessage = (message) => {
      toast.info(message);
      navigate("/game1multiplelevelpage");
    };

    socket.on("startGame", handleStart);
    socket.on("disconnectMessage", handleDisconnectMessage);

    return () => {
      socket.off("startGame", handleStart);
      socket.off("disconnectMessage", handleDisconnectMessage);
    };
  }, [playerId, levelNumber]);

  // Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          if (queueStatusRef.current === "Waiting for opponent...") {
            socket.emit("leaveQueue", { playerId });
            toast.info("No match found. Returning to level selection.");
            navigate("/game1multiplelevelpage");
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [playerId, navigate]);

  // Cancel button handler
  const handleCancel = () => {
    socket.emit("leaveQueue", { playerId });
    navigate("/game1multiplelevelpage");
  };

  // Format timer (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  // Fetch player ID and join queue
  useEffect(() => {
    const fetchPlayerId = async () => {
      try {
        const payload = { level: levelNumber };
        const response = await joinmultipleGame(JSON.stringify(payload));
        if (response) {
          setPlayerId(response);
        }
      } catch (err) {
        console.error("Error: Unable to join the queue", err);
        toast.error("An error occurred while joining the queue.");
        navigate("/game1multiplelevelpage");
      }
    };

    fetchPlayerId();
    console.log("levelNumber", levelNumber);
  }, [levelNumber]);

  return (
    <div className="waiting-bg">
      {/* Header */}
      <header className="header">
        <h1>Real Time Multiplayer</h1>
        <h2>{queueStatus}</h2>
      </header>

      {/* Game Section */}
      <main className="game-section">
        <div className="player-card">
          <img className="avatar" src={male} alt="Player 1" />
          <p className="player-name">Player 1</p>
        </div>

        <div className="vs-container">
          <p className="vs-text">VS</p>
          <div
            className={`loading-indicator ${opponent ? "hidden" : ""}`}
          ></div>
        </div>

        <div className="player-card">
          <img
            className="avatar"
            src={opponent ? opponent.avatar : female}
            alt={opponent ? opponent.name : "Searching"}
          />
          <p className="player-name">
            {opponent ? opponent.name : "Searching..."}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Time Left: {formatTime(timeLeft)}</p>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </footer>
    </div>
  );
};

export default Game1WaitingPage;
