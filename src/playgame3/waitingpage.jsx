import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { joinmeetGame } from "../utils/axiosInstance";
import logo from "../Assets/gameimages/mnclogo2.png";
import female from "../Assets/images/female.avif";
import icon1 from "../Assets/gameimages/icon1.png"
import icon2 from "../Assets/gameimages/icon5.png";

const socket = io("http://localhost:8000"); // Update with your backend URL

const MultiplayerWaitingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(120); // Timer starting at 120 seconds
  const [playerId, setPlayerId] = useState("");
  const [players, setPlayers] = useState([]);
  const [queueStatus, setQueueStatus] = useState(
    "WAITING TO CONNECT WITH OTHER PLAYERS ..."
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queueStatusRef = useRef(queueStatus);
  const role = new URLSearchParams(location.search).get("role");
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
    
  useEffect(() => {
    queueStatusRef.current = queueStatus;
  }, [queueStatus]);

  useEffect(() => {
    const fetchPlayerId = async () => {
      try {
        const payload = {};
        const response = await joinmeetGame(JSON.stringify(payload));
        if (response) {
          setPlayerId(response);
        }
      } catch (err) {
        console.error("Error: Unable to join the queue", err);
        setIsDialogOpen(true);
      }
    };

    fetchPlayerId();
  }, [navigate]);

  useEffect(() => {
    if (!playerId) return;

    socket.emit("eventFormeet", { playerId: playerId, role: role });

    const handlePlayersStatus = (playersData) => {
      setPlayers(playersData);
      setQueueStatus(`${playersData.length} player(s) connected...`);
    };

    const handlePlayersReady = (playersData) => {
      setPlayers(playersData);
      if (playersData.every((player) => player.status === "ready")) {
        setQueueStatus("All players are ready! Starting game...");
        setTimeout(() => {
          socket.emit("startGame");
        }, 3000);
      }
    };

    const handleStart = ({ roomCode }) => {
      setQueueStatus("Match found! Starting the game...");
      setTimeout(() => {
        navigate(`/endmeeting?roomCode=${roomCode}`);
      }, 5000);
    };

    const handleDisconnectMessage = () => {
      setIsDialogOpen(true);
    };

    socket.on("playersStatus", handlePlayersStatus);
    socket.on("playersReady", handlePlayersReady);
    socket.on("startGame", handleStart);
    socket.on("disconnectMessage", handleDisconnectMessage);
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setIsDialogOpen(true);
    });

    return () => {
      socket.off("playersStatus", handlePlayersStatus);
      socket.off("playersReady", handlePlayersReady);
      socket.off("startGame", handleStart);
      socket.off("disconnectMessage", handleDisconnectMessage);
    };
  }, [playerId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsDialogOpen(true);
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          socket.emit("leaveQueue", { playerId });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, playerId]);

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave the queue?")) {
      socket.emit("leaveQueue", { playerId });
      navigate("/chooserole");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col welcomepage-bg3 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between w-[90%] md:w-[70%] mx-auto pt-10">
        <img src={logo} alt="Game Logo" className="h-10 w-auto" />
        <div className="bg-orange-600 text-white text-lg font-bold rounded-full px-6 py-2  md:block hover:bg-orange-700 hover:scale-105 transition-all duration-300 ease-in-out">
  {timeLeft > 0 ? `${formatTime(timeLeft)} LEFT` : "TIME EXPIRED"}
