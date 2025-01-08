import React, { useState, useEffect, useRef } from "react";
import img12 from "../Assets/images/img12.png";
import img18 from "../Assets/images/img18.png";
import "./CSS/Strategy.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Strategy = () => {
  const navigate = useNavigate();
  const [isInView, setIsInView] = useState(false);

  // Using useRef to reference the section for intersection observation
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
    navigate("/welcomepagegame3");
  };

  return (
    <div
      ref={sectionRef}
      className="ProblemMain lg:pt-60 pt-20 mx-auto lg:-mt-[150px] mt-20 w-[80%] max-md:w-[90%]"
    >
      <div className="ProblemMainPaet flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
        <motion.div
          className="ProblemImageSeaction lg:w-[100%]"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <img src={img18} className="ProblemImage" />
        </motion.div>

        <motion.div
          className="ProblemTextSeacation mb-10 flex justify-center max-lg:text-center flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
          <h2 className="text-5xl font-bold text-[#112e58] max-lg:text-3xl text-nowrap">
            Strategy Trial
          </h2>
          </motion.div>
          <motion.p
            className="text-gray-400 font-medium text-[1.2rem]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Collaborate as part of a virtual boardroom, taking on the role of a CxO to tackle dynamic business challenges. Hone strategic thinking, leadership, and management skills while learning the art of teamwork and innovation.

          </motion.p>

         <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     animate={isInView ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 1 }}
                   >
            <button
              onClick={playGame1}
              className="border-2 border-[#9CFF00] font-semibold rounded-lg px-4 h-[50px] py-1 w-40 text-nowrap hover:bg-[#9CFF00] hover:text-white transition duration-700"
            >
              Play Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Strategy;
