
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
      {/* <div className="StrategyMain">
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
      </div> */}


      <div className="ProblemMain lg:pt-60 pt-20 mx-auto lg:-mt-[250px] w-[80%] max-md:w-[90%]">
        <div className="ProblemMainPaet flex max-lg:flex-col max-lg:items-center max-lg:justify-center  ">
          <div className="ProblemImageSeaction lg:w-[50%]">
            <div>
              <img src={img18} className="ProblemImage" />
            </div>
          </div>
          <div className="ProblemTextSeacation mb-10 flex justify-center max-lg:text-center flex-col">
        
              <h2 className="text-5xl font-bold text-[#112e58] max-lg:text-3xl text-nowrap">Strategy Trial </h2>
              <p className="text-gray-400 font-medium text-[1.2rem]">
              Develop a strategic thinking and decision-making skills in
              professional scenarios , especially ina leadership role
              </p>
              <div>
 
                <button onClick={playGame1} className="border-2 border-[#9CFF00]  font-semibold rounded-lg px-4 h-[50px] py-1 w-40 text-nowrap hover:bg-[#9CFF00] hover:text-white">
                  Play Now
                </button>
              </div>
           
          </div>
        </div>
      </div>
    </>
  );
};
export default Strategy;







