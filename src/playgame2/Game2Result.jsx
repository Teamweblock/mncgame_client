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
  }, [levelNumber]);
  const handleHome = () => {
    navigate("/");
  };
 
  const selectLevelPage = () => {
    // Define the maximum level number (adjust this as per your requirements)
    const maxLevel = 10;

    // Increment the level
    const newLevelNumber = Number(levelNumber) + 1;

    // Check if the new level number is greater than or equal to 4 or exceeds maxLevel
    if (newLevelNumber >= 4) {
      alert("You have not moved to the next level.");
      return; // Stop further execution
    }
    if (newLevelNumber >= maxLevel) {
      // Show a message if the new level exceeds or is equal to maxLevel
      alert(
        "You have not moved to the next level. You've reached the maximum level."
      );
      return; // Stop further execution
    }
    // Store the updated level back in localStorage
    localStorage.setItem("levelNumber", newLevelNumber);
    // Navigate to the new level with updated levelNumber in the URL

    navigate(`/game2question?levelNumber=${newLevelNumber}`);
  

    // Check if the new level number is greater than or equal to 4 or exceeds maxLevel
    if (newLevelNumber >= 4) {
      alert("You have not moved to the next level.");
      return; // Stop further execution
    }
    if (newLevelNumber >= maxLevel) {
      // Show a message if the new level exceeds or is equal to maxLevel
      alert(
        "You have not moved to the next level. You've reached the maximum level."
      );
      return; // Stop further execution
    }
    // Store the updated level back in localStorage
    localStorage.setItem("levelNumber", newLevelNumber);
    // Navigate to the new level with updated levelNumber in the URL

    navigate(`/game2question?levelNumber=${newLevelNumber}`);
  };
  
  return (
    <div className="new-result relative">
      <img
        src={logo}
        onClick={handleHome}
        height={45}
        width={100}
        className="cursor-pointer pb-3 absolute sm:top-[10%] sm:left-[10%] top-[4%] left-[6%] mx-auto"
      />
      <div className="flex flex-col justify-center items-center h-screen px-4 sm:px-8">
        <Game2NewResult score={score} levelNumber={levelNumber} />
        <h2 className="text-white">WELL DONE</h2>
        <h1 className="text-white font-extrabold tracking-widest">SCORE</h1>
        {/* Navigation Buttons */}
        <div className="pt-10 gap-3 flex flex-col sm:flex-row items-center sm:gap-5">
          <button className="btnhome transition duration-700 delay-400 px-6 py-2 text-sm sm:text-base" onClick={handleHome}>
            Home
          </button>
          <button className="btnhome transition duration-700 delay-400 px-6 py-2 text-sm sm:text-base" onClick={selectLevelPage}>
            Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game2Result;

// import React, { useEffect, useState } from "react";
// import "../Assets/CSS/Game2/Game2Result.css"; // Custom styles
// import "ag-charts-enterprise"; // Required for enterprise features
// import { toast } from "react-toastify";
// import { get2GameResult } from "../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import Game2NewResult from "./Game2NewResult";
// import logo from "../Assets/gameimages/mnclogo2.png";

// const Game2Result = () => {
//   const navigate = useNavigate();
//   const [score, setScore] = useState(0);
//   const [levelNumber, setLevelNumber] = useState(null);

//   // Fetch the result from the API
  // const handlegetresult = async () => {
  //   try {
  //     const payload = { level: levelNumber };
  //     const response = await get2GameResult(JSON.stringify(payload));

  //     if (response) {
  //       // Extract the scores from levelScores
  //       const levelScores = response.levelScores || []; // Ensure it exists
  //       const scores = levelScores.map((level) => level?.score);
  //       const singleScore = scores[0] || 0; // Fallback to 0 if scores array is empty
  //       setScore(singleScore);
  //     } else {
  //       toast.error("Failed to fetch results. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //     toast.error("There was an error while fetching data. Please try again.");
  //   }
  // };

//   // Prevent memory leaks
//   useEffect(() => {
//     if (levelNumber) {
//       handlegetresult(levelNumber);
//     }
//   }, [levelNumber]);

//   useEffect(() => {
//     // Get the levelNumber from localStorage
//     const storedlevel = localStorage.getItem("levelNumber");
//     if (storedlevel) {
//       setLevelNumber(storedlevel);
//     }
//   }, [levelNumber]);
//   const handleHome = () => {
//     navigate("/");
//   };

  // const selectLevelPage = () => {
  //   // Define the maximum level number (adjust this as per your requirements)
  //   const maxLevel = 10;

  //   // Increment the level
  //   const newLevelNumber = Number(levelNumber) + 1;

  //   // Check if the new level number is greater than or equal to 4 or exceeds maxLevel
  //   if (newLevelNumber >= 4) {
  //     alert("You have not moved to the next level.");
  //     return; // Stop further execution
  //   }
  //   if (newLevelNumber >= maxLevel) {
  //     // Show a message if the new level exceeds or is equal to maxLevel
  //     alert(
  //       "You have not moved to the next level. You've reached the maximum level."
  //     );
  //     return; // Stop further execution
  //   }
  //   // Store the updated level back in localStorage
  //   localStorage.setItem("levelNumber", newLevelNumber);
  //   // Navigate to the new level with updated levelNumber in the URL

  //   navigate(`/game2question?levelNumber=${newLevelNumber}`);
  // };

//   return (
//     <div className="new-result ">
//       <img
//         src={logo}
//         onClick={handleHome}
//         height={45}
//         width={100}
//         className="cursor-pointer pb-3 absolute sm:top-[10%] sm:left-[10%] flex justify-center items-center mx-auto top-[4%] left-[6%]"
//       />
//       <div className="flex  flex-col justify-center items-center  h-screen">
//         <Game2NewResult score={score} levelNumber={levelNumber} />

//         {/* Navigation Buttons */}
//         <div className="pt-10 sm:gap-5 gap-3 flex  max-sm:flex-col">
//           <button className="btnhome transition duration-700 delay-400" onClick={handleHome}>
//             Home
//           </button>
//           <button className="btnhome transition duration-700 delay-400" onClick={selectLevelPage}>
//             Next Level
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Game2Result;
