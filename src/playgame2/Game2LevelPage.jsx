import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa"; // Import lock icon
import img2 from "../Assets/images/img2 copy.png";
import img3 from "../Assets/images/img3 copy.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../Assets/CSS/Game1/Game1Levelpage.css";
import { toast } from "react-toastify";
import { Check2validlevel } from "../utils/axiosInstance";

const Game2LevelPage = () => {
  const navigate = useNavigate();
  const [lockedLevels, setLockedLevels] = useState({});

  useEffect(() => {
    // Set levels 4-10 as locked
    const initialLockedLevels = {
      level4: true,
      level5: true,
      level6: true,
      level7: true,
      level8: true,
      level9: true,
      level10: true,
    };
    setLockedLevels(initialLockedLevels);
  }, []);

  const handleLevelClick = async (levelNumber) => {
    try {
      const token = localStorage.getItem("token");
      // Check user authentication
      if (!token) {
        alert(
          "You must be logged in to play! Please log in or register first."
        );
        return navigate("/"); // Redirect to the home/login page
      }
      // Check if the level is locked
      if (lockedLevels[`level${levelNumber}`]) {
        alert(`Level ${levelNumber} is locked!`);
        return;
      }
      // Validate level number
      if (
        !levelNumber ||
        isNaN(levelNumber) ||
        levelNumber < 1 ||
        levelNumber > 10
      ) {
        toast.error("Invalid level selected. Please try again.");
        return;
      }

      // Save the selected level in localStorage
      localStorage.setItem("levelNumber", levelNumber);
      // API call to check if the level is valid
      const payload = { level: levelNumber };
      const response = await Check2validlevel(payload);
      if (response) {
        navigate(`/game2question?levelNumber=${levelNumber}`);
      }
    } catch (error) {
      console.error("Error during level click:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="level-bg">
      <div className="pt-50">
        <a href="/">
          <img src={logo} className="mnc-logo" alt="Logo" />
        </a>
      </div>
      <div className="level-img-div">
        <div className="text-center">
          <h1 className="level-text">LEVEL SELECT</h1>
        </div>
        <div className="level-img-grid">
          {[...Array(10).keys()].map((level) => {
            const levelNumber = level + 1;
            return (
              <div key={levelNumber} className="m-auto level-container">
                <div className="level-box">
                  <img
                    className="level-img"
                    src={levelNumber <= 3 ? img2 : img3}
                    alt={`Level ${levelNumber}`}
                    style={{
                      opacity: lockedLevels[`level${levelNumber}`] ? 0.5 : 1, // Apply opacity if locked
                    }}
                    onClick={() => handleLevelClick(levelNumber)} // Add click handler for level selection
                  />
                  {lockedLevels[`level${levelNumber}`] && (
                    <FaLock className="lock-icon" size={40} /> // Lock overlay
                  )}
                  <h3 className={`level-num-text${levelNumber > 3 ? "2" : ""}`}>
                    LEVEL {levelNumber}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Game2LevelPage;
