import { Calendar, RocketIcon, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
// import UpgradeCard from "../Components/UpgradeCard";
import ManagementChart from "./ManagementChart";
import Cart from "./Cart";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";

const Statics = () => {
  const skills = [
    { name: "Fundamental Skills", percentage: 70, color: "#4e6ce8" },
    { name: "Strategic Trial", percentage: 50, color: "#25d3dd" },
    { name: "Management Skills", percentage: 30, color: "#f7be2f" },
    { name: "Creative And Inovative", percentage: 90, color: "#d51aff" },
    { name: "Impact And Contribution", percentage: 60, color: "#25d3dd" },
  ];

  const [percentage, setPercentage] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [progress, setProgress] = useState({});

  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  useEffect(() => {
    const targetPercentage = 73;
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < targetPercentage) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      setAnimatedPercentage((prev) => {
        if (prev < percentage) {
          animationFrame = requestAnimationFrame(animate);
          return Math.min(prev + 1, percentage);
        }
        cancelAnimationFrame(animationFrame);
        return prev;
      });
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [percentage]);

  const radius = 15.91549430918954;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (animatedPercentage / 100) * circumference
  } ${circumference}`;

  useEffect(() => {
    const animateProgress = () => {
      const progressAnimation = skills.reduce((acc, skill) => {
        acc[skill.name] = 0; // Initial value
        return acc;
      }, {});

      setProgress(progressAnimation);

      skills.forEach((skill, index) => {
        let progressValue = 0;
        const interval = setInterval(() => {
          if (progressValue < skill.percentage) {
            progressValue += 1;
            setProgress((prevProgress) => ({
              ...prevProgress,
              [skill.name]: progressValue,
            }));
          } else {
            clearInterval(interval);
          }
        }); // Delay for staggered animation
      });
    };

    animateProgress();
  }, []);

  return (
    <>
      <div className="flex lg:w-[100%] w-full">
        <Sidebar />

        <div className="bg-[#eff2f9] p-4 rounded-lg   my-4  md:ml-[300px]  w-full">
          <ProfileHeader />
          <div className="bg-white rounded-lg pb-10">
            <div className="flex justify-between items-center px-2">
              <p className="text-[1.3rem] text-[#0e2b54] font-semibold">
                Analytics
              </p>
              <div className="border-2 border-gray-300 rounded-lg px-4 py-1 flex items-center gap-2 text-nowrap">
                <span>
                  <Calendar size={15} />
                </span>{" "}
                This Week
                <span>
                  <ChevronDown size={15} />
                </span>
              </div>
            </div>
            <div className="lg:grid-cols-3 grid m-4 grid-cols-1 gap-8 md:grid-cols-2">
              <Cart onCardClick={handleCardClick} />
            </div>
            <div className="flex w-full gap-6 p-3 flex-wrap">
              <div className="flex w-full gap-6 p-2 flex-wrap">
                {/* left div */}
                <div className=" sm:w-[100%] md:w-[100%] lg:w-[50%] xl:w-[66%] flex  flex-col gap-5 w-full  ">
                  {selectedCard === 3 && (
                    <div className=" pb-6   rounded-lg shadow-md border flex flex-col gap-4   w-full">
                      <p className="text-[1.3rem] text-[#0e2b54] font-bold p-4">
                        Strategy Trial
                      </p>
                      <ul className="flex flex-col gap-4 px-2">
                        {skills.map((skill, index) => (
                          <li
                            key={index}
                            className="border-2 rounded-md px-4 py-2"
                          >
                            <div className="flex items-center justify-between text-[#0e2b54]  mx-2">
                              <p className="text-[1.3] font-semibold">
                                {skill.name}
                              </p>
                              <p className="text-[1.3] font-semibold">
                                {skill.percentage}%
                              </p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 my-1">
                              <div
                                className="h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${progress[skill.name]}%`,
                                  backgroundColor: skill.color,
                                }}
                              ></div>
                            </div>
                            {/* <div className="w-full bg-gray-200 rounded-full h-2 my-1">
                            <div
                              className="h-2 rounded-full transition-all duration-700"
                              style={{
                                width: `${skill.percentage}%`,
                                backgroundColor: skill.color,
                              }}
                            ></div>
                          </div> */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedCard === 2 && (
                    <div className="pb-6   rounded-lg shadow-md border flex flex-col gap-4  lg:w-[85%] w-full">
                      <div class="text-center mb-4">
                        <h3 class="text-[1.3rem] text-[#0e2b54] font-bold p-4">
                          How Strong your Entrepreneurial skills?
                        </h3>
                      </div>
                      <div class="flex justify-center">
                        <div className="relative h-60 w-60">
                          <svg
                            className="h-full w-full -rotate-90 transform"
                            viewBox="0 0 42 42"
                          >
                            {/* Background circle */}
                            <circle
                              cx="21"
                              cy="21"
                              r={radius}
                              fill="transparent"
                              stroke="#e2e8f0"
                              strokeWidth="3"
                            />
                            {/* Animated circle */}
                            <circle
                              cx="21"
                              cy="21"
                              r={radius}
                              fill="transparent"
                              stroke="#ec4899"
                              strokeWidth="3"
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                              style={{
                                transition: "stroke-dasharray 0.2s ease-in-out",
                              }}
                            />
                          </svg>
                          {/* Text in the center */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold">
                              {animatedPercentage}%
                            </span>
                            <span className="text-sm text-gray-500">
                              Creative
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* right div */}
                <div className="flex-1 flex flex-col gap-5">
                  {selectedCard === 3 && (
                    <>
                      <div className="shadow-lg rounded-lg px-2 pb-6   border flex flex-col gap-4 pt-4 h-[330px]  ">
                        <p className="text-[1.3rem] text-[#0e2b54] font-bold ">
                          Management Skills
                        </p>

                        <ManagementChart />
                      </div>
                    </>
                  )}
                  <div className="    ">
                    <div className="bg-gradient-to-br from-[#fc9aff] via-[#0068ff] to-[#10f6ff] rounded-lg shadow-lg h-[800px] justify-center flex">
                      <div className="flex flex-col items-center justify-center p-6 text-white min-h-[200px] space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          Upgrade plan
                          <RocketIcon className="h-5 w-5" />
                        </h3>
                        <p className="text-sm text-center opacity-50  font-medium">
                          Get 3 months free trial and
                          <br />
                          unlock all Pro features
                        </p>
                        <button className="bg-white text-[1rem] font-bold px-6 py-2 rounded-lg hover:bg-white/90   text-[#0e2b54]">
                          Upgrade
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statics;
