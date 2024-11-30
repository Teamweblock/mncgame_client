import React from "react";

const OverviewChart = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 p-4">
      <div className="relative w-48 h-48  md:w-60 md:h-60  flex items-center justify-center bg-white shadow-lg rounded-full">
        {/* Outer ring - Problem Pilot */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgb(229 231 235)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgb(99 102 241)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset="84.6"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <svg className="absolute w-[85%] h-[85%] -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgb(229 231 235)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgb(34 211 238)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset="56.6"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <svg className="absolute w-[70%] h-[70%] -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgb(229 231 235)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgb(45 212 191)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDashoffset="28.9"
            strokeDasharray="283"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="text-center absolute top-1/2 transform -translate-y-1/2">
          <div className="md:text-3xl text-[1.3rem] font-bold text-[#6b7280]">83.5%</div>
          <div className="text-sm text-gray-400 font-medium">Play Time</div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="space-y-3 mt-6 lg:mt-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-indigo-500" />
          <div className="text-[#0e2b54] font-semibold text-[1.2rem]">
            Problem Pilot
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-cyan-400" />
          <div className="text-[#0e2b54] font-semibold text-[1.2rem]">
            Entrepreneurial Edge
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-teal-400" />
          <div className="text-[#0e2b54] font-semibold text-[1.2rem]">
            Strategy Trial
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewChart;
