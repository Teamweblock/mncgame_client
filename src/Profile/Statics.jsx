import { Calendar, RocketIcon, ChevronDown } from "lucide-react";
import React from "react";
// import UpgradeCard from "../Components/UpgradeCard";
import ManagementChart from "./ManagementChart";
import Cart from "./Cart";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";

const Statics = () => {
  const skills = [
    { name: "Critical Thinking", percentage: 70, color: "#4e6ce8" },
    { name: "Collaboration", percentage: 50, color: "#25d3dd" },
    { name: "E.Q.", percentage: 30, color: "#f7be2f" },
    { name: "Communication", percentage: 90, color: "#d51aff" },
  ];

  return (
    <>
      <div className="flex lg:w-[90%] w-full">
        <Sidebar />

  
      <div className="bg-[#eff2f9] p-4 rounded-lg   my-4  md:ml-[300px]  w-full">
        <ProfileHeader/>
        <div className="bg-white rounded-lg pb-10">
          <div className="flex justify-between items-center p-4">
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
          <div className="lg:grid-cols-3 grid m-4 grid-cols-1 gap-8 md:grid-cols-2 ">
            <Cart />
          </div>

          {/* //// */}

          <div className="flex w-full gap-6 p-4 flex-wrap">
            {/* left div */}
            <div className=" lg:w-[66%] flex  flex-col gap-5 w-full  ">
              <div className=" pb-6   rounded-lg shadow-md border flex flex-col gap-4   w-full">
                <p className="text-[1.3rem] text-[#0e2b54] font-bold p-4">
                  Fundamental Skills
                </p>
                <ul className="flex flex-col gap-4 px-4">
                  {skills.map((skill, index) => (
                    <li key={index} className="border-2 rounded-md px-4 py-2">
                      <div className="flex items-center justify-between text-[#0e2b54]  mx-2">
                        <p className="text-[1.3] font-semibold">{skill.name}</p>
                        <p className="text-[1.3] font-semibold">
                          {skill.percentage}%
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 my-1">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${skill.percentage}%`,
                            backgroundColor: skill.color,
                          }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:grid-cols-3 grid m-4 grid-cols-1 gap-8 md:grid-cols-2 ">
              <Cart />
            </div>

            {/* //// */}

            <div className="flex w-full gap-6 p-4 flex-wrap">
              {/* left div */}
              <div className=" lg:w-[66%] flex  flex-col gap-5 w-full  ">
                <div className=" pb-6   rounded-lg shadow-md border flex flex-col gap-4   w-full">
                  <p className="text-[1.3rem] text-[#0e2b54] font-bold p-4">
                    Fundamental Skills
                  </p>
                  <ul className="flex flex-col gap-4 px-4">
                    {skills.map((skill, index) => (
                      <li key={index} className="border-2 rounded-md px-4 py-2">
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
                            className="h-2 rounded-full"
                            style={{
                              width: `${skill.percentage}%`,
                              backgroundColor: skill.color,
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pb-6   rounded-lg shadow-md border flex flex-col gap-4  lg:w-[85%] w-full">
                  <div class="text-center mb-4">
                    <h3 class="text-[1.3rem] text-[#0e2b54] font-bold p-4">
                      How Strong your Entrepreneurial skills?
                    </h3>
                  </div>
                  <div class="flex justify-center">
                    <div class="relative h-60 w-60">
                      <svg
                        class="h-full w-full -rotate-90 transform"
                        viewBox="0 0 42 42"
                      >
                        <circle
                          cx="21"
                          cy="21"
                          r="15.91549430918954"
                          fill="transparent"
                          stroke="#e2e8f0"
                          stroke-width="3"
                        />
                        <circle
                          cx="21"
                          cy="21"
                          r="15.91549430918954"
                          fill="transparent"
                          stroke="#ec4899"
                          stroke-width="3"
                          stroke-dasharray="36.5 100"
                          stroke-linecap="round"
                        />
                      </svg>
                      <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-2xl font-bold">73%</span>
                        <span class="text-sm text-gray-500">Creative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* right div */}
              <div className="flex-1 flex flex-col gap-5">
                <div className="shadow-lg rounded-lg px-4 pb-6   border flex flex-col gap-4 pt-4 h-72  ">
                  <p className="text-[1.3rem] text-[#0e2b54] font-bold ">
                    Management Skills
                  </p>

                  <ManagementChart />
                </div>
                <div className="    ">
                  <div className="bg-gradient-to-br from-[#fc9aff] via-[#0068ff] to-[#10f6ff] rounded-lg shadow-lg h-[400px] justify-center flex">
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
            {/* right div */}
            <div className="flex-1 flex flex-col gap-5">
              <div className="shadow-lg rounded-lg px-4 pb-6   border flex flex-col gap-4 pt-4 h-80  ">
                <p className="text-[1.3rem] text-[#0e2b54] font-bold ">
                  Management Skills
                </p>

                <ManagementChart />
              </div>
              <div className="    ">
                <div className="bg-gradient-to-br from-[#fc9aff] via-[#0068ff] to-[#10f6ff] rounded-lg shadow-lg h-[400px] justify-center flex">
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
    </>
  );
}

export default Statics;