</div>

  <img
          src={icon1}
          className="icon1-game3"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon2}
          className="icon2-game3"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        /> 
      </div>

      {/* Players Grid */}
      <div className="flex-1 flex flex-col justify-center items-center mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] md:w-[70%]">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-white rounded-3xl shadow-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div
                className={`border-[4px] rounded-3xl p-4 w-full ${
                  player.status === "ready"
                    ?  "border-[#00FF00]"
                    :  "border-[#FF0000]"
                }`}
              >
                {/* Player Avatar */}
                <img
                  src={player.imgSrc || female}
                  alt={`${player.name}'s Avatar`}
                  className="h-[100px] w-[100px] object-cover rounded-full mx-auto"
                />

                {/* Player Name */}
                <p className="text-[1.2rem] font-bold text-gray-800 text-center mt-4">
                  {player.name}
                </p>

                {/* Player Role */}
               
                <p
                  className={`text-5xl font-bold text-center mt-2 ${
                    player.status === "ready"
                      ? "text-[#00FF00]"
                      : player.status === "waiting"
                      ? "text-[#FF0000]"
                      : "text-gray-500"
                  }`}
                  style={{fontFamily: "Bebas Neue", verticalAlign: "Cap height"}}
                >
                  {player.role}
                </p>

                {/* Player Status */}
                <div
                  className={`mt-4 text-center text-white font-bold py-2 px-6 rounded-full ${
                    player.status === "ready" ? "bg-[#00FF00]" : "bg-[#FF0000]"
                  }`}
                >
                  {player.status === "ready" ? "Ready" : "Waiting"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Queue Status */}
        <p className="text-[1.4rem] font-bold text-center w-[90%] md:w-[70%] mx-auto mt-10">
          {queueStatus}
        </p>

        {/* Cancel Button */}
        <button
          className="bg-red-600 text-white text-xl font-bold rounded-full px-6 py-3 mt-8 hover:bg-red-700 hover:shadow-lg hover:scale-105 transition-transform"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
<div className="absolute bottom-8 right-8 text-white">
          <p className="text-sm tracking-widest">
            MULTI <span className="">NETWORKING COMPANY</span>
          </p>
        </div>
      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-yellow-500 p-6 shadow-lg max-w-sm w-full outline outline-4 outline-yellow-500 relative rounded-lg">
            <div className="absolute inset-0 m-[10px] border-4 border-white rounded-xl pointer-events-none"></div>
            <h2 className="text-white text-xl font-bold mb-4 leading-relaxed text-center relative z-10 mt-6">
            LOOKS LIKE WE COULDN'T <br /> FIND A MATCH <br /> TRY AGAIN FOR A BETTER <br /> SHOT!
            </h2>
            <div className="text-center relative z-20">
              <button
                className="mt-[-3px] bg-white text-yellow-500 font-bold px-6 py-3 w-72 rounded-full shadow-md hover:bg-yellow-100 transition-all transform hover:scale-110 hover:shadow-lg hover:translate-y-[-4px]"
                onClick={() => {
                  setIsDialogOpen(false);
                  navigate("/chooserole");
                }}
              >
                OKAY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplayerWaitingPage;




// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { joinmeetGame } from "../utils/axiosInstance";
// import io from "socket.io-client";
// import logo from "../Assets/gameimages/mnclogo2.png";
// import female from "../Assets/images/female.avif";
// // import logo from "../Assets/images/"
// // import logo from "../Assets/gameimages/mnclogo2.png"
// // import icon1 from "../Assets/gameimages/icon1.png"
// // import icon2 from "../Assets/gameimages/icon5.png";

// const socket = io("http://localhost:8000"); // Update with your backend URL

// const MultiplayerWaitingPage = () => {
//   const navigate = useNavigate();
//   const [timeLeft, setTimeLeft] = useState(120); // Timer starting at 120 seconds
//   const [playerId, setPlayerId] = useState("");
//   const [players, setPlayers] = useState([]);
//   const [queueStatus, setQueueStatus] = useState(
//     "WAITING TO CONNECT WITH OTHER PLAYERS ..."
//   );
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const queueStatusRef = useRef(queueStatus);
//   const role = new URLSearchParams(window.location.search).get("role");

//   useEffect(() => {
//     // Sync queue status with ref to avoid stale closures
//     queueStatusRef.current = queueStatus;
//   }, [queueStatus]);

