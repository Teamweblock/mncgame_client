import React, { useEffect, useState } from "react";
import { Briefcase, File, Globe } from "lucide-react";
import { gameOverview } from "../utils/axiosInstance";

const Cart = ({ onCardClick }) => {
  const [skillOverview, setSkillOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressValues, setProgressValues] = useState({});

  const cardConfig = {
    "Problem Pilot": {
      id: 1,
      icon: <Briefcase size={20} color="white" />,
      gradient: { from: "#95a7f1", to: "#4e6ce8", bg: "#9faeec" },
      image: "/sta.jpg",
    },
    "Entrepreneurial Edge": {
      id: 2,
      icon: <File size={20} color="white" />,
      gradient: { from: "#ace6fe", to: "#40c5fe", bg: "#aee6fd" },
      image: "/sta2.jpg",
    },
    "Strategy Trial": {
      id: 3,
      icon: <Globe size={20} color="white" />,
      gradient: { from: "#a5ecee", to: "#26d4dd", bg: "#88e7ed" },
      image: "/sta3.jpg",
    },
  };

  useEffect(() => {
    const fetchSkillsOverview = async () => {
      try {
        const skilloverview = await gameOverview();
        if (skilloverview?.datasets) {
          setSkillOverview(skilloverview.datasets);
        }
      } catch (error) {
        console.error("Error fetching skill overview", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsOverview();
  }, []);

  useEffect(() => {
    const intervals = [];

    skillOverview.forEach((item) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress < item.Totaldata) {
          currentProgress += 1;
          setProgressValues((prevValues) => ({
            ...prevValues,
            [item.label]: currentProgress,
          }));
        } else {
          clearInterval(interval);
        }
      }, 30);
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [skillOverview]);

  return (
    <>
      {skillOverview.map((item) => {
        const { icon, gradient, image, id } = cardConfig[item?.label] || {};

        return (
          <div
            key={id}
            className="shadow-lg rounded-lg"
            onClick={() => onCardClick(id)}
          >
            <div
              className={`bg-gradient-to-r from-[${gradient?.from}] to-[${gradient?.to}] p-4 rounded-t-lg`}
            >
              <div className="flex justify-between">
                <div
                  className={`w-12 h-12 rounded-full flex justify-center items-center`}
                  style={{ backgroundColor: gradient?.bg }}
                >
                  {icon}
                </div>
                <div>
                  <img src={image} alt={item?.label} height={48} width={48} />
                </div>
              </div>
              <p className="text-[1.4rem] sm:text-[1.6rem] md:text-[1.2rem] lg:text-1xl xl:text-3xl font-semibold text-white shadow-sm mt-2">
                {item?.label}
              </p>
            </div>
            <div className="p-4">
              {item.Totaldata > 0 ? (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${progressValues[item?.label] || 0}%`,
                    }}
                  ></div>
                </div>
              ) : (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-300 h-2 rounded-full"></div>
                </div>
              )}
              <div className="flex items-center justify-between text-[#0e2b54] mt-1">
                <p className="text-[1.3rem] sm:text-[1.5rem] md:text-[1rem] lg:text-[1.2rem] font-semibold">
                  Performance
                </p>
                <p className="text-[1.3rem] sm:text-[1.5rem] md:text-[1rem] lg:text-[1.2rem] font-semibold">
                  {item?.Totaldata}%
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Cart;

// import React, { useEffect, useState } from "react";
// import { Briefcase, File, Globe } from "lucide-react";
// import { gameOverview } from "../utils/axiosInstance";

// const data = [
//   {
//     id: 1,
//     title: "Problem",
//     subtitle: "Pilot",
//     gradientFrom: "#95a7f1",
//     gradientTo: "#4e6ce8",
//     bgColor: "#9faeec",
//     icon: <Briefcase size={20} color="white" />,
//     imageSrc: "/sta.jpg",
//     progress: 80,
//   },
//   {
//     id: 2,
//     title: "Entrepreneurial",
//     subtitle: "Edge",
//     gradientFrom: "#ace6fe",
//     gradientTo: "#40c5fe",
//     bgColor: "#aee6fd",
//     icon: <File size={20} color="white" />,
//     imageSrc: "/sta2.jpg",
//     progress: 70,
//   },
//   {
//     id: 3,
//     title: "Strategy",
//     subtitle: "Trial",
//     gradientFrom: "#a5ecee",
//     gradientTo: "#26d4dd",
//     bgColor: "#88e7ed",
//     icon: <Globe size={20} color="white" />,
//     imageSrc: "/sta3.jpg",
//     progress: 0,
//   },
// ];

// const Cart = ({ onCardClick }) => {
//   const [skillOverview, setSkillOverview] = useState([]);
//   const [loading, setLoading] = useState(true); // Track loading state

//   useEffect(() => {
//     const fetchSkillsOverview = async () => {
//       try {
//         const skilloverview = await gameOverview(); // Fetch API data
//         console.log("skilloverview", skilloverview?.datasets);

//         if (skilloverview) {
//           setSkillOverview(skilloverview?.datasets); // Store API response in state
//         }
//       } catch (error) {
//         console.error("Error fetching skill overview", error);
//       } finally {
//         setLoading(false); // Stop loading after data is fetched
//       }
//     };

//     fetchSkillsOverview();
//   }, []);
//   const [progressValues, setProgressValues] = useState(
//     data.reduce((acc, item) => {
//       acc[item.id] = 0; // Initial progress value is set to 0
//       return acc;
//     }, {})
//   );

//   useEffect(() => {
//     data.forEach((item) => {
//       let currentProgress = 0;
//       const interval = setInterval(() => {
//         if (currentProgress < item.progress) {
//           currentProgress += 1;
//           setProgressValues((prevValues) => ({
//             ...prevValues,
//             [item.id]: currentProgress,
//           }));
//         } else {
//           clearInterval(interval);
//         }
//       }, 30); // Adjust the speed of animation here
//     });
//   }, []);

//   return (
//     <>
//       {data.map((item) => (
//         <div
//           key={item.id}
//           className="shadow-lg rounded-lg"
//           onClick={() => onCardClick(item.id)}
//         >
//           <div
//             className={`bg-gradient-to-r from-[${item.gradientFrom}] to-[${item.gradientTo}] p-4 rounded-t-lg`}
//           >
//             <div className="flex justify-between">
//               <div
//                 className={`w-12 h-12 rounded-full flex justify-center items-center`}
//                 style={{ backgroundColor: item.bgColor }}
//               >
//                 {item.icon}
//               </div>
//               <div>
//                 <img src={item.imageSrc} alt="" height={48} width={48} />
//               </div>
//             </div>
//             <p className="text-[1.4rem] sm:text-[1.6rem] md:text-[1.2rem] lg:text-1xl xl:text-3xl font-semibold text-white shadow-sm mt-2 ">
//               {item.title}
//               <br />
//               {item.subtitle}
//             </p>
//           </div>
//           <div className="p-4">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//                 // style={{ width: `${item.progress}%` }}
//                 style={{
//                   width: `${progressValues[item.id]}%`,
//                 }}
//               ></div>
//             </div>
//             <div className="flex items-center justify-between text-[#0e2b54] mt-1">
//               <p className="text-[1.3rem] sm:text-[1.5rem] md:text-[1rem] lg:text-[1.2rem]  font-semibold">
//                 Performance
//               </p>
//               <p className="text-[1.3rem] sm:text-[1.5rem] md:text-[1rem] lg:text-[1.2rem]  font-semibold">
//                 {item.progress}%
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Cart;

// import { Calendar, File } from "lucide-react";
// import React from "react";
// import { Briefcase, Globe } from "lucide-react";

// import { ChevronDown } from "lucide-react";
// const Cart = () => {
//   return (
//     <>
//       <div className=" shadow-lg rounded-lg">
//         <div className="bg-gradient-to-r from-[#95a7f1] to-[#4e6ce8] p-2 lg:p-3 rounded-t-lg">
//           <div className="flex  justify-between ">
//             <div className="w-12 h-12 rounded-full bg-[#9faeec] flex justify-center items-center ">
//               <Briefcase size={20} color="white" />
//             </div>
//             <div>
//               <img src="./sta.jpg" alt="" height={48} width={48} />
//             </div>
//           </div>
//           <p className="lg:text-3xl font-semibold text-white shadow-sm mt-2 text-[1.4rem]">
//             Problem
//             <br />
//             Pilot
//           </p>
//         </div>
//         <div class="m-5">
//           <div class="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-blue-500 h-2 rounded-full"
//               style={{ width: "40%" }}
//             ></div>
//           </div>
//           <div className="flex items-center justify-between text-[#0e2b54] mt-1 ">
//             <p class="text-[1.3] font-semibold">Performance</p>
//             <p class="text-[1.3] font-semibold">40%</p>
//           </div>
//         </div>
//       </div>
//       <div className=" shadow-lg rounded-lg">
//         <div className="bg-gradient-to-r from-[#ace6fe] to-[#40c5fe] p-2 lg:p-3 rounded-t-lg">
//           <div className="flex  justify-between ">
//             <div className="w-12 h-12 rounded-full bg-[#aee6fd] flex justify-center items-center ">
//               <File size={20} color="white" />
//             </div>
//             <div>
//               <img src="./sta2.jpg" alt="" height={48} width={48} />
//             </div>
//           </div>
//           <p className="lg:text-3xl font-semibold text-white shadow-sm mt-2 text-[1.4rem]">
//             Entrepreneurial
//             <br />
//             Edge
//           </p>
//         </div>
//         <div class="m-5">
//           <div class="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-blue-500 h-2 rounded-full"
//               style={{ width: "60%" }}
//             ></div>
//           </div>
//           <div className="flex items-center justify-between text-[#0e2b54] mt-1 ">
//             <p class="text-[1.3] font-semibold">Performance</p>
//             <p class="text-[1.3] font-semibold">60%</p>
//           </div>
//         </div>
//       </div>
//       <div className=" shadow-lg rounded-lg">
//         <div className="bg-gradient-to-r from-[#a5ecee] to-[#26d4dd]  p-2 lg:p-3 rounded-t-lg">
//           <div className="flex  justify-between ">
//             <div className="w-12 h-12 rounded-full bg-[#88e7ed] flex justify-center items-center ">
//               <Globe size={20} color="white" />
//             </div>
//             <div>
//               <img src="./sta3.jpg" alt="" height={48} width={48} />
//             </div>
//           </div>
//           <p className="lg:text-3xl font-semibold text-white shadow-sm mt-2 text-[1.4rem]">
//             Strategy
//             <br />
//             Trial
//           </p>
//         </div>
//         <div class="m-5 ">
//           <div class="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-blue-500 h-2 rounded-full"
//               style={{ width: "20%" }}
//             ></div>
//           </div>
//           <div className="flex items-center justify-between text-[#0e2b54] mt-1 ">
//             <p class="text-[1.3] font-semibold">Performance</p>
//             <p class="text-[1.3] font-semibold">20%</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;
