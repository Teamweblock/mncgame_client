import React, { Profiler } from "react";
import { UserPen } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  SubscriptIcon,
  TableOfContents,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { AiOutlineLogout } from "react-icons/ai";
import vectorsmart from "../Assets/images/vectorsmart.png";
import shapeimg from "../Assets/images/Shape.png"

const Sidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      console.log("User logged out");
      navigate("/"); // Redirect to the signin page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="   w-[300px]  fixed  h-screen justify-between flex flex-col my-3 max-md:hidden ">
        <ul className="flex flex-col gap-2  ml-auto px-6">
          <li className="flex items-center gap-2    ">
            <Link to="/profile/overview" className="flex  items-center gap-2">
              <TableOfContents
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/profile/overview")
                    ? "text-[#0057ff]"
                    : "text-gray-400"
                }`}
              />
              <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
                Overview
              </p>
            </Link>
          </li>

          <li className="flex items-center gap-2">
            <Link to="/profile/statistics" className="flex  items-center gap-2">
              <ChartNoAxesColumnIncreasing
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/profile/statistics")
                    ? "text-[#0057ff]"
                    : "text-gray-400"
                }`}
              />
              <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
                Statistics
              </p>
            </Link>
          </li>

          {/* <li className="flex items-center gap-2 "> */}
            {/* <Link to="/subscription" className="flex  items-center gap-2"> */}
            {/* <SubscriptIcon size={20} strokeWidth={2} color="gray" /> */}
            {/* <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
              Subscription
            </p> */}
            {/* </Link> */}
          {/* </li> */}
          <li className="flex items-center gap-2">
            <Link to="/profile/update" className="flex  items-center gap-2">
              <UserPen
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/profile/update")
                    ? "text-[#0057ff]"
                    : "text-gray-400"
                }`}
              />
              <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
                Profile
              </p>
            </Link>
          </li>
          <li className="flex items-center gap-2" >
            {/* <Link to="/setting" className="flex  items-center gap-2"> */}
            <AiOutlineLogout size={20} strokeWidth={2} color="gray" />
            <button className="text-[#0e2b54] font-semibold text-[1.2rem] cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
            {/* </Link> */}
          </li>
        </ul>
        <div>
          <img src={shapeimg} alt="" width={100} height={50} />
        </div>

        <div className=" ml-auto px-6 mb-[14rem]">
          {/* <img src={vectorsmart} alt="" height={100} width={130} className="absolute z-0" /> */}
          {/* <p className="text-[1rem] relative mt-[135px]  font-bold text-[#0e2b54] ">
            Support 24/7
          </p> */}
          {/* <p className="text-[12px] -mt-2 font-semibold text-gray-400 text-center ">
            Contects us anytime
          </p> */}
          <div className="mx-auto w-full text-center">
            {/* <button className="bg-blue-500 mt-1 text-white font-semibold text-[1rem] px-4 py-1 rounded-full text-center">
              Help ?
            </button> */}
          </div>
        </div>
        {/* <div className=" ml-auto px-6 mb-20">
          <img src={vectorsmart} alt="" height={100} width={130} />
          <p className="text-[1.2rem] font-bold text-[#0e2b54] ">
            Support 24/7
          </p>
          <p className="text-[12px] font-semibold text-gray-400 text-center ">
            Contects us anytime
          </p>

          <div className="mx-auto w-full text-center">
            <button className="bg-blue-500 mt-1 text-white font-semibold text-[1rem] px-4 py-1 rounded-full text-center">
              Help ?
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
