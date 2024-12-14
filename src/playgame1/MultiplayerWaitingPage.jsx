import logo from "../Assets/gameimages/mnclogo2.png";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { joinmultipleGame } from "../utils/axiosInstance";
import io from "socket.io-client";
import male from "../Assets/images/male.avif";
import female from "../Assets/images/female.avif";
import "../Assets/CSS/Game1/Game1WaitingPage.css"; // CSS applied

const socket = io("http://localhost:8000"); // Update with your backend URL
const players = [
  {
    id: 1,
    name: "Player 1",
    imgSrc: "./profileimg.png",
    borderColor: "#34fc34",
    btn: " Ready",
  },
  {
    id: 2,
    name: "Player 2",
    imgSrc: "./profileimg.png",
    borderColor: "#ff142f",
    btn: "Waiting",
  },
  {
    id: 3,
    name: "Player 3",
    imgSrc: "./profileimg.png",
    borderColor: "#ff142f",
    btn: "Waiting",
  },
];

const MultiplayerWaitingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(120); // Countdown timer
  const [playerId, setPlayerId] = useState("");
  const [queueStatus, setQueueStatus] = useState(
    "WAITING TO CONNECT WITH OTHER PLAYERS ..."
  );
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
  }, [playerId, levelNumber, navigate]);

  // Countdown timer
  useEffect(() => {
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
    <div className="waiting-page-multi  flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between w-[90%] md:w-[70%] mx-auto pt-20 max-lg:pt-10 max-lg:justify-center">
        <img src={logo} alt="Game Logo " height={50} width={120} />
        <button className="bg-[#ff751f] text-white text-[1.4rem] font-bold rounded-full px-6 py-2 max-lg:hidden">
          {formatTime(timeLeft)} LEFT
        </button>
      </div>

      {/* Centered Cards and Text */}
      <div className="flex-1 flex flex-col justify-center items-center max-lg:mt-10">
        <div className="grid  lg:grid-cols-3 max-lg:gap-2 gap-12 w-[90%] md:w-[65%] grid-cols-2 max-md:flex max-md:flex-wrap justify-center ">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-[#fffbdc] rounded-3xl max-sm:w-[170px] max-md:w-[200px]"
            >
              <div
                className="border-[4px] max-lg:mx-2 mx-3 my-3 max-lg:my-2 rounded-3xl"
                style={{ borderColor: player.borderColor }}
              >
                <div className="flex flex-col items-center gap-2 my-8 max-lg:my-2">
                  <div>
                    <img
                      src={player.imgSrc}
                      alt={`${player.name}'s Avatar`}
                      className="h-[150px] w-[150px] object-cover max-md:h-[100px] max-md:w-[100px] max-sm:h-[70px] max-sm:w-[70px]"
                    />
                  </div>
                  <p className="text-[1.4rem] max-md:text-[1.1rem] text-nowrap font-bold text-black">
                    {player.name}
                  </p>
                  <button className="bg-gradient-to-r from-[#8e1fd5] to-[#d535d6] mx-2 text-white font-bold py-2 px-3 md:px-10 hover:scale-105 transform transition duration-200 text-[1.2rem] rounded-full max-sm:text-[14px] text-nowrap">
                    {player.btn.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[1.6rem] font-bold text-white text-center w-[90%] md:w-[70%] mx-auto mt-5 lg:mt-16 max-md:text-[1.2rem]">
          {queueStatus}
        </p>
      </div>
    </div>
  );
};

export default MultiplayerWaitingPage;
