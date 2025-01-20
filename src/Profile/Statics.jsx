import { Calendar, RocketIcon, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import ManagementChart from "./ManagementChart";
import Cart from "./Cart";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import DatePicker from "../componets/DatePicker"; // Ensure the Calendar component is correctly imported
import CustomDatePicker from "../componets/DatePicker";

const Statics = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const skills = [
    { name: "Fundamental Skills", percentage: 70, color: "#4e6ce8" },
    { name: "Strategic Trial", percentage: 50, color: "#25d3dd" },
    { name: "Management Skills", percentage: 30, color: "#f7be2f" },
    { name: "Creative And Inovative", percentage: 90, color: "#d51aff" },
    { name: "Impact And Contribution", percentage: 60, color: "#25d3dd" },
  ];
  const problenPilot = [  
    {
      name: "Self Progress",
      percentage: 73,
      decrement: "Common",
      increment: "Unique",
      color: "#4e6ce8",
    },
    {
      name: "Peer Reviews",
      percentage: 53,
      decrement: "Non Implemented",
      increment: "Implemented",
      color: "#25d3dd",
    },
  ];

  const [percentage, setPercentage] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [progress, setProgress] = useState({});

  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  //problem pilot
  useEffect(() => {
    if (selectedCard === 1 || selectedCard === null) {
      // Reset progress for all items
      const initialProgress = problenPilot.reduce((acc, skill) => {
        acc[skill.percentage] = 0;
        return acc;
      }, {});
      setProgress(initialProgress);
      // Animate progress for each skill
      problenPilot.forEach((skill) => {
        setTimeout(() => {
          setProgress((prev) => ({
            ...prev,
            [skill.percentage]: skill.percentage,
          }));
        }, 100); // Adjust delay if needed
      });
    }
  }, [selectedCard]); // Watch for changes in selectedCard



  //skill progress animation -Strategy Trial
  useEffect(() => {
    if (selectedCard === 3) {
      const progressAnimation = skills.reduce((acc, skill) => {
        acc[skill.name] = 0; // Reset initial progress for all skills
        return acc;
      }, {});

      setProgress(progressAnimation);

      skills.forEach((skill) => {
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
        }, 30); // Adjust animation speed
      });
    }
  }, [selectedCard]);

  // Entrepreneurial Edge
  useEffect(() => {
    if (selectedCard === 2) {
      const targetPercentage = 73;
      setPercentage(0); // Reset percentage before starting animation
      const interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev < targetPercentage) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (selectedCard === 2) {
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
    }
  }, [percentage, selectedCard]);

  const radius = 15.91549430918954;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (animatedPercentage / 100) * circumference
  } ${circumference}`;

  return (
    <>
      <div className="flex lg:w-[100%] w-full">
        <Sidebar />

        <div className="bg-[#eff2f9] p-4 rounded-lg   my-4  md:ml-[300px]  w-full">
          <ProfileHeader />
          <div className="bg-white rounded-lg pb-10">
            <div>
              <div className="flex justify-between items-center px-2">
                <p className="text-[1.3rem] text-[#0e2b54] font-semibold">
                  Analytics
                </p>
                <div className="relative">
                  <div className="border-2 border-gray-300 rounded-lg px-4 py-1 flex items-center gap-2">
                    <span>
                      <Calendar size={15} />
                    </span>
                    This Week
                    <button
                      className="ml-2 flex items-center"
                      onClick={toggleCalendar}
                      aria-label="Toggle Calendar Dropdown"
                    >
                      <ChevronDown size={15} />
                    </button>
                  </div>
                  {showCalendar && (
                    <div className="absolute right-0 mt-2 bg-white  border border-gray-300 rounded-lg shadow-lg z-10 w-[300px] md:w-[500px]">
                      <DatePicker className="w-full pl-80 -ml-[60px]"/>
                      {/* margin-left: -298px; */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:grid-cols-3 grid m-4 grid-cols-1 gap-8 md:grid-cols-2">
              <Cart onCardClick={handleCardClick} />
            </div>
            <div className="flex w-full gap-6 p-3 flex-wrap">
              <div className="flex w-full gap-6 p-2 flex-wrap">
                <div className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] flex   w-full">
                  {(selectedCard === 1 || selectedCard === null) && (
                    <div className=" rounded-lg flex flex-col w-full">
                      {problenPilot.map((skill, index) => {
                        return (
                          <ul className="px-2 space-y-3">
                            <li className="border-2 rounded-xl px-2 py-2">
                              <div className="flex items-center justify-between text-[#0e2b54] mx-2">
                                <p className="text-[1.3] font-semibold lg">
                                  <b>
                                    <h3>{skill.name}</h3>
                                  </b>{" "}
                                </p>
                              </div>
                              <div className="w-full bg-gray-200 rounded-xl h-10 my-1">
                                <div
                                  className={`h-10 rounded-xl   text-white grid items-center pl-6`}
                                  // style={{
                                  //   width: `${skill.percentage}%`,
                                  //   backgroundColor: skill.color,
                                  // }}
                                  style={{
                                    width: `${
                                      progress[skill.percentage] || 0
                                    }%`, // Dynamic progress
                                    backgroundColor: skill.color,
                                    transition: "width 0.8s ease-in-out", // Smooth transition
                                  }}
                                >
                                  {skill.percentage}%
                                </div>
                              </div>
                              <div className="flex justify-between text-[#0e2b54] mt-2">
                                <b>
                                  <span className="text-xs sm:text-base md:text-lg font-semibold">
                                    {skill.decrement}
                                  </span>
                                </b>{" "}
                                <b>
                                  <span className="text-xs sm:text-base md:text-lg font-semibold">
                                    {skill.increment}
                                  </span>
                                </b>{" "}
                              </div>
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  )}
                </div>
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
                                className="h-2 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${progress[skill.name] || 0}%`,
                                  backgroundColor: skill.color,
                                }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedCard === 2 && (
                    <div className="pb-6   rounded-lg shadow-md border flex flex-col gap-4  lg:w-[100%] w-full">
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
                              strokeWidth="5"
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
                  <div className="">
                    {(selectedCard === 2 || selectedCard === 3) && (
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
                    )}
                  </div>
                </div>
              </div>
              <div className="mx-4">
                {(selectedCard === 1 || selectedCard === null) && (
                  <div className="bg-gradient-to-br from-[#fc9aff] via-[#0068ff] to-[#10f6ff] rounded-lg shadow-lg h-[500px] w-fit justify-center flex">
                    <div className="flex flex-col items-center justify-center p-6 text-white min-h-[200px] space-y-4">
                      <h3 className="sm:text-2xl text-base font-bold flex items-center gap-2">
                        Upgrade plan
                        <RocketIcon className="h-5 w-5" />
                      </h3>
                      <p className="text-xl text-center opacity-50  font-medium">
                        Get 3 months free trial and
                        <br />
                        unlock all Pro features
                      </p>
                      <button className="bg-white text-[1rem] font-bold px-6 py-2 rounded-lg hover:bg-white/90   text-[#0e2b54]">
                        Upgrade
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statics;




// import { Calendar, RocketIcon, ChevronDown } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import ManagementChart from "./ManagementChart";
// import Cart from "./Cart";
// import Sidebar from "./Sidebar";
// import ProfileHeader from "./ProfileHeader";
// import DatePicker from "../componets/DatePicker"; // Ensure the Calendar component is correctly imported
// // import CustomDatePicker from "../componets/DatePicker";
// import { entrepreneurialEdge, problemPilot } from "../utils/axiosInstance";


// const Statics = () => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [percentage, setPercentage] = useState(0);
//   const [animatedPercentage, setAnimatedPercentage] = useState(0);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [progress, setProgress] = useState({});
//   const [problemPilotpro, setproblemPilotPro] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [skilloverview, setSkilloverview] = useState(null);

//   const toggleCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };
//   const skills = [
//     { name: "Fundamental Skills", percentage: 70, color: "#4e6ce8" },
//     { name: "Strategic Trial", percentage: 50, color: "#25d3dd" },
//     { name: "Management Skills", percentage: 30, color: "#f7be2f" },
//     { name: "Creative And Inovative", percentage: 90, color: "#d51aff" },
//     { name: "Impact And Contribution", percentage: 60, color: "#25d3dd" },
//   ];

//   const handleCardClick = (id) => {
//     setSelectedCard(id);
//   };

//   //problem pilot
//   useEffect(() => {
//     if (selectedCard === 1 || selectedCard === null) {
//       const fetchSkillsOverview = async () => {
//         try {
//           const initialProgress = await problemPilot(); // Fetch the real-time data
//           if (initialProgress?.datasets) {
//             // Format the fetched data to match the structure you need for rendering
//             const formattedData = initialProgress.datasets.map((dataset) => {
//               return {
//                 name: dataset?.label,
//                 percentage: dataset?.data[0], // Assuming each dataset has a single data point
//                 color:
//                   dataset?.label === "Self Progress" ? "#4e6ce8" : "#25d3dd", // Color based on label
//                 decrement:
//                   dataset?.label === "Self Progress"
//                     ? "Common"
//                     : "Non Implemented", // Example text, modify based on your logic
//                 increment:
//                   dataset?.label === "Self Progress" ? "Unique" : "Implemented", // Example text, modify based on your logic
//               };
//             });

//             // Set the fetched data into the state
//             setproblemPilotPro(formattedData);
//             // Reset progress state
//             const initialProgressState = formattedData.reduce((acc, skill) => {
//               acc[skill.name] = 0; // Initial progress for each skill set to 0
//               return acc;
//             }, {});

//             setProgress(initialProgressState);
//             // Animate progress based on the fetched data
//             formattedData.forEach((skill) => {
//               setTimeout(() => {
//                 setProgress((prev) => ({
//                   ...prev,
//                   [skill.name]: skill.percentage, // Update the progress dynamically
//                 }));
//               }, 100); // Adjust delay if needed
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching skill overview", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchSkillsOverview();
//     }
//   }, [selectedCard]); // Watch for changes in selectedCard

//   //skill progress animation -Strategy Trial
//   useEffect(() => {
//     if (selectedCard === 3) {
//       const progressAnimation = skills.reduce((acc, skill) => {
//         acc[skill.name] = 0; // Reset initial progress for all skills
//         return acc;
//       }, {});

//       setProgress(progressAnimation);
//       skills.forEach((skill) => {
//         let progressValue = 0;
//         const interval = setInterval(() => {
//           if (progressValue < skill.percentage) {
//             progressValue += 1;
//             setProgress((prevProgress) => ({
//               ...prevProgress,
//               [skill.name]: progressValue,
//             }));
//           } else {
//             clearInterval(interval);
//           }
//         }, 30); // Adjust animation speed
//       });
//     }
//   }, [selectedCard]);

//   // Entrepreneurial Edge
//   useEffect(() => {
//     if (selectedCard === 2) {
//       const fetchentrepreneurialEdge = async () => {
//         try {
//           const result = await entrepreneurialEdge();
//           setSkilloverview(result?.total);
//           if (result?.total) {
//             console.log("skilloverview", result?.total);
//           }
//         } catch (error) {
//           console.error("Error fetching skill overview", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchentrepreneurialEdge();
//     }
//   }, [selectedCard]);

//   useEffect(() => {
//     if (skilloverview !== null) {
//       const targetPercentage = skilloverview || 0;
//       setPercentage(0);
//       const interval = setInterval(() => {
//         setPercentage((prev) => {
//           if (prev < targetPercentage) return prev + 1;
//           clearInterval(interval);
//           return prev;
//         });
//       }, 50);

//       return () => clearInterval(interval);
//     }
//   }, [skilloverview]); // This effect runs when skilloverview is updated

//   useEffect(() => {
//     if (selectedCard === 2) {
//       let animationFrame;
//       const animate = () => {
//         setAnimatedPercentage((prev) => {
//           if (prev < percentage) {
//             animationFrame = requestAnimationFrame(animate);
//             return Math.min(prev + 1, percentage);
//           }
//           cancelAnimationFrame(animationFrame);
//           return prev;
//         });
//       };

//       animationFrame = requestAnimationFrame(animate);

//       return () => cancelAnimationFrame(animationFrame);
//     }
//   }, [percentage, selectedCard]);

//   const radius = 15.91549430918954;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDasharray = `${
//     (animatedPercentage / 100) * circumference
//   } ${circumference}`;

//   return (
//     <>
//       <div className="flex lg:w-[100%] w-full">
//         <Sidebar />

//         <div className="bg-[#eff2f9] p-4 rounded-lg   my-4  md:ml-[300px]  w-full">
//           <ProfileHeader />
//           <div className="bg-white rounded-lg pb-10">
//             <div>
//               <div className="flex justify-between items-center px-2">
//                 <p className="text-[1.3rem] text-[#0e2b54] font-semibold">
//                   Analytics
//                 </p>
//                 <div className="relative">
//                   <div className="border-2 border-gray-300 rounded-lg px-4 py-1 flex items-center gap-2">
//                     <span>
//                       <Calendar size={15} />
//                     </span>
//                     This Week
//                     <button
//                       className="ml-2 flex items-center"
//                       onClick={toggleCalendar}
//                       aria-label="Toggle Calendar Dropdown"
//                     >
//                       <ChevronDown size={15} />
//                     </button>
//                   </div>
//                   {showCalendar && (
//                     <div className="absolute right-0 mt-2 bg-white  border border-gray-300 rounded-lg shadow-lg z-10 w-[300px] md:w-[500px]">
//                       <DatePicker className="w-full pl-80 -ml-[60px]"/>
//                       {/* margin-left: -298px; */}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="lg:grid-cols-3 grid m-4 grid-cols-1 gap-8 md:grid-cols-2">
//               <Cart onCardClick={handleCardClick} />
//             </div>
//             <div className="flex w-full gap-6 p-3 flex-wrap">
//               <div className="flex w-full gap-6 p-2 flex-wrap">
//                 <div className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] flex   w-full">
//                   {(selectedCard === 1 || selectedCard === null) && (
//                     <div className="rounded-lg flex flex-col w-full">
//                       {problemPilotpro.map((skill, index) => {
//                         return (
//                           <ul className="px-2 space-y-3" key={index}>
//                             <li className="border-2 rounded-xl px-2 py-2">
//                               <div className="flex items-center justify-between text-[#0e2b54] mx-2">
//                                 <p className="text-[1.3] font-semibold lg">
//                                   <b>
//                                     <h3>{skill?.name}</h3>
//                                   </b>{" "}
//                                 </p>
//                               </div>
//                               <div className="w-full bg-gray-200 rounded-xl h-10 my-1">
//                                 <div
//                                   className={`h-10 rounded-xl text-white grid items-center text-center text-xs font-semibold ${
//                                     progress[skill?.name] === 0
//                                       ? "text-black"
//                                       : ""
//                                   }`}
//                                   style={{
//                                     width: `${progress[skill?.name] || 0}%`, // Real-time progress data
//                                     backgroundColor: skill?.color,
//                                     transition: "width 0.8s ease-in-out", // Smooth transition
//                                   }}
//                                 >
//                                   {progress[skill?.name]}%
//                                 </div>
//                               </div>
//                               <div className="flex justify-between text-[#0e2b54] mt-2">
//                                 <b>
//                                   <span className="text-xs sm:text-base md:text-lg font-semibold">
//                                     {skill?.decrement}
//                                   </span>
//                                 </b>{" "}
//                                 <b>
//                                   <span className="text-xs sm:text-base md:text-lg font-semibold">
//                                     {skill?.increment}
//                                   </span>
//                                 </b>{" "}
//                               </div>
//                             </li>
//                           </ul>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//                 {/* left div */}
//                 <div className=" sm:w-[100%] md:w-[100%] lg:w-[50%] xl:w-[66%] flex  flex-col gap-5 w-full  ">
//                   {selectedCard === 3 && (
//                     <div className=" pb-6   rounded-lg shadow-md border flex flex-col gap-4   w-full">
//                       <p className="text-[1.3rem] text-[#0e2b54] font-bold p-4">
//                         Strategy Trial
//                       </p>
//                       <ul className="flex flex-col gap-4 px-2">
//                         {skills.map((skill, index) => (
//                           <li
//                             key={index}
//                             className="border-2 rounded-md px-4 py-2"
//                           >
//                             <div className="flex items-center justify-between text-[#0e2b54]  mx-2">
//                               <p className="text-[1.3] font-semibold">
//                                 {skill.name}
//                               </p>
//                               <p className="text-[1.3] font-semibold">
//                                 {skill.percentage}%
//                               </p>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2 my-1">
//                               <div
//                                 className="h-2 rounded-full transition-all duration-1000"
//                                 style={{
//                                   width: `${progress[skill.name] || 0}%`,
//                                   backgroundColor: skill.color,
//                                 }}
//                               ></div>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                   {selectedCard === 2 && (
//                     <div className="pb-6   rounded-lg shadow-md border flex flex-col gap-4  lg:w-[100%] w-full">
//                       <div class="text-center mb-4">
//                         <h3 class="text-[1.3rem] text-[#0e2b54] font-bold p-4">
//                           How Strong your Entrepreneurial skills?
//                         </h3>
//                       </div>
//                       <div class="flex justify-center">
//                         <div className="relative h-60 w-60">
//                           <svg
//                             className="h-full w-full -rotate-90 transform"
//                             viewBox="0 0 42 42"
//                           >
//                             {/* Background circle */}
//                             <circle
//                               cx="21"
//                               cy="21"
//                               r={radius}
//                               fill="transparent"
//                               stroke="#e2e8f0"
//                               strokeWidth="5"
//                             />
//                             {/* Animated circle */}
//                             <circle
//                               cx="21"
//                               cy="21"
//                               r={radius}
//                               fill="transparent"
//                               stroke="#ec4899"
//                               strokeWidth="3"
//                               strokeDasharray={strokeDasharray}
//                               strokeLinecap="round"
//                               style={{
//                                 transition: "stroke-dasharray 0.2s ease-in-out",
//                               }}
//                             />
//                           </svg>
//                           {/* Text in the center */}
//                           <div className="absolute inset-0 flex flex-col items-center justify-center">
//                             <span className="text-2xl font-bold">
//                               {animatedPercentage}%
//                             </span>
//                             <span className="text-sm text-gray-500">
//                               Creative
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 {/* right div */}
//                 <div className="flex-1 flex flex-col gap-5">
//                   {selectedCard === 3 && (
//                     <>
//                       <div className="shadow-lg rounded-lg px-2 pb-6   border flex flex-col gap-4 pt-4 h-[330px]  ">
//                         <p className="text-[1.3rem] text-[#0e2b54] font-bold ">
//                           Management Skills
//                         </p>

//                         <ManagementChart />
//                       </div>
//                     </>
//                   )}
//                   <div className="">
//                     {(selectedCard === 2 || selectedCard === 3) && (
//                       <div className="bg-gradient-to-br from-[#fc9aff] via-[#0068ff] to-[#10f6ff] rounded-lg shadow-lg h-[800px] justify-center flex">
//                         <div className="flex flex-col items-center justify-center p-6 text-white min-h-[200px] space-y-4">
//                           <h3 className="text-xl font-bold flex items-center gap-2">
//                             Upgrade plan
//                             <RocketIcon className="h-5 w-5" />
//                           </h3>
//                           <p className="text-sm text-center opacity-50  font-medium">
//                             Get 3 months free trial and
//                             <br />
//                             unlock all Pro features
//                           </p>
//                           <button className="bg-white text-[1rem] font-bold px-6 py-2 rounded-lg hover:bg-white/90   text-[#0e2b54]">
//                             Upgrade
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="mx-4">
//                 {(selectedCard === 1 || selectedCard === null) && (
//                   <div className="bg-gradient-to-br from-[#fc9aff] via-[#0068ff] to-[#10f6ff] rounded-lg shadow-lg h-[500px] w-fit justify-center flex">
//                     <div className="flex flex-col items-center justify-center p-6 text-white min-h-[200px] space-y-4">
//                       <h3 className="sm:text-2xl text-base font-bold flex items-center gap-2">
//                         Upgrade plan
//                         <RocketIcon className="h-5 w-5" />
//                       </h3>
//                       <p className="text-xl text-center opacity-50  font-medium">
//                         Get 3 months free trial and
//                         <br />
//                         unlock all Pro features
//                       </p>
//                       <button className="bg-white text-[1rem] font-bold px-6 py-2 rounded-lg hover:bg-white/90   text-[#0e2b54]">
//                         Upgrade
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Statics;


