import React, { useContext, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import { TbBulbFilled } from "react-icons/tb";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { updateProgress } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { VideoStream } from "./VideoStream.jsx";
import { SocketContext } from "../SocketContext.js";
const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

const EndmeetingPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate(); // Initialize navigate hook
  const hasJoinedRoom = useRef(false);
  // Extract roomCode from the URL
  const socket = useContext(SocketContext);
  const [roomCode, setRoomCode] = useState(urlParams.get("roomCode"));
  const [storedRole, setstoredRole] = useState(localStorage.getItem("role"));
  const [players, setPlayers] = useState([]);
  const [currentRoleDetails, setCurrentRoleDetails] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null); // State for selected participant
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [currentTopic, setCurrentTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    creativity: 0,
    strategicThinking: 0,
    fundamentalSkills: 0,
    managementSkills: 0,
    overallImpact: 0,
  });

  const handleSliderChange = (event, newValue, criteria) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [criteria]: newValue,
    }));
  };

  const getColor = (key) => {
    const value = sliderValues[key];
    if (value < 20) return "#FFC400";
    if (value < 40) return "#2AC6BA";
    if (value < 60) return "#FF0969";
    if (value < 80) return "#52B1EB";
    if (value < 90) return "#7C68C5";
    return "error"; // Red
  };

  const getTextColorClass = (key) => {
    const value = sliderValues[key];
    if (value < 20) return "text-[#FFC400]";
    if (value < 40) return "text-[#2AC6BA]";
    if (value < 60) return "text-[#FF0969]";
    if (value < 80) return "text-[#52B1EB]";
    if (value < 90) return "text-[#7C68C5]";
    return "text-red-500"; // Red
  };

  const handleEndMeeting = () => {
    if (socket) {
      socket.emit("gameOver", { roomCode }); // Emit gameOver event
      socket.emit("disconnectRoom", { roomCode }); // Emit disconnect event for the group
    }

    // navigate(`/game3result?roomCode=${roomCode}`);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSaveProgress = async (role) => {
    try {
      const payload = {
        // playerId,
        role,
        roomCode,
        progress: sliderValues, // Send all slider values
      };
      const response = await updateProgress(JSON.stringify(payload));
      if (response.status == true) {
        setSelectedParticipant(null);
        setSliderValues({
          creativity: 0,
          strategicThinking: 0,
          fundamentalSkills: 0,
          managementSkills: 0,
          overallImpact: 0,
        });
        console.log("Progress updated successfully!");
      } else {
        console.log("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Error: Unable to save progress", err);
    }
  };

  useEffect(() => {
    if (!roomCode) {
      console.warn("No valid room code found.");
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    if (!hasJoinedRoom.current) {
      console.log("Joining room:", roomCode);
      socket.emit("joinRoom", { roomCode });
      hasJoinedRoom.current = true;
    }

    const handleRoomJoined = (data) => {
      console.log("Rejoined room successfully:", data);
      socket.emit("requestNewQuestion", { roomCode });
    };

    const handleErrorMessage = (error) => {
      console.error("Error:", error);
      localStorage.removeItem("roomCode");
    };

    const handleNewQuestion = ({ question, players }) => {
      if (question?.Situation && players) {
        const formattedPlayers = players.map((player) => ({
          id: player?.sessionId,
          name: `${player?.playerId?.firstName} ${player?.playerId?.lastName}`,
          role: player?.levelScores?.role,
          imgSrc: player?.playerId?.avatar,
        }));
        setPlayers(formattedPlayers);
        setQuestion(question);
        setCurrentTopic(question?.Situation);
      } else {
        console.warn("Invalid question or players. Ending game.");
        socket.emit("gameOver", { roomCode });
      }
    };

    const handleGameEnded = ({ message, roomCode }) => {
      console.log(message);
      navigate(`/game3result?roomCode=${roomCode}`);
    };

    // Auto rejoin on reconnect
    socket.on("connect", () => {
      console.log("Reconnected to socket, rejoining room:", roomCode);
      socket.emit("joinRoom", { roomCode });
    });

    // Listeners
    socket.on("roomJoined", handleRoomJoined);
    socket.on("newQuestion", handleNewQuestion);
    socket.on("errorMessage", handleErrorMessage);
    socket.on("gameEnded", handleGameEnded);

    return () => {
      socket.off("roomJoined", handleRoomJoined);
      socket.off("newQuestion", handleNewQuestion);
      socket.off("errorMessage", handleErrorMessage);
      socket.off("gameEnded", handleGameEnded);
    };
  }, [roomCode, navigate, socket]);

  useEffect(() => {
    if (question?.Roledetails?.length) {
      const filteredRole = question.Roledetails.find(
        (role) => role.role === storedRole
      );
      setCurrentRoleDetails(filteredRole);
    }
  }, [question]);

  const handleParticipantClick = (participant) => {
    if (storedRole === participant.role) {
      setErrorMessage(
        "You can only add scores for other members of your group. You cannot add your own score."
      );
    } else {
      setSelectedParticipant(participant);
      setErrorMessage(""); // Clear any previous error message
    }
  };

  const getInitials = (player) => {
    if (!player?.name) return "?"; // Default if name is missing
    const nameParts = player?.name.split(" ");
    return nameParts.length >= 2
      ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
      : nameParts[0].charAt(0).toUpperCase();
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center relative endmetting"
      // style={{
      //   backgroundImage: `url('https://img.freepik.com/premium-vector/computer-monitor-is-desk-with-purple-background_889056-205324.jpg?w=1060')`,
      // }}
    >
      {/* Header */}
      {/* <div className="absolute top-8 left-8 text-white text-4xl font-extrabold"> */}
      <a href="/">
        <img src="/mnclogo2.png" className="top-8 left-8 absolute" />
      </a>
      {/* </div> */}

      {/* Light Bulb Icon */}
      <div className="absolute top-10 right-20">
        <button
          onClick={toggleDialog}
          className="bg-white rounded p-1 shadow-lg hover:shadow-xl transition"
        >
          <TbBulbFilled
            sx={{ color: "#333" }}
            className="h-10 w-10 text-yellow-500"
          />
        </button>
      </div>

      {/* Dialog box */}
      <Dialog
        open={isDialogOpen}
        onClose={toggleDialog}
        sx={{ borderRadius: "40px" }}
      >
        <div
          className="relative"
          style={{
            border: "5px solid #FE00B3",
            borderRadius: "10px",
            padding: "10px",
            margin: "20px",
          }}
        >
          <CloseIcon
            onClick={toggleDialog}
            sx={{
              backgroundColor: "#FE00B3",
              color: "white",
              marginTop: "10px",
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
              fontSize: 30,
            }}
          />
          {currentRoleDetails ? (
            <>
              <DialogTitle>
                <div
                  style={{
                    backgroundColor: "#FE00B3",
                    padding: "3px 10px",
                    borderRadius: "10px",
                    color: "white",
                    textAlign: "center",
                    width: "40%",
                    margin: "0 auto",
                    marginTop: "10px",
                  }}
                >
                  {currentRoleDetails.role}
                </div>
              </DialogTitle>
              <DialogContent>
                <div style={{ textAlign: "center" }}>
                  <b>About the role</b>
                </div>
                <p style={{ textAlign: "center" }}>
                  {currentRoleDetails.About_Role}
                </p>
                <div style={{ textAlign: "center" }}>
                  <b>Problem</b>
                </div>
                <p style={{ textAlign: "center" }}>
                  {currentRoleDetails.Problem}
                </p>
              </DialogContent>
            </>
          ) : (
            <p style={{ textAlign: "center" }}>Role details not found</p>
          )}
        </div>
      </Dialog>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* Top Row (CEO and CTO) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-6xl px-4">
        {players.slice(0, 2).map((participant, index) => (
          <ParticipantCard
            key={index}
            initialGameState={participant} // Use mapped player data
            onClick={() => handleParticipantClick(participant)}
          />
        ))}
      </div>

      {/* Middle Row (CHRO, Notification, CFO) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl px-4 justify-center items-stretch">
        {players[3] && (
          <ParticipantCard
            initialGameState={players[3]}
            onClick={() => handleParticipantClick(players[3])}
          />
        )}
        <div className="bg-white bg-opacity-90 h-fit rounded-xl shadow-lg text-center self-end mb-5">
          <p className="text-gray-900 text-lg font-bold px-2">{currentTopic}</p>
        </div>
        {players[2] && (
          <ParticipantCard
            initialGameState={players[2]}
            onClick={() => handleParticipantClick(players[2])}
          />
        )}
      </div>

      {/* End Meeting Button */}
      <button
        className="mt-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
        onClick={handleEndMeeting}
      >
        End Meeting
      </button>

      {/* Modal for Selected Participant */}
      {selectedParticipant && !errorMessage && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 m-2">
          <div className="backdrop-blur-xl bg-white/80 rounded-lg shadow-lg w-full max-w-4xl p-8 flex flex-col md:flex-row relative">
            <button
              onClick={() => setSelectedParticipant(null)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </button>
            {/* Image Section */}
            <div className="flex-1 flex flex-col items-center justify-center md:mb-0">
              {selectedParticipant?.imgSrc ? (
                <img
                  src={`${API_URL}/${selectedParticipant?.imgSrc?.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={selectedParticipant?.role || "Participant"}
                  className="rounded-lg shadow-md w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-black"
                />
              ) : (
                <div className="w-48 h-48 md:w-64 md:h-64 flex justify-center items-center text-4xl font-bold bg-gray-300 rounded-lg shadow-md border-4 border-black">
                  {getInitials(selectedParticipant)}
                </div>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
                {selectedParticipant?.role || "Unknown Role"}
              </h2>
            </div>
            {/* Slider Section */}
            <div className="flex-1 px-2">
              <Box sx={{ width: "100%" }}>
                {Object.keys(sliderValues).map((key, idx) => (
                  <div key={idx} className="">
                    <p
                      className={`font-semibold text-lg md:text-2xl ${getTextColorClass(
                        key
                      )}`}
                    >
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </p>
                    <PrettoSlider
                      value={sliderValues[key]}
                      onChange={(e, value) => handleSliderChange(e, value, key)}
                      aria-label={key}
                      valueLabelDisplay="on"
                      defaultValue={key}
                      style={{
                        color: getColor(key),
                        // height: window.innerWidth < 768 ? "4px" : "8px",
                      }}
                    />
                  </div>
                ))}
              </Box>
              {/* Save Progress Button */}
              <button
                onClick={() => handleSaveProgress(selectedParticipant?.role)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-600 transition"
              >
                Update Score
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Error Message */}
      {errorMessage && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 m-2">
          <div className="backdrop-blur-xl bg-white/80 rounded-lg shadow-lg w-full max-w-4xl p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {errorMessage}
            </h2>
            <button
              onClick={() => setErrorMessage("")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ParticipantCard = ({ initialGameState, onClick }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const toggleAudio = (e) => {
    e.stopPropagation(); // Prevent opening modal on button click
    setAudioEnabled(!audioEnabled);
    toast({
      title: audioEnabled ? "Audio disabled" : "Audio enabled",
      duration: 2000,
    });
  };

  const toggleVideo = (e) => {
    e.stopPropagation(); // Prevent opening modal on button click
    setVideoEnabled(!videoEnabled);
    toast({
      title: videoEnabled ? "Video disabled" : "Video enabled",
      duration: 2000,
    });
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center bg-white bg-opacity-50 rounded-lg shadow-xl pt-5 w-64 h-64 relative">
        {/* Status indicators */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 rounded-t-lg flex items-center px-3">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div>
          <VideoStream
            key={initialGameState?.id}
            isAudioEnabled={audioEnabled}
            isVideoEnabled={videoEnabled}
            player={initialGameState}
          />
        </div>

        {/* Mic and Video buttons */}
        <div className="absolute bottom-3 right-3 flex space-x-2">
          <button
            onClick={toggleAudio}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {audioEnabled ? (
              <Mic className="h-5 w-5 text-green-600" />
            ) : (
              <MicOff className="h-5 w-5 text-red-600" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {videoEnabled ? (
              <Video className="h-5 w-5 text-green-600" />
            ) : (
              <VideoOff className="h-5 w-5 text-red-600" />
            )}
          </button>
        </div>
      </div>

      {/* Participant Role */}
      <h3 className="mt-3 text-2xl font-bold text-center text-white">
        {initialGameState?.role}({initialGameState?.name})
      </h3>
    </div>
  );
};

export default EndmeetingPage;

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 15,
  "@media (max-width: 768px)": {
    height: 6, // Reduced height for mobile screens
  },
  "& .MuiSlider-track": {
    border: "2px solid black",
    height: 15,
    "@media (max-width: 768px)": {
      height: 6, // Reduced track height for mobile screens
    },
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10,
    background: "unset",
    padding: 0,
    width: 20,
    height: 20,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "black",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
