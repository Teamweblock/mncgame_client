
import React from "react";
import img15 from "../Assets/images/gameimg1.png";
import "./CSS/Entrepreneurial.css";
import { useNavigate } from "react-router-dom";

const Entrepreneurial = () => {

  const navigate = useNavigate();

  const playGame1 = () => {
    navigate("/welcomepagegame2");
  };

  
  return (
    <>

        <div className="flex max-lg:flex-col max-lg:items-center max-lg:justify-center w-[80%] max-md:w-[90%] mx-auto">
          <div className="EntrepreneurialTextSeacation flex justify-center max-lg:text-center flex-col">
         
              <h2 className="text-5xl font-bold text-[#112e58] max-lg:text-3xl max-sm:text-2xl text-nowrap">Entrepreneurial Edge </h2>
              <p className="text-gray-400 font-medium text-[1.2rem]">
                Assess and enhance entrepreneurial skills by choosing the most
                entrepreneurial response to various situations
              </p>
              <div>
                <button className="border-2 border-[#FFA024]  font-semibold rounded-lg px-4 py-1 w-40 h-[50px] hover:bg-[#FFA024] hover:text-white" onClick={playGame1}>Play Now</button>
              </div>
            
          </div>
          <div className="EntrepreneurialImageSeaction lg:w-[50%] mt-10">
            <div>
              <img src={img15} className="EntrepreneurialImage" />
            </div>
          </div>
        </div>

    </>
  );
};
export default Entrepreneurial;