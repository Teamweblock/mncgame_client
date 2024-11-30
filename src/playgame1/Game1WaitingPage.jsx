import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { joinmultipleGame } from "../utils/axiosInstance";
import "../Assets/CSS/Game1/Game1WaitingPage.css"; // Add necessary styles
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // Replace with your backend URL

const Game1WaitingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(120);
  const [playerId, setPlayerId] = useState("");
  const [queueStatus, setQueueStatus] = useState("Waiting for opponent...");
  const levelNumber = new URLSearchParams(location.search).get("levelNumber");
  const queueStatusRef = useRef(queueStatus);

  useEffect(() => {
    queueStatusRef.current = queueStatus;
  }, [queueStatus]);

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
        navigate("/game1levelpage");
      }
    };

    fetchPlayerId();
  }, [levelNumber, navigate]);

  useEffect(() => {
    if (!playerId) return;

    // Emit joinQueue event
    socket.emit("joinQueue", { level: levelNumber, playerId });
    const handleDisconnectMessage = (message) => {
      toast.info(message);
      navigate("/game1levelpage");
    };

    const handleStart = (roomCode) => {
      console.log("roomCode", roomCode);
      setQueueStatus("Match found! Starting the game...");
      setTimeout(() => {
        navigate(
          `/game1multiplayer?roomCode=${roomCode}&levelNumber=${levelNumber}`
        );
      }, 2000); // Delay to show the message
    };

    socket.on("startGame", handleStart);
    socket.on("disconnectMessage", handleDisconnectMessage);

    // Cleanup socket listeners
    return () => {
      socket.on("startGame", handleStart);
      socket.off("disconnectMessage", handleDisconnectMessage);
    };
  }, [playerId, levelNumber]);

  useEffect(() => {
    // Countdown timer logic
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);

          // Check the current queue status
          if (queueStatusRef.current === "Waiting for opponent...") {
            socket.emit("leaveQueue", { playerId });
            toast.info("No match found. Returning to level selection.");
            navigate("/game1levelpage");
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [playerId, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="waiting-bg">
      <div className="waiting-content">
        <h1>Waiting for an Opponent...</h1>
        <p>Time left: {formatTime(timeLeft)}</p>
        <div className="loading-spinner"></div>
        <button
          className="cancel-button"
          onClick={() => navigate("/game1levelpage")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Game1WaitingPage;
