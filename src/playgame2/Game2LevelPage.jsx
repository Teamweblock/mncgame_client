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

  const hadleHome = () => {
    navigate("/");
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
      <div className="pt-20 px-10 flex items-center justify-between w-[90%] mx-auto max-lg:justify-center">
        <a href="/">
          <img src={logo} className="" alt="Logo" />
        </a>
        <button
          className="bg-[#ff5024] text-slate-50 max-lg:hidden hover:bg-white hover:text-[#ff5024] hover:border-[#ff5024] transition delay-300  duration-1000  text-[1.4rem] font-bold rounded-full px-6 py-2 max-md:text-[1.2rem]"
          onClick={hadleHome}
        >
          EXIT TO HOME
        </button>
      </div>
      <div className="level-img-div  w-[95%] mx-auto">
      <div class="w-max mx-auto mt-3">
        <h1 className="xl:text-5xl md:text-3xl text-2xl text-white font-bold text-center max-sm:pt-10 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5">
          SELECT LEVEL 
        </h1>
        </div>
        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-2 pt-6">
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
                    <div className="bg-[#fff2d8] w-12 h-12 rounded-lg flex items-center justify-center absolute top-4 right-2 max-lg:h-8 max-lg:w-8">
                      <img
                        src="./levellock.png"
                        className=" h-8 w-8 max-lg:w-6 max-lg:h-6"
                        alt=""
                      />

                      {/* <FaLock className=" h-6 w-6 max-lg:w-4 max-lg:h-4"  color="#ffbd2c" /> */}
                    </div>
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
        <button
          className="bg-[#ff5024] mx-auto lg:hidden flex justify-center mb-4 text-white text-[1.4rem] font-bold rounded-full px-6 py-2 max-md:text-[1.2rem]"
          onClick={hadleHome}
        >
          EXIT TO HOME
        </button>
      </div>
    </div>
  );
};

export default Game2LevelPage;
