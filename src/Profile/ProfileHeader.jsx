import React from 'react'
import { Profiler } from "react";
import { UserPen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  SubscriptIcon,
  TableOfContents,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

const ProfileHeader = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
  return (
    <>

<div className="    md:hidden ">
        <ul className="flex justify-evenly   gap-6 px-6">
          <li className="flex items-center gap-2    ">
            <Link to="/profile/overview" className="flex  items-center gap-2">
              {/* <TableOfContents
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/profile/overview") ? "text-[#0057ff]" : "text-gray-400"
                }`}
              /> */}
              <p className={`text-[#0e2b54] font-semibold text-[1.2rem] ${
                  isActive("/profile/overview") ? "text-[#0057ff]" : "text-gray-400"
                } `}>
                Overview
              </p>
            </Link>
          </li>

          <li className="flex items-center gap-2">
            <Link to="/profile/statistics" className="flex  items-center gap-2">
              {/* <ChartNoAxesColumnIncreasing
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/profile/statistics") ? "text-[#0057ff]" : "text-gray-400"
                }`}
              /> */}
              <p className={`text-[#0e2b54] font-semibold text-[1.2rem] ${
                  isActive("/profile/statistics") ? "text-[#0057ff]" : "text-gray-400"
                }`}>
                Statistics
              </p>
            </Link>
          </li>

          {/* <li className="flex items-center gap-2 ">
            <Link to="/subscription" className="flex  items-center gap-2">
            <SubscriptIcon size={20} strokeWidth={2} color="gray" />
            <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
              Subscription
            </p>
            </Link>
          </li> */}
          <li className="flex items-center gap-2">
            <Link to="/profile/update" className="flex  items-center gap-2">
              {/* <UserPen
                size={20}
                strokeWidth={2}
                className={`${
                  isActive("/profile/update") ? "text-[#0057ff]" : "text-gray-400"
                }`}
              /> */}
              <p className={`text-[#0e2b54] font-semibold text-[1.2rem] ${
                  isActive("/profile/update") ? "text-[#0057ff]" : "text-gray-400"
                }`}>
                Profile
              </p>
            </Link>
          </li>
          {/* <li className="flex items-center gap-2">
            <Link to="/setting" className="flex  items-center gap-2">
            <Settings size={20} strokeWidth={2} color="gray" />
            <p className="text-[#0e2b54] font-semibold text-[1.2rem]">
              Setting
            </p>
            </Link>
          </li> */}
        </ul>
       

      
      </div>

    </>
  )
}

export default ProfileHeader