import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img2 from "../Assets/images/img2 copy.png";
import img3 from "../Assets/images/img3 copy.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import { Check1validlevel } from "../utils/axiosInstance";
import "../Assets/CSS/Game1/Game1Levelpage.css";

const Game1MultipleLevelPage = () => {
  const navigate = useNavigate();
  const [lockedLevels, setLockedLevels] = useState({});
  const [playerType, setPlayerType] = useState(null);

  useEffect(() => {
    const fetchLockedLevels = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching locked levels:", error);
        toast.error("Unable to load level information. Please try again.");
      }
    };
    fetchLockedLevels();
  }, []);

  useEffect(() => {
    const storedPlayerType = localStorage.getItem("playerType");
    if (storedPlayerType) setPlayerType(storedPlayerType);
  }, []);

  const validateLevelSelection = (levelNumber) => {
    if (lockedLevels[`level${levelNumber}`]) {
      toast.error(`Level ${levelNumber} is locked!`);
      return false;
    }
    if (
      !levelNumber ||
      isNaN(levelNumber) ||
      levelNumber < 1 ||
      levelNumber > 10
    ) {
      toast.error("Invalid level selected. Please try again.");
      return false;
    }
    if (levelNumber > 3 && !playerType) {
      toast.error("Please select a valid player type before starting.");
      return false;
    }
    return true;
  };

  const handleLevelClick = async (levelNumber) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(
          "You must be logged in to play! Please log in or register first."
        );
        return navigate("/");
      }

      if (!validateLevelSelection(levelNumber)) return;

      localStorage.setItem("levelNumber", levelNumber);
      const response = await Check1validlevel({
        level: levelNumber,
        playerType,
      });
      if (response) {
        navigate(`/game1waiting?levelNumber=${levelNumber}`);
      }
    } catch (error) {
      console.error("Error during level click:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  // Remove levelNumber from localStorage on initial load
  useEffect(() => {
    const storedlevelNumber = localStorage?.getItem("levelNumber");
    if (storedlevelNumber) {
      localStorage?.removeItem("levelNumber");
      console.log("levelNumber removed from localStorage on first load.");
    }
  }, []);
  return (
    <div className="level-bg">
      <div className="pt-50">
        <a href="/">
          <img src={logo} className="mnc-logo" alt="Logo" />
        </a>
      </div>
      <div className="level-img-div pt-20">
        <h1 className="xl:text-5xl md:text-3xl text-2xl text-white font-bold text-center max-sm:pt-10">
          LEVEL SELECT
        </h1>
        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-2">
          {[...Array(10).keys()].map((level) => {
            const levelNumber = level + 1;
            return (
              <div key={levelNumber} className="m-auto level-container">
                <div className="level-box cursor-pointer">
                  <img
                    className="level-img"
                    src={levelNumber <= 3 ? img2 : img3}
                    alt={`Level ${levelNumber}`}
                    style={{
                      opacity: lockedLevels[`level${levelNumber}`] ? 0.5 : 1,
                    }}
                    onClick={() => handleLevelClick(levelNumber)}
                  />
                  {lockedLevels[`level${levelNumber}`] && (
                    <FaLock className="lock-icon" size={30} />
                  )}
                  <h3
                    className={`level-num-text${
                      levelNumber > 3 ? "2" : ""
                    }  text-[1.2rem] pt-2 font-bold pb-2`}
                  >
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

export default Game1MultipleLevelPage;