//   // Fetch player ID and join queue
//   useEffect(() => {
//     const fetchPlayerId = async () => {
//       try {
//         const payload = {};
//         const response = await joinmeetGame(JSON.stringify(payload));
//         if (response) {
//           setPlayerId(response);
//         }
//       } catch (err) {
//         console.error("Error: Unable to join the queue", err);
//         setIsDialogOpen(true)
//         // toast.error("An error occurred while joining the queue.");
//         navigate("/chooserole");
//       }
//     };

//     fetchPlayerId();
//   }, [navigate]);

//   // Handle socket events
//   useEffect(() => {
//     if (!playerId) return;

//     socket.emit("eventFormeet", { playerId: playerId, role: role });

//     const handlePlayersStatus = (playersData) => {
//       console.log("playersData", playersData);

//       setPlayers(playersData);
//       if (playersData?.length === 1) {
//         setQueueStatus("1 player connected...");
//       } else if (playersData?.length === 2) {
//         setQueueStatus("2 players connected...");
//       } else if (playersData?.length === 3) {
//         setQueueStatus("3 players connected...");
//       } else if (playersData?.length === 4) {
//         setQueueStatus("4 players connected...");
//       }
//     };

//     const handlePlayersReady = (playersData) => {
//       setPlayers(playersData);
//       console.log("playersData", playersData);

//       if (playersData.every((player) => player.status === "ready")) {
//         setQueueStatus("All players are ready! Starting game...");
//         setTimeout(() => {
//           socket.emit("startGame");
//         }, 3000);
//       }
//     };

//     const handleStart = ({ roomCode }) => {
//       setQueueStatus("Match found! Starting the game...");
//       setTimeout(() => {
//         navigate(`/endmeeting?roomCode=${roomCode}`);
//       }, 5000);
//     };

//     const handleDisconnectMessage = (message) => {
//       toast.info(message);
//       navigate("/chooserole");
//     };

//     socket.on("playersStatus", handlePlayersStatus);
//     socket.on("playersReady", handlePlayersReady);
//     socket.on("startGame", handleStart);
//     socket.on("disconnectMessage", handleDisconnectMessage);
//     socket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err);
//       toast.error("Connection lost. Please try again.");
//       navigate("/chooserole");
//     });

//     return () => {
//       socket.off("playersStatus", handlePlayersStatus);
//       socket.off("playersReady", handlePlayersReady);
//       socket.off("startGame", handleStart);
//       socket.off("disconnectMessage", handleDisconnectMessage);
//     };
//   }, [playerId, navigate]);

//   // Countdown timer
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     // if (timeLeft <= 0) {
//     //   socket.emit("leaveQueue", { playerId }); // Automatically leave the queue after timeout
//     //   return;
//     // }
//     const countdown = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(countdown);
//           if (
//             queueStatusRef.current ===
//             "WAITING TO CONNECT WITH OTHER PLAYERS ..."
//           ) {
//             socket.emit("leaveQueue", { playerId });
//             setIsDialogOpen(true);
            
//             // toast.info("No match found. Returning to level selection.");
//             navigate("/chooserole");
//           }
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, [timeLeft, playerId, navigate]);

//   const handleCancel = () => {
//     if (window.confirm("Are you sure you want to leave the queue?")) {
//       socket.emit("leaveQueue", { playerId });
//       navigate("/chooserole");
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="min-h-screen flex flex-col welcomepage-bg3 text-gray-900">
      //  {/* <img
      //     src={icon1}
      //     className="icon1-game3"
      //     style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      //   />
      //   <img
      //     src={icon2}
      //     className="icon2-game3"
      //     style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      //   /> */}

//       {/* Header */}
//       <div className="flex items-center justify-between w-[90%] md:w-[70%] mx-auto pt-10">
//         <img src={logo} alt="Game Logo" className="h-10 w-auto" />
//         <div className="bg-orange-600 text-white text-lg font-bold rounded-full px-6 py-2 hidden md:block">
//           {timeLeft > 0 ? `${formatTime(timeLeft)} LEFT` : "TIME EXPIRED"}
//         </div>
//       </div>

