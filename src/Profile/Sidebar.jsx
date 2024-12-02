import React, { Profiler } from "react";
import { UserPen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  SubscriptIcon,
  TableOfContents,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="   w-[300px]  fixed  h-[100%] justify-between flex flex-col my-3 max-md:hidden ">
        <ul className="flex flex-col gap-3  ml-auto px-6">
          <li className="flex items-center gap-2    ">
            <Link to="/profile/overview" className="flex  items-center gap-2">
              <TableOfContents
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/") ? "text-[#0057ff]" : "text-gray-400"
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
                  isActive("/statistics") ? "text-[#0057ff]" : "text-gray-400"
                }`}
              />
              <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
                Statistics
              </p>
            </Link>
          </li>

          <li className="flex items-center gap-2 ">
            {/* <Link to="/subscription" className="flex  items-center gap-2"> */}
            <SubscriptIcon size={20} strokeWidth={2} color="gray" />
            <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
              Subscription
            </p>
            {/* </Link> */}
          </li>
          <li className="flex items-center gap-2">
            <Link
              to="/profile/update-profile"
              className="flex  items-center gap-2"
            >
              <UserPen
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/profile") ? "text-[#0057ff]" : "text-gray-400"
                }`}
              />
              <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
                Profile
              </p>
            </Link>
          </li>
          <li className="flex items-center gap-2">
            {/* <Link to="/setting" className="flex  items-center gap-2"> */}
            <Settings size={20} strokeWidth={2} color="gray" />
            <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
              Setting
            </p>
            {/* </Link> */}
          </li>
        </ul>
        <div>
          <img src="./side.jpg" alt="" width={125} height={90} />
        </div>

        <div className=" ml-auto px-6 mb-20">
          <img src="./s.jpg" alt="" height={100} width={130} />
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
