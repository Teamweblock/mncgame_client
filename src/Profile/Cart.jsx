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





import React from "react";
import { Briefcase, File, Globe } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Problem",
    subtitle: "Pilot",
    gradientFrom: "#95a7f1",
    gradientTo: "#4e6ce8",
    bgColor: "#9faeec",
    icon: <Briefcase size={20} color="white" />,
    imageSrc: "/sta.jpg",
    progress: 20,
  },
  {
    id: 2,
    title: "Entrepreneurial",
    subtitle: "Edge",
    gradientFrom: "#ace6fe",
    gradientTo: "#40c5fe",
    bgColor: "#aee6fd",
    icon: <File size={20} color="white" />,
    imageSrc: "/sta2.jpg",
    progress: 20,
  },
  {
    id: 3,
    title: "Strategy",
    subtitle: "Trial",
    gradientFrom: "#a5ecee",
    gradientTo: "#26d4dd",
    bgColor: "#88e7ed",
    icon: <Globe size={20} color="white" />,
    imageSrc: "/sta3.jpg",
    progress: 0,
  },
];

const Cart = () => {
  return (
    <>
      {data.map((item) => (
        <div key={item.id} className="shadow-lg rounded-lg">
          <div
            className={`bg-gradient-to-r from-[${item.gradientFrom}] to-[${item.gradientTo}] p-4 rounded-t-lg`}
          >
            <div className="flex justify-between">
              <div
                className={`w-12 h-12 rounded-full flex justify-center items-center`}
                style={{ backgroundColor: item.bgColor }}
              >
                {item.icon}
              </div>
              <div>
                <img src={item.imageSrc} alt="" height={48} width={48} />
              </div>
            </div>
            <p className="text-[1.4rem] sm:text-[1.6rem] md:text-[1.2rem] lg:text-1xl xl:text-3xl font-semibold text-white shadow-sm mt-2 ">
              {item.title}
              <br />
              {item.subtitle}
            </p>
          </div>
          <div className="p-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[#0e2b54] mt-1">
              <p className="text-[1.3rem] sm:text-[1.5rem] md:text-[1rem] lg:text-[1.2rem]  font-semibold">Performance</p>
              <p className="text-[1.3rem] sm:text-[1.5rem] md:text-[1rem] lg:text-[1.2rem]  font-semibold">{item.progress}%</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cart;