//       {/* Players Grid */}
//       <div className="flex-1 flex flex-col justify-center items-center mt-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] md:w-[70%]">
//           {players.map((player) => (
//             <div
//               key={player.id}
//               className="bg-white rounded-3xl shadow-lg p-2 flex flex-col items-center"
//             >
//               <div
//                 className={`border-[4px] rounded-3xl p-4 w-full ${
//                   player.status === "ready"
//                     ? "border-[#00FF00]"
//                     : "border-red-500"
//                 }`}
//               >
//                 {/* Player Avatar */}
//                 <img
//                   src={
//                     player.imgSrc ||
//                     "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSSJ5XZT9CbC8XaNbJ1giueOj46hv1rUGzqLVtMAQcWERMEpfna"
//                   }
//                   alt={`${player.name}'s Avatar`}
//                   className="h-[100px] w-[100px] object-cover rounded-full mx-auto"
//                 />

//                 {/* Player Name */}
//                 <p className="text-[1.2rem] font-bold text-gray-800 text-center mt-4">
//                   {player.name}
//                 </p>

//                 {/* Player Role */}
//                 <p
//                   className={`text-5xl font-bold text-center mt-2 ${
//                     player.status === "ready"
//                       ? "text-[#00FF00]"
//                       : player.status === "waiting"
//                       ? "text-[#FF0000]"
//                       : "text-gray-500"
//                   }`}
//                   style={{fontFamily: "Bebas Neue", verticalAlign: "Cap height"}}
//                 >
//                   {player.role}
//                 </p>

//                 {/* Player Status */}
//                 <div
//                   className={`mt-4 text-center text-white font-bold py-2 px-6 rounded-full ${
//                     player.status === "ready" ? "bg-[#00FF00]" : "bg-red-500"
//                   }`}
//                 >
//                   {player.status === "ready" ? "Ready" : "Waiting"}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Queue Status */}
//         <p className="text-[1.4rem] font-bold text-center w-[90%] md:w-[70%] mx-auto mt-10">
//           {queueStatus}
//         </p>

//         {/* Cancel Button */}
//         <button
//           className="bg-red-600 text-white text-xl font-bold rounded-full px-6 py-3 mt-8 hover:bg-red-700"
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//       </div>

//       {isDialogOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-yellow-500 p-6 shadow-lg max-w-sm w-full outline outline-4 outline-yellow-500 relative rounded-lg">
//             <div className="absolute inset-0 m-[10px] border-4 border-white rounded-xl pointer-events-none"></div>
//             <h2 className="text-white text-xl font-bold mb-4 leading-relaxed text-center relative z-10 mt-6">
//               LOOKS LIKE WE COULDN'T <br /> FIND A MATCH <br /> TRY AGAIN FOR A BETTER <br /> SHOT!
//             </h2>
//             <div className="text-center relative z-20">
//               <button
//                 className="mt-[-3px] bg-white text-yellow-500 font-bold px-6 py-3 w-72 rounded-full shadow-md hover:bg-yellow-100 transition-all transform hover:scale-110 hover:shadow-lg hover:translate-y-[-4px]"
//                 onClick={() => {
//                   setIsDialogOpen(false); // Close the dialog
//                   navigate("/game1multiplelevelpage"); // Redirect to the 'game1multiplelevelpage'
//                 }}
//               >
//                 OKAY
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="absolute bottom-8 right-8 text-white">
//           <p className="text-sm tracking-widest">
//             MULTI <span className="">NETWORKING COMPANY</span>
//           </p>
//         </div>
//     </div>
//   );
// };

// export default MultiplayerWaitingPage;

// ========================================================================

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import logo from "../Assets/gameimages/mnclogo2.png";

