import React, { useState, useEffect } from "react";
import "../Assets/CSS/Game2/Game2Questions.css";
import logo from "../Assets/gameimages/mnclogo2.png";
import icon1 from "../Assets/gameimages/icon1.png";
import icon2 from "../Assets/gameimages/icon4.png";
import { useLocation, useNavigate } from "react-router-dom";
import { get2GameQuestions, submitGame2Answer } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Game2Questions = () => {
  const [levelNumber, setLevelNumber] = useState(null);
  const [playerData, setPlayerData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const totalQuestions = playerData?.length;
  const isQuizEnded = currentIndex >= totalQuestions - 1;
  const location = useLocation();
  const navigate = useNavigate();

  // API call function
  const handleNextClick = async () => {
    // e.preventDefault();
    try {
      if (currentIndex <= playerData?.length - 1) {
        const payload = {
          level: levelNumber,
          answers: selectedOption,
          questionId: playerData[currentIndex]?._id,
          index: currentIndex,
        };

        const response = await submitGame2Answer(JSON.stringify(payload));
        if (response?.success === true) {
          // Check if it's the last question
          if (currentIndex === playerData?.length - 1) {
            setShowResults(true);
            // Clear only the `currentIndex` for the specific `levelNumber`
            localStorage.removeItem(`currentIndex_${levelNumber}`);
            navigate("/game2result");
          } else {
            if (!isQuizEnded) {
              setCurrentIndex((prevIndex) => prevIndex + 1);
              setSelectedOption(null);
              localStorage.removeItem("currentIndex");
            }
          }
        }
      } else {
        alert("Game Over! You have answered all questions.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("There was an error while fetching data. Please try again.");
    }
  };

  // The updated handleLevelClick function
  const handleLevelClick = async (levelNumber) => {
    try {
      // Construct the payload to be sent to the API
      const payload = {
        level: levelNumber,
      };
      const response = await get2GameQuestions(payload);
      if (response?.status === true) {
        setPlayerData(response.formattedQuestions);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

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
  // Load level and player type from query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const level = queryParams.get("levelNumber");

    if (level) {
      setLevelNumber(level);
    }
  }, [location]);

  useEffect(() => {
    if (levelNumber) {
      handleLevelClick(levelNumber);
    }
  }, [levelNumber]);

  useEffect(() => {
    if (levelNumber) {
      const savedIndex = localStorage.getItem(`currentIndex_${levelNumber}`);
      setCurrentIndex(savedIndex ? parseInt(savedIndex, 10) : 0);
    }
  }, [levelNumber]);

  // Save the currentIndex to localStorage whenever it updates
  useEffect(() => {
    if (levelNumber !== null) {
      localStorage.setItem(`currentIndex_${levelNumber}`, currentIndex);
    }
  }, [currentIndex, levelNumber]);
  return (
    <div className="Game2-bg">
      <a href="/">
        <img
          src={logo}
          className="absolute top-[10%] left-[8%] max-md:left-[5%]"
          alt="logo"
          height={45}
          width={100}
        />
      </a>
      <img
        src={icon1}
        className="icon10-game1 parallax-layer"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        alt="icon1"
      />
      <img
        src={icon2}
        className="icon11-game1 parallax-layer max-md:hidden"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        alt="icon2"
      />
      <div className=" w-[80%] mx-auto max-md:w-[90%] pt-20">
        <div className="game2-width">
          <div className="card-container">
            <div className="bg-white px-2 max-md:w-full text-[17px] md:text-[1.4rem] font-semibold  items-center  rounded-lg text-center md:py-10 max-md:py-4  justify-center">
              <p>
                {currentIndex + 1}.{" "}
                {playerData && playerData[currentIndex]
                  ? playerData[currentIndex]?.questionText
                  : "Loading..."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1 pt-10">
              {playerData[currentIndex]?.options?.map((optionText, index) => {
                const optionLetter = String.fromCharCode(65 + index); // Convert index to A, B, C, D
                return (
                  <div
                    key={optionLetter}
                    className={`card-option${
                      index + 1
                    } card-content content${optionLetter} ${
                      selectedOption === optionLetter ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick(optionLetter)}
                  >
                    {/* card-content1 */}
                    <div className="flex items-center justify-start gap-6 absolute left-10">
                      <h2>{optionLetter}.</h2>
                      <div className={`option${optionLetter} pb-2`}>
                        {optionText}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {!showResults && !isQuizEnded && (
              <button onClick={handleNextClick} className="next-button-game2 transition duration-700 delay-100">
                Next
              </button>
            )}
            {isQuizEnded && (
              <button onClick={handleNextClick} className="show-results-button transition duration-700 delay-100">
                Show Results
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <h6 className='game-footer-text'><span style={{fontWeight:"700", color:"white"}}>MULTI</span> NETWORKING COMPANY</h6> */}
    </div>
  );
};

export default Game2Questions;
