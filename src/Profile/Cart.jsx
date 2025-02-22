import React, { useEffect, useState } from "react";
import { Briefcase, File, Globe } from "lucide-react";
import { gameOverview } from "../utils/axiosInstance";

const Cart = ({ onCardClick, startDate, endDate }) => {
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
        if (startDate && endDate) {
          const skilloverview = await gameOverview({ startDate, endDate }); // Pass dates to API
          if (skilloverview?.datasets) {
            setSkillOverview(skilloverview?.datasets);
          }
        }
      } catch (error) {
        console.error("Error fetching skill overview", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsOverview();
  }, [startDate, endDate]); // Re-fetch data whenever start or end date changes

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
              className="p-4 rounded-t-lg"
              style={{
                background: `linear-gradient(to right, ${gradient?.from}, ${gradient?.to})`,
              }}
            >
              <div className="flex justify-between">
                <div
                  className="w-12 h-12 rounded-full flex justify-center items-center"
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
