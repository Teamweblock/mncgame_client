import React, { useEffect, useState, useRef } from "react";
import img14 from "../Assets/images/img14.png";
import { useNavigate } from "react-router-dom";
import "./CSS/Problem.css";
import { motion } from "framer-motion";

const PilotSection = () => {
  const navigate = useNavigate();
  const [isInView, setIsInView] = useState(false);
  
  // Use a ref to directly reference the element
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    const element = sectionRef.current;
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const playGame1 = () => {
    navigate("/welcomepagegame1");
  };

  return (
    <div
      ref={sectionRef}
      className="mx-auto  w-[80%] max-md:w-[90%] "
    >
      <div className="ProblemMainPaet flex max-lg:flex-col max-lg:items-center mt-20 max-lg:justify-center">
        <motion.div
          className="ProblemImageSeaction lg:w-[100%]"
          initial={{ opacity: 0, x: 0 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <img src={img14} className="ProblemImage" />
        </motion.div>
        
        <div className="ProblemTextSeacation mb-10 flex justify-center max-lg:text-center flex-col">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold text-[#112e58] max-lg:text-3xl text-nowrap">
              Problem Pilot
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-400 font-medium text-[1.2rem]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Challenge your thinking at every level! From decoding riddles to analyzing stories and tackling real-world scenarios, this game sharpens your ability to identify, understand, and solve problems with creativity and strategy.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <button
              onClick={playGame1}
              className="border-2 border-[#009EFF] font-semibold rounded-lg px-4 h-[50px] py-1 w-40 text-nowrap hover:bg-[#009EFF] hover:text-white transition duration-700"
            >
              Play Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PilotSection;
