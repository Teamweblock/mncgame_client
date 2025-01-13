import React, { useEffect, useState } from "react";
import { getweekgameview } from "../utils/axiosInstance";

const OverviewChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [AnalysisData, setAnalysisData] = useState([]);
  const [playTime, setPlayTime] = useState(0); // Static value for now
  const [offsets, setOffsets] = useState({
    problemPilot: 100,
    entrepreneurialEdge: 100,
    strategyTrial: 100,
  });

  useEffect(() => {
    const fetchAnalysisData = async () => {
      setIsLoading(true);
      try {
        // Simulated API call, will replace with actual API later
        const userData = await getweekgameview(); // Fetch profile data using the new function
        console.log("userData", userData?.games);

        if (userData) {
          setAnalysisData(userData?.games);
        }

        // Once the API is ready, update the offsets based on data
        setOffsets({
          problemPilot: 100 - 84.6, // Example value for now
          entrepreneurialEdge: 100 - 56.6, // Example value for now
          strategyTrial: 100 - 28.9, // Example value for now
        });

        // Replace with dynamic data after API integration
        setPlayTime("83.5%"); // For now, it's a static value
      } catch (error) {
        console.error("Failed to fetch weekly analysis data:", error);
      } finally {
        setIsLoading(false);

        // Animate progress rings sequentially with overlapping animations
        setTimeout(() => {
          setOffsets((prev) => ({ ...prev, problemPilot: 84.6 }));
        }, 300);
        setTimeout(() => {
          setOffsets((prev) => ({ ...prev, entrepreneurialEdge: 56.6 }));
        }, 700);
        setTimeout(() => {
          setOffsets((prev) => ({ ...prev, strategyTrial: 28.9 }));
        }, 1100);
      }
    };

    fetchAnalysisData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 p-4">
      {/* Chart Container */}
      <div className="relative w-48 h-48 md:w-60 md:h-60 flex items-center justify-center bg-white shadow-lg rounded-full">
        {/* Outer Ring - Problem Pilot */}
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
            strokeDashoffset={offsets.problemPilot}
            style={{
              transition: "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* Middle Ring - Entrepreneurial Edge */}
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
            strokeDashoffset={offsets.entrepreneurialEdge}
            style={{
              transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* Inner Ring - Strategy Trial */}
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
            strokeDasharray="283"
            strokeDashoffset={offsets.strategyTrial}
            style={{
              transition: "stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="text-center absolute top-1/2 transform -translate-y-1/2">
          <div className="md:text-3xl text-[1.3rem] font-bold text-[#6b7280]">
            {isLoading ? "Loading..." : playTime}
          </div>
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

// import React, { useEffect, useState } from "react";
// import { getweekgameview } from "../utils/axiosInstance";

// const OverviewChart = () => {
//   const [analysisData, setAnalysisData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalysisData = async (data) => {
//       setIsLoading(true);
//       try {
//         const userData = await getweekgameview(); // Fetch profile data using the new function
//         if (userData) {
//           setAnalysisData(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch weekly analysis data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAnalysisData();
//   }, []);

//   return (
//     <div className="flex flex-col lg:flex-row items-center gap-10 p-4">
//       <div className="relative w-48 h-48  md:w-60 md:h-60  flex items-center justify-center bg-white shadow-lg rounded-full">
//         {/* Outer ring - Problem Pilot */}
//         <svg className="absolute w-full h-full -rotate-90">
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             stroke="rgb(229 231 235)"
//             strokeWidth="10"
//             fill="none"
//           />
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             stroke="rgb(99 102 241)"
//             strokeWidth="10"
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray="283"
//             strokeDashoffset="84.6"
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>

//         <svg className="absolute w-[85%] h-[85%] -rotate-90">
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             stroke="rgb(229 231 235)"
//             strokeWidth="10"
//             fill="none"
//           />
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             stroke="rgb(34 211 238)"
//             strokeWidth="8"
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray="283"
//             strokeDashoffset="56.6"
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>

//         <svg className="absolute w-[70%] h-[70%] -rotate-90">
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             stroke="rgb(229 231 235)"
//             strokeWidth="8"
//             fill="none"
//           />
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             stroke="rgb(45 212 191)"
//             strokeWidth="8"
//             fill="none"
//             strokeLinecap="round"
//             strokeDashoffset="28.9"
//             strokeDasharray="283"
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>

//         <div className="text-center absolute top-1/2 transform -translate-y-1/2">
//           <div className="md:text-3xl text-[1.3rem] font-bold text-[#6b7280]">
//             83.5%
//           </div>
//           <div className="text-sm text-gray-400 font-medium">Play Time</div>
//         </div>
//       </div>

//       {/* Legend Section */}
//       <div className="space-y-3 mt-6 lg:mt-0">

//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-sm bg-indigo-500" />
//           <div className="text-[#0e2b54] font-semibold text-[1.2rem]">
//             Problem Pilot
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-sm bg-cyan-400" />
//           <div className="text-[#0e2b54] font-semibold text-[1.2rem]">
//             Entrepreneurial Edge
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-sm bg-teal-400" />
//           <div className="text-[#0e2b54] font-semibold text-[1.2rem]">
//             Strategy Trial
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewChart;
