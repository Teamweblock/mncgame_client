
import React from "react";
import img14 from "../Assets/images/img14.png";
import { useNavigate } from "react-router-dom";
import "./CSS/Problem.css";
const PilotSection = () => {
  
  const navigate = useNavigate();

  // const playGame1 = () => {
  //   navigate("/game1");
  // };

  const playGame1 = () => {
    navigate("/welcomepagegame1");
  };

  return (
    <>
      <div className="ProblemMain">
        <div className="ProblemMainPaet">
          <div className="ProblemImageSeaction">
            <div>
              <img src={img14} className="ProblemImage" />
            </div>
          </div>
          <div className="ProblemTextSeacation">
            <div className="game-description">
              <h2 className="ProblemTitle">Problem Pilot</h2>
              <p className="ProblemText">
                Develop a solution-orianted mindset by solving various problems
                within a given timeframe
              </p>
              <div>
                <button onClick={playGame1} className="ProblemButton">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PilotSection;





















