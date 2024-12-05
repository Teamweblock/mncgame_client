import React from 'react'
import "../Assets/CSS/Game2/WelcomePageGame2.css";
import GameChartResult from '../playgame2/GameChartResult';
import logo from "../Assets/gameimages/mnclogo2.png";
import icon1 from "../Assets/gameimages/icon1.png";
import { useNavigate } from 'react-router-dom';

import icon2 from "../Assets/gameimages/icon3.png"
import { useState } from "react";
const Game2NewResult = ({score ,levelNumber}) => {
  const navigate = useNavigate()
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleHomePage =()=>{
    navigate("/")
  }
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
        <h1 className='text-center  text-white font-bold'>Your Credit score</h1>
    
        <GameChartResult score={score} levelNumber={levelNumber}/>
       
      </div>
    </>
  )
}

export default Game2NewResult