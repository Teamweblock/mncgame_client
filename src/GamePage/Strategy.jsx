
import React from "react";
import img12 from "../Assets/images/img12.png";
import img18 from "../Assets/images/img18.png";
import "./CSS/Strategy.css";
import { useNavigate } from "react-router-dom";

const Strategy = () => {

  const navigate = useNavigate();

  const playGame1 = () => {
    navigate("/welcomepagegame3");
  };


  return (
    <>
      <div className="StrategyMain">
        <div>
          <img src={img12} className="absolute-img1" />
        </div>
        <div className="StrategyMainPaet">
          <div className="StrategyImageSeaction">
            <div>
              <img src={img18} className="StrategyImage" />
            </div>
          </div>
          <div className="StrategyTextSeacation">
            <div className="game-description">
              <h2 className="StrategyTitle">Strategy Trial</h2>
              <p className="StrategyText">
                Develop a strategic thinking and decision-making skills in
                professional scenarios , especially ina leadership role
              </p>
              <div>
                <button className="StrategyButton" onClick={playGame1}>Play Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Strategy;







