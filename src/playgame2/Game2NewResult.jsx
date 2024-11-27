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
     <div className="welcomepage-bg">
        <img src={logo} className="mnc-logo"  onClick={handleHomePage} style={{cursor:"pointer",marginTop:"20px"}}/>
        <img
          src={icon1}
          className="icon1-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon2}
          className="icon2-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <h1 className='credit-score-result'>Your Credit score</h1>
    
        <GameChartResult score={score} levelNumber={levelNumber}/>
        {/* <h6 className='game-footer-text'><span style={{fontWeight:"700", color:"white"}}>MULTI</span> NETWORKING COMPANY</h6> */}
      </div>
    </>
  )
}

export default Game2NewResult