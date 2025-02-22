import React, { useEffect, useState } from "react";
import "../Assets/CSS/Game2/Game2Result.css";
import "ag-charts-enterprise";
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
        const levelScores = response.levelScores || [];
        const scores = levelScores.map((level) => level?.score);
        const singleScore = scores[0] || 0;
        setScore((prevScore) =>
          prevScore !== singleScore ? singleScore : prevScore
        );
      } else {
        toast.error("Failed to fetch results. Please try again.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("There was an error while fetching data. Please try again.");
    }
  };

  useEffect(() => {
    const storedLevel = localStorage.getItem("levelNumber");
    if (storedLevel) {
      setLevelNumber(storedLevel);
    }
  }, []);

  useEffect(() => {
    if (levelNumber) {
      handlegetresult();
    }
  }, [levelNumber]);

  const handleHome = () => {
    navigate("/");
  };

  const selectLevelPage = () => {
    const maxLevel = 10;
    const newLevelNumber = Number(levelNumber) + 1;

    if (newLevelNumber >= 4) {
      alert("You have not moved to the next level.");
      return;
    }
    if (newLevelNumber >= maxLevel) {
      alert("You've reached the maximum level.");
      return;
    }

    localStorage.setItem("levelNumber", newLevelNumber);
    navigate(`/game2question?levelNumber=${newLevelNumber}`);
  };

  return (
    <div className="new-result relative">
      <a href="/">
        <img
          src="/mnclogo2.png"
          onClick={handleHome}
          height={45}
          width={100}
          className="cursor-pointer pb-3 absolute sm:top-[10%] sm:left-[10%] top-[4%] left-[6%] mx-auto"
        />
      </a>
      <div className="flex flex-col justify-center items-center h-screen px-4 sm:px-8">
        <Game2NewResult score={score} levelNumber={levelNumber} />
        <h2 className="text-white">WELL DONE</h2>
        <h1 className="text-white font-extrabold tracking-widest">SCORE</h1>
        <div className="pt-10 gap-3 flex flex-col sm:flex-row items-center sm:gap-5">
          <button
            className="btnhome transition duration-700 delay-400 px-6 py-2 text-sm sm:text-base"
            onClick={handleHome}
          >
            Home
          </button>
          <button
            className="btnhome transition duration-700 delay-400 px-6 py-2 text-sm sm:text-base"
            onClick={selectLevelPage}
          >
            Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game2Result;
