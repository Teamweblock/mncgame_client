import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerResults } from "../../utils/axiosInstance";

const ProgressCard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get("roomCode");
  const [counts, setCounts] = useState({
    fundamentalSkills: 0,
    strategicThinking: 0,
    managementSkills: 0,
    creativity: 0,
    overallImpact: 0,
  });
  const navigate = useNavigate();
  // Fetch the result from the API
  const handlegetresult = async () => {
    try {
      const payload = { roomCode };
      const response = await PlayerResults(JSON.stringify(payload));
      console.log("response", response.overallCategoryAverages);
      if (response) {
        setCounts(response.overallCategoryAverages);
      } else {
        console.log("Failed to fetch results. Please try again.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  useEffect(() => {
    Object.keys(counts).forEach((key) => {
      const duration = counts[key];
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += 5; // Increase count faster
        if (currentCount > duration) {
          clearInterval(interval);
          setCounts((prevCounts) => ({ ...prevCounts, [key]: duration })); // Ensure final value is set
        } else {
          setCounts((prevCounts) => ({ ...prevCounts, [key]: currentCount }));
        }
      }, 10); // Reduce interval timing
    });
    handlegetresult();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center game3result">
      {/* Header Section */}
      <img src="/mnclogo2.png" className="mnc-logo" />
      <div className="text-center mb-8 mt-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
          CONGRATULATIONS
        </h1>
        <p className="text-white mt-2">
          Great work! Here’s how your peers rated your performance. Let’s see
          your progress!
        </p>
      </div>

      <div className="w-full max-w-6xl px-4">
        {/* First Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="relative bg-white p-4 text-center shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#AE00FF] "></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average of your fundamental (Collaboration, Critical
                thinking, Communication, E.Q) skills is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts?.fundamentalSkills}%
              </h2>
            </div>
          </div>
          <div className="relative bg-white p-4  shadow-md text-center hover:scale-105  hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#00A8FF] "></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average score of your Strategic thinking is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts?.strategicThinking}%
              </h2>
            </div>
          </div>
          <div className="relative bg-white p-4 text-center shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#A2FF00] "></div>
            <div className="content">
              <p className="text-sm font-medium text-black">
                The average of your Management (Risk, Stakeholder, Relationship,
                Crisis, and Time) skills is
              </p>
              <h2 className="text-3xl font-bold text-black ">
                {counts?.managementSkills}%
              </h2>
            </div>
          </div>
        </div>

        {/* Second Row: 2 Cards with extra space between */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-1 md:gap-44 justify-center items-center mx-auto w-[100%] sm:w-[90%]">
          <div className="relative bg-white p-4 shadow-md hover:scale-105 hover:shadow-lg  text-center transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-yellow-600 "></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average score of your creative and Innovative skills is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts?.creativity}%
              </h2>
            </div>
          </div>
          <div className="relative bg-white p-4 shadow-md hover:scale-105 hover:shadow-lg text-center transition-all duration-300 ease-in-out ">
            {" "}
            {/* Increased margin-left to ml-48 and added h-32 to decrease height */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gray-600"></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average score of your overall impact and contribution is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts?.overallImpact}%
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => navigate("/chooserole")}
          className="bg-red-500 text-white px-10 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Play Again
        </button>
        <button
          onClick={() => navigate("/games")}
          className="bg-white text-red-500 px-10 py-2 rounded-full text-lg font-semibold shadow-md  hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default ProgressCard;
