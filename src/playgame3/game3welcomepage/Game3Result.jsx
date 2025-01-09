import React, { useEffect, useState } from "react";
import logo from "../../Assets/gameimages/mnclogo2.png";
import { useNavigate } from "react-router-dom";

const ProgressCard = () => {
  const [counts, setCounts] = useState({
    fundamental: 0,
    strategic: 0,
    management: 0,
    creative: 0,
    overall: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const durations = {
      fundamental: 5,
      strategic: 95,
      management: 37,
      creative: 80,
      overall: 44,
    };

    Object.keys(durations).forEach((key) => {
      const duration = durations[key];
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += 5; // Increase count faster
        if (currentCount > duration) {
          clearInterval(interval);
          setCounts((prevCounts) => ({ ...prevCounts, [key]: duration })); // Ensure final value is set
        } else {
          setCounts((prevCounts) => ({ ...prevCounts, [key]: currentCount }));
        }
      }, 10); // Reduce interval timing
    });
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center game3result"
      // style={{
      //   backgroundImage:
      //     "url('https://img.freepik.com/fotos-premium/oficina-interior-ventanas-panoramicas-vista-ciudad-lugar-trabajo-concepto-tecnologico_1026950-98032.jpg')",
      // }}
    >
      {/* Header Section */}
      <img src="/mnclogo2.png" className="mnc-logo" />
      <div className="text-center mb-8 mt-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">CONGRATULATIONS</h1>
        <p className="text-white mt-2">
          Great work! Here’s how your peers rated your performance. Let’s see
          your progress!
        </p>
      </div>

      <div className="w-full max-w-6xl px-4">
        {/* First Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="relative bg-white p-4 text-center shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#AE00FF] "></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average of your fundamental (Collaboration, Critical
                thinking, Communication, E.Q) skills is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts.fundamental}%
              </h2>
            </div>
          </div>
          <div className="relative bg-white p-4  shadow-md text-center hover:scale-105  hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#00A8FF] "></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average score of your Strategic thinking is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts.strategic}%
              </h2>
            </div>
          </div>
          <div className="relative bg-white p-4 text-center shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#A2FF00] "></div>
            <div className="content">
              <p className="text-sm font-medium text-black">
                The average of your Management (Risk, Stakeholder, Relationship,
                Crisis, and Time) skills is
              </p>
              <h2 className="text-3xl font-bold text-black ">
                {counts.management}%
              </h2>
            </div>
          </div>
        </div>

        {/* Second Row: 2 Cards with extra space between */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-1 md:gap-44 justify-center items-center mx-auto w-[100%] sm:w-[90%]">
          <div className="relative bg-white p-4 shadow-md hover:scale-105 hover:shadow-lg  text-center transition-all duration-300 ease-in-out">
            <div className="absolute top-0 left-0 right-0 h-4 bg-yellow-600 "></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average score of your creative and Innovative skills is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts.creative}%
              </h2>
            </div>
          </div>
          <div className="relative bg-white p-4 shadow-md hover:scale-105 hover:shadow-lg text-center transition-all duration-300 ease-in-out ">
            {" "}
            {/* Increased margin-left to ml-48 and added h-32 to decrease height */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gray-600"></div>
            <div className="content">
              <p className="text-lg font-medium text-black">
                The average score of your overall impact and contribution is
              </p>
              <h2 className="text-3xl font-bold text-black mt-2">
                {counts.overall}%
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-center gap-6 mt-8">
        <button onClick={() => navigate("/chooserole")} className="bg-red-500 text-white px-10 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300 ease-in-out">
          Play Again
        </button>
        <button onClick={() => navigate("/games")} className="bg-white text-red-500 px-10 py-2 rounded-full text-lg font-semibold shadow-md  hover:scale-105 transition-all duration-300 ease-in-out">
          Exit
        </button>
      </div>
      {/* <div className="absolute   bottom-4 right-12 text-white sm:flex sm:justify-center sm:items-center">
          <p className="text-sm tracking-widest">
            MULTI <span className="">NETWORKING COMPANY</span>
          </p>
        </div> */}
    </div>
  );
};

export default ProgressCard;

// import React from "react";

// const ProgressCard = () => {
//   return (
//     <div
//       className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://img.freepik.com/fotos-premium/oficina-interior-ventanas-panoramicas-vista-ciudad-lugar-trabajo-concepto-tecnologico_1026950-98032.jpg')", // Replace with your background image URL
//       }}
//     >
//       {/* Header Section */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-extrabold text-white">CONGRATULATIONS</h1>
//         <p className="text-white mt-2">
//           Great work! Here’s how your peers rated your performance. Let’s see
//           your progress!
//         </p>
//       </div>

//       {/* Content Section */}
//       <div className="w-full max-w-6xl px-4">
//         {/* First Row: 3 Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           <div className="relative bg-purple-100 p-4 rounded-lg shadow-md">
//             <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600 rounded-t-lg"></div>
//             <p className="text-sm font-medium text-gray-700">
//               The average of your fundamental (Collaboration, Critical thinking,
//               Communication, E.Q) skills is
//             </p>
//             <h2 className="text-3xl font-bold text-purple-600 mt-2">05%</h2>
//           </div>
//           <div className="relative bg-blue-100 p-4 rounded-lg shadow-md">
//             <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 rounded-t-lg"></div>
//             <p className="text-sm font-medium text-gray-700">
//               The average score of your Strategic thinking is
//             </p>
//             <h2 className="text-3xl font-bold text-blue-600 mt-2">95%</h2>
//           </div>
//           <div className="relative bg-green-100 p-4 rounded-lg shadow-md">
//             <div className="absolute top-0 left-0 right-0 h-1 bg-green-600 rounded-t-lg"></div>
//             <p className="text-sm font-medium text-gray-700">
//               The average of your Management (Risk, Stakeholder, Relationship,
//               Crisis, and Time) skills is
//             </p>
//             <h2 className="text-3xl font-bold text-green-600 mt-2">37%</h2>
//           </div>
//         </div>

//         {/* Second Row: 2 Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
//           <div className="relative bg-yellow-100 p-4 rounded-lg shadow-md">
//             <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-600 rounded-t-lg"></div>
//             <p className="text-sm font-medium text-gray-700">
//               The average score of your creative and Innovative skills is
//             </p>
//             <h2 className="text-3xl font-bold text-yellow-600 mt-2">80%</h2>
//           </div>
//           <div className="relative bg-gray-100 p-4 rounded-lg shadow-md">
//             <div className="absolute top-0 left-0 right-0 h-1 bg-gray-600 rounded-t-lg"></div>
//             <p className="text-sm font-medium text-gray-700">
//               The average score of your overall impact and contribution is
//             </p>
//             <h2 className="text-3xl font-bold text-gray-600 mt-2">44%</h2>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <div className="flex justify-center gap-6 mt-8">
//         <button className="bg-red-500 text-white px-10 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-red-600">
//           Play Again
//         </button>
//         <button className="bg-white text-red-500 px-10 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-red-100">
//           Exit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProgressCard;
