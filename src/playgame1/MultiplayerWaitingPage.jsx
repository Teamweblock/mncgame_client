import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { joinmultipleGame } from "../utils/axiosInstance";
import logo from "../Assets/gameimages/mnclogo2.png";
import female from "../Assets/images/female.avif";
import socket from "../utils/socket"; // Import the shared socket instance

const MultiplayerWaitingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(120);
  const [playerId, setPlayerId] = useState("");
  const [players, setPlayers] = useState([]);
  const [queueStatus, setQueueStatus] = useState(
    "WAITING TO CONNECT WITH OTHER PLAYERS ..."
  );
  const queueStatusRef = useRef(queueStatus);
  const levelNumber = new URLSearchParams(location.search).get("levelNumber");

  // Sync queue status with ref to avoid stale closures
  useEffect(() => {
    queueStatusRef.current = queueStatus;
  }, [queueStatus]);

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
  }, [levelNumber, navigate]);

  // Handle socket events
  useEffect(() => {
    if (!playerId) return;

    socket.emit("joinQueue", { level: levelNumber, playerId });

    const handlePlayersStatus = (playersData) => {
      console.log("playersData", playersData);

      setPlayers(playersData);
      if (playersData?.length === 1) {
        setQueueStatus("1 player connected...");
      } else if (playersData?.length === 2) {
        setQueueStatus("2 players connected...");
      } else if (playersData?.length === 3) {
        setQueueStatus("3 players connected...");
      }
    };

    const handlePlayersReady = (playersData) => {
      setPlayers(playersData);
      if (playersData.every((player) => player.status === "READY")) {
        setQueueStatus("All players are ready! Starting game...");
        // setTimeout(() => {
        //   socket.emit("startGame");
        // }, 3000);
      }
    };

    const handleStart = ({ roomCode }) => {
      setQueueStatus("Match found! Starting the game...");
      setTimeout(() => {
        navigate(
          `/game1multiplayer?roomCode=${roomCode}&levelNumber=${levelNumber}`
        );
      }, 5000);
    };

    const handleDisconnectMessage = (message) => {
      toast.info(message);
      navigate("/game1multiplelevelpage");
    };

    socket.on("playersStatus", handlePlayersStatus);
    socket.on("playersReady", handlePlayersReady);
    socket.on("startGame", handleStart);

    socket.on("disconnectMessage", handleDisconnectMessage);

    return () => {
      socket.off("playersStatus", handlePlayersStatus);
      socket.off("playersReady", handlePlayersReady);
      socket.off("startGame", handleStart);

      socket.off("disconnectMessage", handleDisconnectMessage);
    };
  }, [playerId, levelNumber, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          if (
            queueStatusRef.current ===
            "WAITING TO CONNECT WITH OTHER PLAYERS ..."
          ) {
            socket.emit("leaveQueue", { playerId });
            toast.info("No match found. Returning to level selection.");
            navigate("/game1multiplelevelpage");
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, playerId, navigate]);

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave the queue?")) {
      socket.emit("leaveQueue", { playerId });
      navigate("/game1multiplelevelpage");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="waiting-page-multi flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between w-[90%] md:w-[70%] mx-auto pt-20 max-lg:pt-10 max-lg:justify-center">
        <img src={logo} alt="Game Logo" height={50} width={120} />
        <button className="bg-orange-500 text-white text-xl font-bold rounded-full px-6 py-2 max-lg:hidden">
          {formatTime(timeLeft)} LEFT
        </button>
      </div>

      {/* Centered Cards and Text */}
      <div className="flex-1 flex flex-col justify-center items-center max-lg:mt-10">
        <div className="grid lg:grid-cols-3 max-lg:gap-2 gap-12 w-[90%] md:w-[65%] grid-cols-2 max-md:flex max-md:flex-wrap justify-center ">
          {players.map((player) => (
            <div
              key={player?.id}
              className="bg-[#fffbdc] rounded-3xl max-sm:w-[170px] max-md:w-[200px]"
            >
              <div
                className="border-[4px] max-lg:mx-2 mx-3 my-3 max-lg:my-2 rounded-3xl"
                style={{
                  borderColor:
                    player.status === "READY" ? "#34fc34" : "#ff142f",
                }}
              >
                <div className="flex flex-col items-center gap-2 my-8 max-lg:my-2">
                  <div>
                    <img
                      src={player?.imgSrc || female}
                      alt={`${player?.name || "Player"}'s Avatar`}
                      className="h-[150px] w-[150px] object-cover max-md:h-[100px] max-md:w-[100px] max-sm:h-[70px] max-sm:w-[70px]"
                    />
                  </div>
                  <p className="text-[1.4rem] max-md:text-[1.1rem] font-bold text-black">
                    {player?.name || "Unknown Player"}
                  </p>
                  <button
                    className={`mx-2 text-white font-bold py-2 px-3 md:px-10 text-lg rounded-full ${
                      player.status === "READY" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {player.status.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[1.6rem] font-bold text-white text-center w-[90%] md:w-[70%] mx-auto mt-5 lg:mt-16 max-md:text-[1.2rem]">
          {queueStatus}
        </p>
        <button
          className="bg-red-600 text-white text-xl font-bold rounded-full px-6 py-3 mt-8"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MultiplayerWaitingPage;