// const MultiplayerWaitingPage = () => {
//   const [timeLeft, setTimeLeft] = useState(120); // Timer starting at 120 seconds
//   const [players, setPlayers] = useState([
//     {
//       id: 1,
//       name: "Player 1",
//       status: "ready",
//       role: "CEO",
//       imgSrc:
//         "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSSJ5XZT9CbC8XaNbJ1giueOj46hv1rUGzqLVtMAQcWERMEpfna",
//     },
//     {
//       id: 2,
//       name: "Player 2",
//       status: "waiting",
//       role: "CFO",
//       imgSrc:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZNSRnnQ3cJCuc7Sqf_SKoiW5g9gNYSoHuA&s",
//     },
//     {
//       id: 3,
//       name: "Player 3",
//       status: "waiting",
//       role: "COO",
//       imgSrc:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-VY7IowRiyEvHITCtstzz77XjYp9mwPmnQ&s",
//     },
//     {
//       id: 4,
//       name: "Player 4",
//       status: "waiting",
//       role: "CTO",
//       imgSrc:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEpNCyrCjDvpPBpWD2lSSX3R4YOQYymoQrndX0hSE94srBk-hl05dy-DrzjuAcKd1dxY&usqp=CAU",
//     },
//   ]);

//   const [queueStatus, setQueueStatus] = useState(
//     "Waiting to connect with other players..."
//   );
//   const navigate = useNavigate(); // Initialize navigate hook

//   useEffect(() => {
//     // Timer countdown logic
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setQueueStatus("Time expired. Please try again.");
//           navigate("/endmeeting"); // Redirect to the end meeting page
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup timer on unmount
//   }, [navigate]);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   const handleCancel = () => {
//     if (window.confirm("Are you sure you want to leave the queue?")) {
//       setQueueStatus("You have left the queue.");
//       setTimeLeft(0); // Stop the timer
//       navigate("/endmeeting"); // Redirect immediately on cancel
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-300 to-blue-400 text-gray-900">
//       {/* Header */}
//       <div className="flex items-center justify-between w-[90%] md:w-[70%] mx-auto pt-10">
//         <img src={logo} alt="Game Logo" className="h-10 w-auto" />
//         <div className="bg-orange-600 text-white text-lg font-bold rounded-full px-6 py-2 hidden md:block">
//           {timeLeft > 0 ? `${formatTime(timeLeft)} LEFT` : "TIME EXPIRED"}
//         </div>
//       </div>

//       {/* Players Grid */}
//       <div className="flex-1 flex flex-col justify-center items-center mt-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] md:w-[70%]">
//           {players.map((player) => (
//             <div
//               key={player.id}
//               className="bg-white rounded-3xl shadow-lg p-2 flex flex-col items-center"
//             >
//               <div
//                 className={`border-[4px] rounded-3xl p-4 w-full ${
//                   player.status === "ready"
//                     ? "border-green-500"
//                     : "border-red-500"
//                 }`}
//               >
//                 {/* Player Avatar */}
//                 <img
//                   src={player.imgSrc}
//                   alt={`${player.name}'s Avatar`}
//                   className="h-[100px] w-[100px] object-cover rounded-full mx-auto"
//                 />

//                 {/* Player Name */}
//                 <p className="text-[1.2rem] font-bold text-gray-800 text-center mt-4">
//                   {player.name}
//                 </p>

//                 {/* Player Role */}
//                 <p
//                   className={`text-[1.5rem] font-extrabold text-center mt-2 ${
//                     player.status === "ready"
//                       ? "text-green-500"
//                       : player.status === "waiting"
//                       ? "text-red-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {player.role}
//                 </p>

//                 {/* Player Status */}
//                 <div
//                   className={`mt-4 text-center text-white font-bold py-2 px-6 rounded-full ${
//                     player.status === "ready" ? "bg-green-500" : "bg-red-500"
//                   }`}
//                 >
//                   {player.status === "ready" ? "Ready" : "Waiting"}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Queue Status */}
//         <p className="text-[1.4rem] font-bold text-center w-[90%] md:w-[70%] mx-auto mt-10">
//           {queueStatus}
//         </p>

//         {/* Cancel Button */}
//         <button
//           className="bg-red-600 text-white text-xl font-bold rounded-full px-6 py-3 mt-8 hover:bg-red-700"
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MultiplayerWaitingPage;
