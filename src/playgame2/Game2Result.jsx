import React, { useEffect, useState } from "react";
import "../Assets/CSS/Game2/Game2Result.css"; // Custom styles
import "ag-charts-enterprise"; // Required for enterprise features
import { toast } from "react-toastify";
import { get2GameResult } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Game2NewResult from "./Game2NewResult";
import logo from "../Assets/gameimages/mnclogo2.png";

const Game2Result = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [levelNumber, setLevelNumber] = useState(null);

  // Fetch the result from the API
  const handlegetresult = async () => {
    try {
      const payload = { level: levelNumber };
      const response = await get2GameResult(JSON.stringify(payload));

      if (response) {
        // Extract the scores from levelScores
        const levelScores = response.levelScores || []; // Ensure it exists
        const scores = levelScores.map((level) => level?.score);
        const singleScore = scores[0] || 0; // Fallback to 0 if scores array is empty
        setScore(singleScore);
      } else {
        toast.error("Failed to fetch results. Please try again.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("There was an error while fetching data. Please try again.");
    }
  };

  // Prevent memory leaks
  useEffect(() => {
    if (levelNumber) {
      handlegetresult(levelNumber);
    }
  }, [levelNumber]);

  useEffect(() => {
    // Get the levelNumber from localStorage
    const storedlevel = localStorage.getItem("levelNumber");
    if (storedlevel) {
      setLevelNumber(storedlevel);
    }
  }, []);
  const handleHome = () => {
    navigate("/");
  };

  const selectLevelPage = () => {
    // Increment the level
    const newLevelNumber = Number(levelNumber) + 1;
    // Store the updated level back in localStorage
    localStorage.setItem("levelNumber", newLevelNumber);
    // Navigate to the new level with updated levelNumber in the URL
    navigate(`/game2levelpage?levelNumber=${newLevelNumber}`);
  };

  const gaugeOptions = {
    type: "radial-gauge",
    value: score, // Set the current score value
    scale: {
      min: 0, // Minimum value for the gauge
      max: 100, // Maximum value for the gauge
    },
    bar: {
      enabled: true, // Enable the bar
      fillMode: "discrete", // Use discrete color segments
      fills: [
        { color: "#ff0000", stop: 20 }, // Red for 0-20
        { color: "#ff6600", stop: 40 }, // Orange for 21-40
        { color: "#ffcc00", stop: 60 }, // Yellow for 41-60
        { color: "#99ff66", stop: 80 }, // Light Green for 61-80
        { color: "#009900", stop: 100 }, // Dark Green for 81-100
      ],
      fillOpacity: 1, // Full opacity for the colors
      stroke: "#000000", // Optional: border color around segments
      strokeWidth: 1, // Optional: border width
    },
    needle: {
      enabled: true, // Enable the needle
      length: "90%", // Needle length
      width: 2, // Needle width
      color: "#000000", // Needle color
    },
    label: {
      format: `${score}%`, // Display the score as a percentage
    },
    segmentation: {
      // enabled: true,
      // interval: {
      //   count: 4,
      // },
      spacing: 2,
    },
  };

  return (
    <div className="new-result ">
         <img
        src={logo}
        
        onClick={handleHome}
        height={45} width={100}
      className="cursor-pointer pb-3 absolute sm:top-[10%] sm:left-[10%] flex justify-center items-center mx-auto top-[4%] left-[6%]"
      />
      <div className="flex  flex-col justify-center items-center  h-screen">

     
   
      <Game2NewResult score={score} levelNumber={levelNumber} />

      {/* Navigation Buttons */}
      <div className="pt-10 sm:gap-5 gap-3 flex  max-sm:flex-col">
        <button className="btnhome" onClick={handleHome}>
          Home
        </button>
        <button className="btnhome" onClick={selectLevelPage}>
          Next Level
        </button>
      </div>
    </div>
    </div>
  );
};

export default Game2Result;
