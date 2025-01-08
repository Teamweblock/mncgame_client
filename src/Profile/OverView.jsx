import { CandyCane, ChevronDown, Settings,  } from "lucide-react";
import React from "react";
import { CircleX } from "lucide-react";
import { UserPen } from "lucide-react";
import OverviewChart from "./OverviewChart";
import SkillsOverview from "./SkillsOverview";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";


const Overview = () => {
  return (
    <>
    
    <div className="flex  lg:w-[90%] w-full">
        <Sidebar />

   
      <main className="  my-4  md:ml-[300px] w-full ">
      <ProfileHeader/>
        <div className="flex gap-6  flex-wrap">
          {/* Customer Analysis Card */}
          <div className="bg-[#eff2f9] p-4 rounded-lg shadow  w-full sm:w-full md:w-[100%] lg:w-[100%] xl:w-[75%]">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-[1.3rem] text-[#3f3f3f] font-bold">
                    Customer Analysis
                  </h2>
                  <p className="text-[1rem] font-medium text-gray-400">
                    Week Analysis
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
              <OverviewChart />
            </div>
          </div>

          <div className="bg-[#eff2f9] p-4 rounded-lg shadow flex-1">
            <div className="flex gap-2 ml-auto justify-end">
              <Settings color="gray" size={20} />
              <CircleX color="gray" size={20} />
            </div>
            <div className=" items-center justify-center flex flex-col mt-2">
              <div className="h-12 w-12 rounded-full bg-[#fc563e] " />

              <h3 className="font-bold text-[1rem] text-[#0e2b54] mt-1">
                John Dew
              </h3>
              {/* <p className="text-[13px] text-gray-400 font-medium">Recent Activity</p> */}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-[15px] text-[#0e2b54] font-medium">
                Recent Activity
              </p>
              <p className="text-[12px] text-[#fc563e] font-medium">View All</p>
            </div>
            <hr className="w-full border-t-0 bg-[#fc563e] h-[2px] mt-1" />
            <div className="mt-4 ">
              {["Problem Pilot", "Entrepreneurial Edge", "Strategy Trial"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 mb-1">
                    <div className="h-8 w-8 rounded-md bg-white flex justify-center items-center ">
                      <UserPen size={20} color="gray" />
                    </div>
                    <div>
                      <div className="text-[15px] text-[#0e2b54] font-semibold">
                        {item}
                      </div>
                      <div className="text-[11px] text-blue-500 font-medium">
                        15 Sept 2024, 9:30 am
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#eff2f9] p-4 rounded-lg my-5">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[1.3rem] font-bold text-[#3f3f3f]">
                Skills Overview
              </h2>
              <button className="px-3 py-1 text-sm border border-blue-400 rounded-full font-bold flex items-center gap-2 text-[#3f3f3f] hover:bg-gray-50">
                Leadership
                <span>
                  <ChevronDown size={20} />
                </span>
              </button>
            </div>
            <SkillsOverview />
          </div>
        </div>

        <div className="flex gap-6 flex-wrap">
          <div className="bg-[#eff2f9] p-4 rounded-lg shadow md:w-[25%] w-full h-[350px]"></div>
          <div className="bg-[#eff2f9] p-4 rounded-lg shadow h-[350px] flex-1"></div>
        </div>
      </main>
      </div>
    </>
  );
};

export default Overview;
