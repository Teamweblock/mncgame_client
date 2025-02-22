import React, { useEffect, useState } from "react";
import { getweekgameview } from "../utils/axiosInstance";

const OverviewChart = () => {
  const [overallprogress, setOverallprogress] = useState(0);
  const [progress, setProgress] = useState({
    problemPilot: 0,
    entrepreneurialEdge: 0,
    strategyTrial: 0,
  });

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const userData = await getweekgameview();
        setOverallprogress(userData?.overallGameTime);
        if (userData?.games) {
          const data = transformData(userData?.games);
          animateProgress(data);
        }
      } catch (error) {
        console.error("Failed to fetch weekly analysis data:", error);
      }
    };

    fetchAnalysisData();
  }, []);

  const transformData = (games) => {
    const totalPlayTime = games.reduce(
      (sum, game) => sum + game.totalPlayTime,
      0
    );

    const problemPilot =
      games.find((game) => game.gameName.includes("Problem Pilot - Combined"))
        ?.totalPlayTime || 0;

    const entrepreneurialEdge =
      games.find((game) => game.gameName === "Entrepreneurial Edge")
        ?.totalPlayTime || 0;

    const strategyTrial =
      games.find((game) => game.gameName === "Strategy Trial")?.totalPlayTime ||
      0;

    return {
      problemPilot: totalPlayTime ? (problemPilot / totalPlayTime) * 100 : 0,
      entrepreneurialEdge: totalPlayTime
        ? (entrepreneurialEdge / totalPlayTime) * 100
        : 0,
      strategyTrial: totalPlayTime ? (strategyTrial / totalPlayTime) * 100 : 0,
    };
  };

  const animateProgress = (targetProgress) => {
    const duration = 1000;
    const frameRate = 60;
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
      <div className="relative w-48 h-48 md:w-60 md:h-60 flex items-center justify-center bg-white shadow-lg rounded-full">
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
        <div className="text-center absolute top-1/2 transform -translate-y-1/2">
          <div className="md:text-3xl text-[1.3rem] font-bold text-[#6b7280]">
            {overallprogress}%
          </div>
          <div className="text-sm text-gray-400 font-medium">Play Time</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewChart;
