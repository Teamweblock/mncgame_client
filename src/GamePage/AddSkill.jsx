
import React from "react";
import { IoIosSearch } from "react-icons/io";
import img11 from "../Assets/images/img11.png";
import img3 from "../Assets/images/gameimg3.png"
import { useEffect } from "react";
import { useState } from "react";
import "./CSS/AddSkill.css";
import PilotSection from "./PilotSection";

const AddSkill = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <>
      <div>
        <div className="addskill-part-main ">
          <div className="addskill-part-1 lg:w-[70%] w-[90%] mx-auto  ">
            <div className=" max-lg:mt-[600px] lg:mt-[130px] xl:mt-[250px] lg:w-[45%] w-full   max-lg:text-center flex justify-center  flex-col  max-lg:mx-auto" >
              <h2 className=" max-lg:text-3xl max-sm:text-2xl text-5xl font-bold text-[#112e58] max-lg:text-center">
                Are you ready to put your entrepreneurial skills to the test?
              </h2>
              <p className="text-gray-400 font-medium text-[1.2rem]">
                Build , strategize , complete Ultimate online business simulation
                game.... Join now !
              </p>
              <input
                className="skill-input outline-none text-gray-400 font-medium text-[1.2rem] mt-5 px-2"       
                placeholder="Search games..."
                type="text"
              />
              <div className="position-relative">
                <IoIosSearch className="search-icon" />
              </div>
            </div>
          </div>
          {/* <div className="addskill-part-2">

            <img style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} className="game-img3" src={img3} />

          </div> */}
        </div>
      </div>
    </>
  );
};
export default AddSkill;













