import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useEffect } from "react";
import { useState } from "react";
import "./CSS/AddSkill.css";
import PilotSection from "./PilotSection";
import { motion } from "framer-motion";
import bgimage from "../Assets/illustration/Slider-Image.png";

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
        <img className=" w-[70%] h-[60%] mx-auto" src={bgimage} />
      </div>
      <div className="  mx-auto  mb-12 px-2">
        <div className="  w-full  text-center grid justify-center    mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#000000] "
          >
            <h2 className=" max-lg:text-3xl max-sm:text-2xl text-5xl font-bold text-[#112e58] text-center">
              Are you ready to put your skills to test?
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#000000] "
          >
            <p className="text-gray-400 font-medium text-[1.2rem]">
              Build network, strategize, and compete with Ultimate business
              simulation games….Play now!
            </p>
          </motion.div>
          {/* <input
                className="skill-input outline-none text-gray-400 font-medium text-[1.2rem] mt-5 px-2"       
                placeholder="Search games..."
                type="text"
              />
              <div className="position-relative">
                <IoIosSearch className="search-icon" />
              </div> */}
        </div>
      </div>
    </>
  );
};
export default AddSkill;
