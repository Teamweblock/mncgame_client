import React from "react";
import backgroundImage from "../../Assets/gameimages/game3-background.png";

const ProgressCard = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Replace with your background image URL
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white">CONGRATULATIONS</h1>
        <p className="text-white mt-2">
          Great work! Here’s how your peers rated your performance. Let’s see
          your progress!
        </p>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-6xl px-4">
        {/* First Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="relative bg-purple-100 p-4 rounded-lg shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600 rounded-t-lg"></div>
            <p className="text-sm font-medium text-gray-700">
              The average of your fundamental (Collaboration, Critical thinking,
              Communication, E.Q) skills is
            </p>
            <h2 className="text-3xl font-bold text-purple-600 mt-2">05%</h2>
          </div>
          <div className="relative bg-blue-100 p-4 rounded-lg shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 rounded-t-lg"></div>
            <p className="text-sm font-medium text-gray-700">
              The average score of your Strategic thinking is
            </p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">95%</h2>
          </div>
          <div className="relative bg-green-100 p-4 rounded-lg shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-600 rounded-t-lg"></div>
            <p className="text-sm font-medium text-gray-700">
              The average of your Management (Risk, Stakeholder, Relationship,
              Crisis, and Time) skills is
            </p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">37%</h2>
          </div>
        </div>

        {/* Second Row: 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <div className="relative bg-yellow-100 p-4 rounded-lg shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-600 rounded-t-lg"></div>
            <p className="text-sm font-medium text-gray-700">
              The average score of your creative and Innovative skills is
            </p>
            <h2 className="text-3xl font-bold text-yellow-600 mt-2">80%</h2>
          </div>
          <div className="relative bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-600 rounded-t-lg"></div>
            <p className="text-sm font-medium text-gray-700">
              The average score of your overall impact and contribution is
            </p>
            <h2 className="text-3xl font-bold text-gray-600 mt-2">44%</h2>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-center gap-6 mt-8">
        <button className="bg-red-500 text-white px-10 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-red-600">
          Play Again
        </button>
        <button className="bg-white text-red-500 px-10 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-red-100">
          Exit
        </button>
      </div>
    </div>
  );
};

export default ProgressCard;
