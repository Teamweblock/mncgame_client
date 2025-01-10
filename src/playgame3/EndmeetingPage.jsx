import React, { useEffect, useState } from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import { TbBulbFilled } from "react-icons/tb";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/gameimages/mnclogo2.png";
import { styled } from "@mui/material/styles";
import { io } from "socket.io-client";
const socket = io(process.env.BACKEND_URL || "http://localhost:8000"); // Update with your backend URL

const EndmeetingPage = () => {
  // Extract roomCode from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get("roomCode");
  const participants = [
    {
      role: "CEO",
      imgSrc:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSSJ5XZT9CbC8XaNbJ1giueOj46hv1rUGzqLVtMAQcWERMEpfna",
    },
    {
      role: "CTO",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZNSRnnQ3cJCuc7Sqf_SKoiW5g9gNYSoHuA&s",
    },
    {
      role: "CFO",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-VY7IowRiyEvHITCtstzz77XjYp9mwPmnQ&s",
    },
    {
      role: "CHRO",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEpNCyrCjDvpPBpWD2lSSX3R4YOQYymoQrndX0hSE94srBk-hl05dy-DrzjuAcKd1dxY&usqp=CAU",
    },
  ];
  const topics = [
    "Your company has experienced a data breach, compromising customer information.",
    "A new competitor has entered the market with a disruptive technology.",
    "Employee satisfaction scores have reached an all-time high.",
    "The latest financial report indicates a significant increase in revenue.",
    "A key client has decided to renew their contract for an extended period.",
    "The company has been shortlisted for a prestigious industry award.",
    "A new government regulation will affect our operations starting next quarter.",
  ];
  const [selectedParticipant, setSelectedParticipant] = useState(null); // State for selected participant
  const [currentTopic, setCurrentTopic] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    creativity: 0,
    strategicThinking: 0,
    fundamentalSkills: 0,
    managementSkills: 0,
    overallImpact: 0,
  });
  const navigate = useNavigate(); // Initialize navigate hook
  // Set a random topic on component mount
  useEffect(() => {
    setCurrentTopic(getRandomTopic());
  }, []);

  const getRandomTopic = () => {
    return topics[Math.floor(Math.random() * topics.length)];
  };

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
    navigate("/game3result");
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  useEffect(() => {
    // Log when the socket is connected
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      if (roomCode) {
        console.log("Room Code from URL:", roomCode);
        socket.emit("joinRoom", roomCode); // Join the room using roomCode
      }
    });

    // Your other code for listening to "newQuestion"
    const meetData = (data) => {
      console.log("Received question:", data.question);
      console.log("Players:", data.players);
    };

    socket.on("newQuestion", meetData);

    // Cleanup
    return () => {
      socket.off("newQuestion", meetData);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center relative endmetting"
      // style={{
      //   backgroundImage: `url('https://img.freepik.com/premium-vector/computer-monitor-is-desk-with-purple-background_889056-205324.jpg?w=1060')`,
      // }}
    >
      {/* Header */}
      {/* <div className="absolute top-8 left-8 text-white text-4xl font-extrabold"> */}
      <img src="/mnclogo2.png" className="top-8 left-8 absolute" />
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
              CEO
            </div>
          </DialogTitle>
          <DialogContent>
            <div style={{ textAlign: "center" }}>
              <b>About the role</b>
            </div>
            <p style={{ textAlign: "center" }}>
              As CEO, you must lead the crisis management team. communicate
              <br />
              transparently with customers, coordinate with legal and IT
              departments,
              <br />
              and implement stronger data security measures.
            </p>
            <div style={{ textAlign: "center" }}>
              <b>Problem</b>
            </div>
            <p style={{ textAlign: "center" }}>
              What immediate action do you take to manage the situation and
              restore
              <br />
              customer trust?
            </p>
          </DialogContent>
        </div>
      </Dialog>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* Top Row (CEO and CTO) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-6xl px-4">
        {participants.slice(0, 2).map((participant, index) => (
          <ParticipantCard
            key={index}
            role={participant.role}
            imgSrc={participant.imgSrc}
            onClick={() => setSelectedParticipant(participant)}
          />
        ))}
      </div>

      {/* Middle Row (CHRO, Notification, CFO) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl px-4 justify-center items-stretch ">
        <ParticipantCard
          role={participants[3].role}
          imgSrc={participants[3].imgSrc}
          onClick={() => setSelectedParticipant(participants[3])}
        />
        <div className="bg-white bg-opacity-90 h-fit rounded-xl shadow-lg text-center self-end mb-5">
          <p className="text-gray-900 text-lg font-bold px-2">{currentTopic}</p>
        </div>
        <ParticipantCard
          role={participants[2].role}
          imgSrc={participants[2].imgSrc}
          onClick={() => setSelectedParticipant(participants[2])}
        />
      </div>

      {/* End Meeting Button */}
      <button
        className="mt-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
        onClick={handleEndMeeting}
      >
        End Meeting
      </button>

      {/* Modal for Selected Participant */}
      {selectedParticipant && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 m-2">
          <div className="backdrop-blur-xl bg-white/80 rounded-lg shadow-lg w-full max-w-4xl p-8 flex flex-col md:flex-row relative">
            <button
              onClick={() => setSelectedParticipant(null)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </button>

            {/* Image Section */}
            <div className="flex-1 flex flex-col items-center justify-center md:mb-0">
              <img
                src={selectedParticipant.imgSrc}
                alt={selectedParticipant.role}
                className="rounded-lg shadow-md w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-black"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
                {selectedParticipant.role}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ParticipantCard = ({ role, imgSrc, onClick }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div
      className="flex flex-col items-center cursor-pointer "
      onClick={onClick}
    >
      <div className="flex flex-col items-center bg-white bg-opacity-50 rounded-lg shadow-xl p-5 w-64 h-64 relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 rounded-t-lg flex items-center px-3">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <img
          src={imgSrc}
          alt={role}
          className="rounded-full w-36 h-36 mb-4 border-4 border-gray-200 shadow-md"
        />
        <div className="absolute bottom-3 right-3 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMicOn(!isMicOn);
            }}
            className="p-1 bg-white rounded-full shadow-md"
          >
            {isMicOn ? (
              <Mic className="h-5 w-5 text-green-600" />
            ) : (
              <MicOff className="h-5 w-5 text-red-600" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOn(!isVideoOn);
            }}
            className="p-1 bg-white rounded-full shadow-md"
          >
            {isVideoOn ? (
              <Video className="h-5 w-5 text-green-600" />
            ) : (
              <VideoOff className="h-5 w-5 text-red-600" />
            )}
          </button>
        </div>
      </div>
      <h3 className="mt-3 text-2xl font-bold text-center text-white">{role}</h3>
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

// import React, { useEffect, useState } from "react";
// import { Mic, MicOff, Video, VideoOff } from "lucide-react";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";

// const EndmeetingPage = () => {
//   const participants = [
//     {
//       role: "CEO",
//       imgSrc:
//         "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSSJ5XZT9CbC8XaNbJ1giueOj46hv1rUGzqLVtMAQcWERMEpfna",
//     },
//     {
//       role: "CTO",
//       imgSrc:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZNSRnnQ3cJCuc7Sqf_SKoiW5g9gNYSoHuA&s",
//     },
//     {
//       role: "CFO",
//       imgSrc:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-VY7IowRiyEvHITCtstzz77XjYp9mwPmnQ&s",
//     },
//     {
//       role: "CHRO",
//       imgSrc:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEpNCyrCjDvpPBpWD2lSSX3R4YOQYymoQrndX0hSE94srBk-hl05dy-DrzjuAcKd1dxY&usqp=CAU",
//     },
//   ];
//   const topics = [
//     "Your company has experienced a data breach, compromising customer information.",
//     "A new competitor has entered the market with a disruptive technology.",
//     "Employee satisfaction scores have reached an all-time high.",
//     "The latest financial report indicates a significant increase in revenue.",
//     "A key client has decided to renew their contract for an extended period.",
//     "The company has been shortlisted for a prestigious industry award.",
//     "A new government regulation will affect our operations starting next quarter.",
//   ];

//   const [selectedParticipant, setSelectedParticipant] = useState(null); // State for selected participant
//   const [currentTopic, setCurrentTopic] = useState("");
//   const [sliderValues, setSliderValues] = useState({
//     creativity: 0,
//     strategicThinking: 0,
//     fundamentalSkills: 0,
//     managementSkills: 0,
//     overallImpact: 0,
//   });
//   const navigate = useNavigate(); // Initialize navigate hook
//   // Set a random topic on component mount
//   useEffect(() => {
//     setCurrentTopic(getRandomTopic());
//   }, []);

//   const getRandomTopic = () => {
//     return topics[Math.floor(Math.random() * topics.length)];
//   };

//   // Handle slider change
//   const handleSliderChange = (event, newValue, criteria) => {
//     setSliderValues((prevValues) => ({
//       ...prevValues,
//       [criteria]: newValue,
//     }));
//   };
//   const handleEndMeeting = () => {
//     navigate("/game3result"); // Redirect to game3result page when the button is clicked
//   };
//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex flex-col items-center relative"
//       style={{
//         backgroundImage: `url('https://img.freepik.com/premium-vector/computer-monitor-is-desk-with-purple-background_889056-205324.jpg?w=1060')`,
//       }}
//     >
//       {/* Header */}
//       <div className="absolute top-8 left-8 text-white text-4xl font-extrabold">
//         MNC
//       </div>

//       {/* Spacer */}
//       <div className="h-32"></div>

//       {/* Top Row (CEO and CTO) */}
//       <div className="grid grid-cols-2 gap-x-10">
//         {participants.slice(0, 2).map((participant, index) => (
//           <ParticipantCard
//             key={index}
//             role={participant.role}
//             imgSrc={participant.imgSrc}
//             onClick={() => setSelectedParticipant(participant)}
//           />
//         ))}
//       </div>

//       {/* Middle Row (CHRO, Notification, CFO) */}
//       <div className="grid grid-cols-3 items-center gap-x-10 w-full max-w-6xl px-4">
//         {/* CHRO */}
//         <ParticipantCard
//           role={participants[3].role}
//           imgSrc={participants[3].imgSrc}
//           onClick={() => setSelectedParticipant(participants[3])}
//         />

//         {/* Notification */}
//         <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg text-center">
//           <p className="text-gray-900 text-lg font-bold">{currentTopic}</p>
//         </div>

//         {/* CFO */}
//         <div className="justify-self-end">
//           <ParticipantCard
//             role={participants[2].role}
//             imgSrc={participants[2].imgSrc}
//             onClick={() => setSelectedParticipant(participants[2])}
//           />
//         </div>
//       </div>

//       {/* End Meeting Button */}
//       <button
//         className="mt-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition shadow-lg"
//         onClick={handleEndMeeting} // Navigate on click
//       >
//         End Meeting
//       </button>

//       {/* Modal for Selected Participant */}
//       {selectedParticipant && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 flex relative">
//             {/* Close Icon (Top Right) */}
//             <button
//               onClick={() => setSelectedParticipant(null)}
//               className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
//             >
//               <CloseIcon sx={{ fontSize: 30 }} />
//             </button>

//             {/* Left Column: Role and Profile Picture */}
//             <div className="flex-1 flex flex-col items-center justify-center">
//               <img
//                 src={selectedParticipant.imgSrc}
//                 alt={selectedParticipant.role}
//                 className="rounded-lg shadow-md w-64 h-64 object-cover"
//               />
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">
//                 {selectedParticipant.role}
//               </h2>
//             </div>

//             {/* Right Column: Criteria and Sliders */}
//             <div className="flex-1 px-6">
//               <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//                 Evaluation Criteria
//               </h3>
//               <Box sx={{ width: "100%" }}>
//                 <div className="mb-4">
//                   <p className="font-semibold text-gray-700">
//                     Creativity & Innovation
//                   </p>
//                   <Slider
//                     value={sliderValues.creativity}
//                     onChange={(e, value) =>
//                       handleSliderChange(e, value, "creativity")
//                     }
//                     aria-label="Creativity"
//                     valueLabelDisplay="auto"
//                     color="secondary"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <p className="font-semibold text-gray-700">
//                     Strategic Thinking
//                   </p>
//                   <Slider
//                     value={sliderValues.strategicThinking}
//                     onChange={(e, value) =>
//                       handleSliderChange(e, value, "strategicThinking")
//                     }
//                     aria-label="Strategic Thinking"
//                     valueLabelDisplay="auto"
//                     color="primary"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <p className="font-semibold text-gray-700">
//                     Fundamental Skills
//                   </p>
//                   <Slider
//                     value={sliderValues.fundamentalSkills}
//                     onChange={(e, value) =>
//                       handleSliderChange(e, value, "fundamentalSkills")
//                     }
//                     aria-label="Fundamental Skills"
//                     valueLabelDisplay="auto"
//                     color="success"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <p className="font-semibold text-gray-700">
//                     Management Skills
//                   </p>
//                   <Slider
//                     value={sliderValues.managementSkills}
//                     onChange={(e, value) =>
//                       handleSliderChange(e, value, "managementSkills")
//                     }
//                     aria-label="Management Skills"
//                     valueLabelDisplay="auto"
//                     color="warning"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-700">Overall Impact</p>
//                   <Slider
//                     value={sliderValues.overallImpact}
//                     onChange={(e, value) =>
//                       handleSliderChange(e, value, "overallImpact")
//                     }
//                     aria-label="Overall Impact"
//                     valueLabelDisplay="auto"
//                     color="error"
//                   />
//                 </div>
//               </Box>

//               <button className="mt-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition shadow-lg">
//                 End Meeting
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Participant Card Component
// const ParticipantCard = ({ role, imgSrc, onClick }) => {
//   const [isMicOn, setIsMicOn] = useState(true); // State for microphone status
//   const [isVideoOn, setIsVideoOn] = useState(true); // State for video status

//   return (
//     <div
//       className="flex flex-col items-center cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="flex flex-col items-center bg-white bg-opacity-50 rounded-lg shadow-xl p-5 w-64 h-64 relative">
//         <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 rounded-t-lg flex items-center px-3">
//           <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
//           <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
//           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//         </div>
//         <img
//           src={imgSrc}
//           alt={role}
//           className="rounded-full w-36 h-36 mb-4 border-4 border-gray-200 shadow-md"
//         />
//         <div className="absolute bottom-3 right-3 flex space-x-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsMicOn(!isMicOn);
//             }}
//             className="p-1 bg-white rounded-full shadow-md"
//           >
//             {isMicOn ? (
//               <Mic className="h-5 w-5 text-green-600" />
//             ) : (
//               <MicOff className="h-5 w-5 text-red-600" />
//             )}
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsVideoOn(!isVideoOn);
//             }}
//             className="p-1 bg-white rounded-full shadow-md"
//           >
//             {isVideoOn ? (
//               <Video className="h-5 w-5 text-green-600" />
//             ) : (
//               <VideoOff className="h-5 w-5 text-red-600" />
//             )}
//           </button>
//         </div>
//       </div>
//       <h3 className="mt-3 text-2xl font-bold text-center text-white">{role}</h3>
//     </div>
//   );
// };

// export default EndmeetingPage;
