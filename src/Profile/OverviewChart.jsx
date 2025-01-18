import React, { useEffect, useState } from "react";
import { getweekgameview } from "../utils/axiosInstance";

const OverviewChart = () => {
  const [progress, setProgress] = useState({
    problemPilot: 0,
    entrepreneurialEdge: 0,
    strategyTrial: 0,
  });

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const userData = await getweekgameview();

        if (userData) {
          const data = {
            problemPilot: Math.min(userData?.problemPilotPercentage || 0, 100),
            entrepreneurialEdge: Math.min(
              userData?.entrepreneurialEdgePercentage || 0,
              100
            ),
            strategyTrial: Math.min(
              userData?.strategyTrialPercentage || 0,
              100
            ),
          };

          animateProgress(data);
        }
      } catch (error) {
        console.error("Failed to fetch weekly analysis data:", error);
      }
    };

    fetchAnalysisData();
  }, []);

  const animateProgress = (targetProgress) => {
    const duration = 1000; // Animation duration in ms
    const frameRate = 60; // Frames per second
    const totalFrames = Math.round((duration / 1000) * frameRate);

    const start = { ...progress };
    const end = targetProgress;

    let currentFrame = 0;

    const animate = () => {
      currentFrame++;
      setProgress({
        problemPilot: interpolate(
          start.problemPilot,
          end.problemPilot,
          currentFrame,
          totalFrames
        ),
        entrepreneurialEdge: interpolate(
          start.entrepreneurialEdge,
          end.entrepreneurialEdge,
          currentFrame,
          totalFrames
        ),
        strategyTrial: interpolate(
          start.strategyTrial,
          end.strategyTrial,
          currentFrame,
          totalFrames
        ),
      });

      if (currentFrame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const interpolate = (start, end, currentFrame, totalFrames) => {
    const progress = currentFrame / totalFrames;
    return start + (end - start) * easeInOutCubic(progress);
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-20 p-4">
      {/* Circular Progress Chart */}
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
            strokeDashoffset={283 - (283 * progress.problemPilot) / 100}
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
            strokeDashoffset={283 - (283 * progress.entrepreneurialEdge) / 100}
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
            strokeDashoffset={283 - (283 * progress.strategyTrial) / 100}
          />
        </svg>

        {/* Center Text */}
        <div className="text-center absolute top-1/2 transform -translate-y-1/2">
          <div className="md:text-3xl text-[1.3rem] font-bold text-[#6b7280]">
            {progress.problemPilot.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-400 font-medium">Play Time</div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="space-y-3 mt-6 lg:mt-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-indigo-500" />
          <div className="text-[#0e2b54] font-semibold text-[1.5rem]">
            Problem Pilot
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-cyan-400" />
          <div className="text-[#0e2b54] font-semibold text-[1.5rem]">
            Entrepreneurial Edge
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-teal-400" />
          <div className="text-[#0e2b54] font-semibold text-[1.5rem]">
            Strategy Trial
          </div>
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default OverviewChart;

// import React, { useEffect, useState } from "react";
// import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

// // Mock function to simulate API call
// const getweekgameview = async () => {
//   // Simulating API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   // Return mock data
//   return {
//     problemPilotPercentage: 70,
//     entrepreneurialEdgePercentage: 80,
//     strategyTrialPercentage: 40,
//     playTime: 75.5,
//   };
// };

// const OverviewChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [playTime, setPlayTime] = useState(0);

//   useEffect(() => {
//     const fetchAnalysisData = async () => {
//       try {
//         const userData = await getweekgameview();
//         if (userData) {
//           const data = [
//             {
//               name: 'Strategy Trial',
//               value: Math.min(userData.strategyTrialPercentage, 100),
//               fill: '#14b8a6', // teal-500
//             },
//             {
//               name: 'Entrepreneurial Edge',
//               value: Math.min(userData.entrepreneurialEdgePercentage, 100),
//               fill: '#06b6d4', // cyan-500
//             },
//             {
//               name: 'Problem Pilot',
//               value: Math.min(userData.problemPilotPercentage, 100),
//               fill: '#4f46e5', // indigo-600
//             },
//           ];
//           setChartData(data);
//           setPlayTime(userData.playTime);
//         }
//       } catch (error) {
//         console.error("Failed to fetch weekly analysis data:", error);
//       }
//     };

//     fetchAnalysisData();
//   }, []);

//   return (
//     <div className="flex flex-col lg:flex-row justify-center items-center gap-20 p-4">
//       <div className="relative w-64 h-64 md:w-80 md:h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadialBarChart
//             cx="50%"
//             cy="50%"
//             innerRadius="30%"
//             outerRadius="100%"
//             barSize={15}
//             data={chartData}
//             startAngle={90}
//             endAngle={-270}
//           >
//             <RadialBar
//               minAngle={15}
//               background
//               clockWise
//               dataKey="value"
//               cornerRadius={30}
//             />
//           </RadialBarChart>
//         </ResponsiveContainer>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-4">
//           <div className="md:text-xl text-[1.2rem] font-bold text-[#6b7280]">
//             {playTime.toFixed(1)}%
//           </div>
//           <div className="text-sm text-gray-400 font-medium">Play Time</div>
//         </div>
//       </div>
//       <div className="space-y-3 mt-6 lg:mt-0">
//         {chartData.map((item, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.fill }} />
//             <div className="text-[#0e2b54] font-semibold text-[1.5rem]">
//               {item.name}: {item.value.toFixed(1)}%
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OverviewChart;

// import React, { useState, useEffect } from 'react';
// import { getweekgameview } from "../utils/axiosInstance";
// import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };

// const OverviewChart = () => {
//   const [analysisData, setAnalysisData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   const fetchAnalysisData = async () => {
//     setIsLoading(true);
//     try {
//       const userData = await getweekgameview(); // Fetch profile data using the new function
//       console.log("Fetched userData:", userData); // Log fetched data
//       if (userData) {
//         // Transform the fetched data if necessary to match the expected structure
//         const transformedData = userData.map(item => ({
//           name: item.name,
//           uv: item.uv,
//           pv: item.pv,
//           fill: item.fill,
//         }));
//         setAnalysisData(transformedData); // Update analysisData with fetched data
//         console.log("Set analysisData:", transformedData); // Log set data
//       }
//     } catch (error) {
//       console.error("Failed to fetch weekly analysis data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchAnalysisData();
// }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <RadialBarChart
//         cx="50%"
//         cy="50%"
//         innerRadius="10%"
//         outerRadius="80%"
//         barSize={10}
//         data={analysisData} // Use fetched data
//       >
//         <RadialBar
//           minAngle={15}
//           label={{ position: 'insideStart', fill: '#fff' }}
//           background
//           clockWise
//           dataKey="uv" // Ensure this matches the key in your data
//         />
//         <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//       </RadialBarChart>
//     </ResponsiveContainer>
//   );
// };

// export default OverviewChart;

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

//   // const radius = 15.91549430918954;
//   // const circumference = 2 * Math.PI * radius;
//   // const strokeDasharray = `${
//   //   (animatedPercentage / 100) * circumference
//   // } ${circumference}`;

//   return (
//     <div className="flex flex-col lg:flex-row justify-center items-center gap-14 p-4">
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
//             fill="none"s
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
//           <div className="text-[#0e2b54] font-semibold text-[1.3rem]">
//             Problem Pilot
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-sm bg-cyan-400" />
//           <div className="text-[#0e2b54] font-semibold text-[1.3rem]">
//             Entrepreneurial Edge
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-sm bg-teal-400" />
//           <div className="text-[#0e2b54] font-semibold text-[1.3rem]">
//             Strategy Trial
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewChart;
