import React, { useState, useEffect, useRef } from "react";
import img15 from "../Assets/images/gameimg1.png";
import "./CSS/Entrepreneurial.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Entrepreneurial = () => {
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
    navigate("/welcomepagegame2");
  };

  return (
    <div
      ref={sectionRef}
      className="flex max-lg:flex-col max-lg:items-center mt-10 max-lg:justify-center w-[80%] max-md:w-[90%] mx-auto"
    >
      <motion.div
        className="EntrepreneurialTextSeacation flex justify-center max-lg:text-center flex-col"
        initial={{ opacity: 0, x: 0 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
        <h2 className="text-5xl font-bold text-[#112e58] max-lg:text-3xl max-sm:text-2xl text-nowrap">
          Entrepreneurial Edge
        </h2>
        </motion.div>
        <motion.p
          className="text-gray-400 font-medium text-[1.2rem]"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Step into the shoes of an entrepreneur with scenario-based quizzes designed to test and build your entrepreneurial mindset. From risk calculation to innovative thinking, this game helps you discover how entrepreneurial you truly are.

        </motion.p>
        <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                  >
          <button
            className="border-2 border-[#FFA024] font-semibold rounded-lg px-4 py-1 w-40 h-[50px] hover:bg-[#FFA024] hover:text-white transition duration-700"
            onClick={playGame1}
          >
            Play Now
          </button>
          </motion.div>
      </motion.div>

      <motion.div
        className="EntrepreneurialImageSeaction lg:w-[100%] mt-10"
        initial={{ opacity: 0, x: 0 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <img src={img15} className="EntrepreneurialImage" />
      </motion.div>
    </div>
  );
};

export default Entrepreneurial;
