import React, { useEffect, useState } from "react";

const OverviewChart = () => {
  const [analysisData, setAnalysisData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      setIsLoading(true);
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const response = await fetch(
          // "https://api.multinetworkingcompany.com/player/weeklyanalysis",
          "https://http://localhost:8000/player/weeklyanalysis",
          {
            method: "POST",
            headers: {
              "x-access-token": token, // Use token from localStorage
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              startDate: "2024-12-24",
              endDate: "2024-12-31",
            }),
          }
        );
        console.log("response ------------", response);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setAnalysisData(data);
      } catch (error) {
        console.error("Failed to fetch weekly analysis data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);


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
          <div className="md:text-3xl text-[1.3rem] font-bold text-[#6b7280]">
            83.5%
          </div>
          <div className="text-sm text-gray-400 font-medium">Play Time</div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="space-y-3 mt-6 lg:mt-0">
      {isLoading ? (
          <p className="text-gray-400 text-center">Loading data...</p>
        ) : analysisData.length ? (
          analysisData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-4">
              <div
                className={`w-4 h-4 rounded-sm`}
                style={{
                  backgroundColor:
                    index === 0
                      ? "rgb(99, 102, 241)" // Indigo
                      : index === 1
                      ? "rgb(34, 211, 238)" // Cyan
                      : "rgb(45, 212, 191)", // Teal
                }}
              />
              <div className="text-[#0e2b54] font-semibold text-[1.2rem]">
                {item.title}
              </div>
              {/* <p className="text-gray-500 text-sm ml-4">{item.description}</p> */}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No data available.</p>
        )}
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
