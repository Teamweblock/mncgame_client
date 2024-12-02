
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
      <div className="ProblemMain mx-auto  lg:-mt-[250px] w-[80%] max-md:w-[90%]    ">
        <div className="ProblemMainPaet flex max-lg:flex-col max-lg:items-center max-lg:justify-center ">
          <div className="ProblemImageSeaction lg:w-[50%]">
            <div>
              <img src={img14} className="ProblemImage" />
            </div>
          </div>
          <div className="ProblemTextSeacation mb-10 flex justify-center max-lg:text-center flex-col">
        
              <h2 className="text-5xl font-bold text-[#112e58] max-lg:text-3xl text-nowrap">Problem Pilot </h2>
              <p className="text-gray-400 font-medium text-[1.2rem]">
                Develop a solution-orianted mindset by solving various problems
                within a given timeframe
              </p>
              <div>
 
                <button onClick={playGame1} className="border-2 border-[#009EFF]  font-semibold rounded-lg px-4 h-[50px] py-1 w-40 text-nowrap hover:bg-[#009EFF] hover:text-white">
                  Play Now
                </button>
              </div>
           
          </div>
        </div>
      </div>
    </>
  );
};
export default PilotSection;





















