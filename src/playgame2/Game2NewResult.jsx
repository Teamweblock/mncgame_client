import React from "react";
import "../Assets/CSS/Game2/WelcomePageGame2.css";
import GameChartResult from "../playgame2/GameChartResult";
import icon1 from "../Assets/gameimages/icon1.png";

import icon2 from "../Assets/gameimages/icon3.png";
import { useState } from "react";
const Game2NewResult = ({ score, levelNumber }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <>
      <div className=" w-full flex justify-center  items-center flex-col  ">
        <img
          src={icon1}
          className="icon1-game1 parallax-layer max-sm:hidden"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon2}
          className="icon2-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-white text-4xl font-bold tracking-wider px-8">
            ENTREPRENEURIA
          </h1>
          <GameChartResult score={score} levelNumber={levelNumber} />
          <h1 className="text-white text-4xl font-bold tracking-wider px-8">
            MINDSETSCORE
          </h1>
        </div>
      </div>
    </>
  );
};

export default Game2NewResult;
