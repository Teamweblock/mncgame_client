import React, { useEffect, useState } from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Assets/gameimages/game3-background.png";

const EndmeetingPage = () => {
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

  // Handle slider change
  const handleSliderChange = (event, newValue, criteria) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [criteria]: newValue,
    }));
  };
  const handleEndMeeting = () => {
    navigate("/game3result"); // Redirect to game3result page when the button is clicked
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Header */}
      <div className="absolute top-8 left-8 text-white text-4xl font-extrabold">
        MNC
      </div>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* Top Row (CEO and CTO) */}
      <div className="grid grid-cols-2 gap-x-10">
        {participants
          .slice(0, 2)
          .map(
            (participant, index) => (
              console.log("participant ", participant),
              (
                <ParticipantCard
                  key={index}
                  role={participant.role}
                  imgSrc={participant.imgSrc}
                  onClick={() => setSelectedParticipant(participant)}
                />
              )
            )
          )}
      </div>

      {/* Middle Row (CHRO, Notification, CFO) */}
      <div className="grid grid-cols-3 items-center gap-x-10 w-full max-w-6xl px-4">
        {/* CHRO */}
        <ParticipantCard
          role={participants[3].role}
          imgSrc={participants[3].imgSrc}
          onClick={() => setSelectedParticipant(participants[3])}
        />

        {/* Notification */}
        <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg text-center">
          <p className="text-gray-900 text-lg font-bold">{currentTopic}</p>
        </div>

        {/* CFO */}
        <div className="justify-self-end">
          <ParticipantCard
            role={participants[2].role}
            imgSrc={participants[2].imgSrc}
            onClick={() => setSelectedParticipant(participants[2])}
          />
        </div>
      </div>

      {/* End Meeting Button */}
      <button
        className="mt-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition shadow-lg"
        onClick={handleEndMeeting} // Navigate on click
      >
        End Meeting
      </button>

      {/* Modal for Selected Participant */}
      {selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 flex relative">
            {/* Close Icon (Top Right) */}
            <button
              onClick={() => setSelectedParticipant(null)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </button>

            {/* Left Column: Role and Profile Picture */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <img
                src={selectedParticipant.imgSrc}
                alt={selectedParticipant.role}
                className="rounded-lg shadow-md w-64 h-64 object-cover"
              />
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {selectedParticipant.role}
              </h2>
            </div>

            {/* Right Column: Criteria and Sliders */}
            <div className="flex-1 px-6">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Evaluation Criteria
              </h3>
              <Box sx={{ width: "100%" }}>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">
                    Creativity & Innovation
                  </p>
                  <Slider
                    value={sliderValues.creativity}
                    onChange={(e, value) =>
                      handleSliderChange(e, value, "creativity")
                    }
                    aria-label="Creativity"
                    valueLabelDisplay="auto"
                    color="secondary"
                  />
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">
                    Strategic Thinking
                  </p>
                  <Slider
                    value={sliderValues.strategicThinking}
                    onChange={(e, value) =>
                      handleSliderChange(e, value, "strategicThinking")
                    }
                    aria-label="Strategic Thinking"
                    valueLabelDisplay="auto"
                    color="primary"
                  />
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">
                    Fundamental Skills
                  </p>
                  <Slider
                    value={sliderValues.fundamentalSkills}
                    onChange={(e, value) =>
                      handleSliderChange(e, value, "fundamentalSkills")
                    }
                    aria-label="Fundamental Skills"
                    valueLabelDisplay="auto"
                    color="success"
                  />
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">
                    Management Skills
                  </p>
                  <Slider
                    value={sliderValues.managementSkills}
                    onChange={(e, value) =>
                      handleSliderChange(e, value, "managementSkills")
                    }
                    aria-label="Management Skills"
                    valueLabelDisplay="auto"
                    color="warning"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Overall Impact</p>
                  <Slider
                    value={sliderValues.overallImpact}
                    onChange={(e, value) =>
                      handleSliderChange(e, value, "overallImpact")
                    }
                    aria-label="Overall Impact"
                    valueLabelDisplay="auto"
                    color="error"
                  />
                </div>
              </Box>

              <button className="mt-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition shadow-lg">
                End Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Participant Card Component
const ParticipantCard = ({ role, imgSrc, onClick }) => {
  const [isMicOn, setIsMicOn] = useState(true); // State for microphone status
  const [isVideoOn, setIsVideoOn] = useState(true); // State for video status

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center bg-white bg-opacity-50 rounded-lg shadow-xl p-5 w-64 h-64 relative">
        {/* 3 dots bar  */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 rounded-t-lg flex items-center px-3">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div>
          {/* profile pic  */}
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
      </div>
      <h3 className="mt-3 text-2xl font-bold text-center text-white">{role}</h3>
    </div>
  );
};

export default EndmeetingPage;
