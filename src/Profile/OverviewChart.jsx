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
