import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import icon1 from "../Assets/gameimages/icon1.png";
import icon2 from "../Assets/gameimages/icon5.png";
import { getMeetRole } from "../utils/axiosInstance";

export default function RoleCarousel() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const [expandedRoleId, setExpandedRoleId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [roleData, setRoleData] = useState([]); // Store user profile data
  const [loading, setLoading] = useState(true); // Track loading state

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === roleData.length - 3 ? 0 : prevIndex + 1
    );
    setExpandedRoleId(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? roleData.length - 3 : prevIndex - 1
    );
    setExpandedRoleId(null);
  };

  const handleRoleClick = async (role) => {
    try {
      if (!role) throw new Error("Role selection is invalid.");

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(
          "You must be logged in to play! Please log in or register first."
        );
        return navigate("/");
      }

      localStorage.setItem("role", role);
      navigate(`/meetwaiting-player?role=${role}`);
    } catch (error) {
      console.error("Error during role selection:", error);
      toast.error(
        error?.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleCloseModal = () => setSelectedRole(null);

  useEffect(() => {
    const storedRole = localStorage?.getItem("role");
    if (storedRole) {
      localStorage?.removeItem("role");
      console.log("Role removed from localStorage on first load.");
    }
  }, []);

  useEffect(() => {
    const MeetRole = async () => {
      try {
        setLoading(true);
        const Data = await getMeetRole();
        if (Data && Array.isArray(Data.Roles)) {
          setRoleData(Data.Roles);
        } else {
          throw new Error("Invalid data received from the server.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch roles. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    MeetRole();
  }, []);
  console.log("roleData", roleData);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-white text-2xl">Loading roles...</p>
        </div>
      ) : roleData.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-500 text-2xl">
            No roles available. Please try again later.
          </p>
        </div>
      ) : (
        <div className="min-h-screen welcomepage-bg3 overflow-hidden">
          <img
            src={icon1}
            className="icon1-game3"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          />
          <img
            src={icon2}
            className="icon2-game3"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          />

          {/* Main content */}
          <a href="/">
            <img src="/mnclogo2.png" className="mnc-logo" />
          </a>
          <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
            <h1 className="tracking-widest mt-24 font-extrabold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center block xl:hidden">
              YOUR ROLE
            </h1>

            {/* Cards container with navigation buttons */}
            <div className="flex items-center justify-center gap-3 mt-28 relative w-full">
              {/* Previous button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-md"
                // className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              {/* Cards */}
              <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 overflow-hidden">
                {[0, 1, 2].map((offset) => {
                  const index = (currentIndex + offset) % roleData?.length;
                  const role = roleData[index];
                  return (
                    <card
                      key={role.id}
                      className={`flex flex-col items-center p-4 md:p-6 lg:p-8 bg-white rounded-3xl transition-all duration-300 transform hover:scale-105
                    ${
                      offset === 0
                        ? "w-64 sm:w-60 md:w-60 lg:w-64 xl:w-80 h-fit"
                        : offset === 1
                        ? "hidden sm:flex w-60 h-96"
                        : "hidden lg:flex w-56 sm:w-48 md:w-52 lg:w-60 xl:w-64 h-[350px]"
                    }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleClick(role?.name);
                      }}
                    >
                      <div className="relative w-full aspect-square mb-4 md:mb-6">
                        <div className="absolute inset-0 border-2 border-[#2C7EFF] rounded-xl">
                          <img
                            src={role?.profileimg}
                            alt={role?.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      </div>
                      <h2
                        className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 ${
                          role?.color || "text-black"
                        }`}
                        style={{
                          fontFamily: "Bebas Neue",
                          verticalAlign: "Cap height",
                        }}
                      >
                        {role?.name}
                      </h2>
                      <button
                        className={`${
                          role?.buttonColor || "bg-blue-500"
                        } text-white font-medium px-3 py-2 rounded-full hover:opacity-90 transition-opacity`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRole(role);
                        }}
                      >
                        About Role
                      </button>
                    </card>
                  );
                })}
              </div>
              {/* Next button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-md"
                // className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
              {/* Role text */}
              <h1 className="text-7xl mb-[280px] tracking-widest -mr-[150px] font-extrabold text-white text-center hidden xl:block">
                YOUR
              </h1>
              <h1 className="text-7xl rotate-90 tracking-widest font-extrabold -mr-[375px] text-white text-center hidden xl:block">
                ROLE
              </h1>
            </div>

            {/* Navigation dots */}
            <div className="flex gap-2 mt-12">
              {roleData.slice(0, roleData?.length - 2).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Start meeting button */}
            {/* <button className="mt-12 bg-[#FF8439] text-white font-medium px-12 py-3 rounded-full hover:opacity-90 transition-opacity text-xl">
          START MEETING
        </button> */}

            {/* Company name */}
            <div className="absolute bottom-8 right-8 text-white">
              <p className="text-sm tracking-widest">
                MULTI <span className="">NETWORKING COMPANY</span>
              </p>
            </div>
          </div>

          {/* open model */}
          {selectedRole && (
            // <div className="justify-center items-center">
            <div className="justify-center items-center sm:block hidden">
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-96 h-fit p-4">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <img
                      src={selectedRole?.profileimg}
                      alt={`${selectedRole?.name} profile`}
                      className="w-96 h-full object-cover  rounded-full mx-auto mb-4 "
                    />
                    <p
                      className={`${selectedRole?.color} text-8xl text-center h-[84px]  leading-[144px] font-medium`}
                      style={{
                        fontFamily: "Bebas Neue",
                        verticalAlign: "Cap height",
                      }}
                    >
                      {selectedRole?.name}
                    </p>
                  </div>
                </div>
                <div className="relative backdrop-blur-sm bg-white/70  rounded-lg shadow-lg py-8 px-3 w-[40%]  flex">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-[#FF8439] text-2xl font-normal"
                  >
                    <CloseIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#FF8439]"
                    />
                  </button>

                  <div className=" p-4 flex flex-col">
                    <h2 className="text-2xl font-bold text-[#FF8439] mb-4">
                      About Role
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {selectedRole?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedRole && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  md:hidden">
              <div className="relative w-full max-w-[95%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] backdrop-blur-sm bg-white/70 rounded-lg shadow-lg p-4 md:p-6 lg:p-8 flex flex-col items-center">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-[#FF8439] text-xl md:text-2xl"
                >
                  <CloseIcon sx={{ fontSize: 30 }} className="text-[#FF8439]" />
                </button>
                <img
                  src={selectedRole?.profileimg}
                  alt={`${selectedRole?.name} profile`}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-full mb-6"
                />
                <p
                  className={`${selectedRole?.color} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-4`}
                  style={{
                    fontFamily: "Bebas Neue",
                    verticalAlign: "Cap height",
                  }}
                >
                  {selectedRole?.name}
                </p>
                <div className="w-full text-center px-2 md:px-4 lg:px-6">
                  <h2 className="text-xl md:text-2xl font-bold text-[#FF8439] mb-4">
                    About Role
                  </h2>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {selectedRole?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
