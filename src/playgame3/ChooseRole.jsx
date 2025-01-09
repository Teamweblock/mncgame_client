import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import icon1 from "../Assets/gameimages/icon1.png";
import icon2 from "../Assets/gameimages/icon5.png";
import logo from "../Assets/gameimages/mnclogo2.png";

const roles = [
  {
    id: 1,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "CEO",
    description:
      "The Chief Executive Officer (CEO) is the highest-ranking executive in an organization, responsible for setting the company’s vision, mission, and strategic direction. They oversee the company’s overall operations, make critical business decisions, and act as the primary point of communication between the board of directors and the company’s management. The CEO represents the company in public engagements, fostering relationships with stakeholders, investors, and the community. Their leadership influences the company’s culture and ensures the alignment of all departments with the organization’s long-term goals.",
    color: "text-[#00FF00]", // Added color for CEO
    buttonColor: "bg-[#00FF00]", // Added button color
    buttonHoverColor: "bg-green-600", // Hover color for button
  },
  {
    id: 2,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "CFO",
    description:
      "The Chief Financial Officer (CFO) is responsible for managing the financial health of the organization. They oversee budgeting, financial planning, and forecasting while ensuring accurate reporting and compliance with regulatory requirements. The CFO plays a key role in assessing risks, managing investments, and supporting strategic initiatives through financial insights. They collaborate closely with the CEO and other executives to align financial strategies with the company’s growth objectives, ensuring sustainable and profitable operations",
    color: "text-[#FD8347]", // Added color for CFO
    buttonColor: "bg-[#FD8347]", // Added button color
    buttonHoverColor: "bg-blue-600", // Hover color for button
  },
  {
    id: 3,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "CTO",
    description:
      "The Chief Technology Officer (CTO) leads the company’s technology and innovation strategy, ensuring that it stays at the forefront of industry advancements. They manage the development and deployment of technological solutions that support the organization’s goals and drive competitive advantage. The CTO oversees research and development (R&D) initiatives, evaluates emerging technologies, and collaborates with other departments to integrate technology into business processes effectively. Their role is pivotal in shaping the digital transformation and technological growth of the organization.",
    color: "text-[#1483FF]", // Added color for CTO
    buttonColor: "bg-[#1483FF]", // Added button color
    buttonHoverColor: "bg-green-600", // Hover color for button
  },
  {
    id: 4,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "CMO",
    description:
      "The Chief Marketing Officer (CMO) is responsible for developing and executing the company’s marketing and branding strategies to drive growth and enhance customer engagement. They oversee advertising campaigns, public relations, and market research to ensure the company remains relevant and competitive. The CMO uses data-driven insights to target audiences effectively, build strong brand identities, and deliver value to customers. Their work directly impacts the company’s market presence and revenue generation efforts.",
    color: "text-yellow-500", // Added color for CMO
    buttonColor: "bg-yellow-500", // Added button color
    buttonHoverColor: "bg-yellow-600", // Hover color for button
  },
  {
    id: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "COO",
    description:
      "The Chief Operating Officer (COO) manages the company’s day-to-day operations, ensuring efficiency and effectiveness in all business processes. They implement the company’s strategic plans and operational goals, bridging the gap between strategy and execution. The COO monitors performance metrics, streamlines workflows, and ensures resources are utilized optimally. As a key partner to the CEO, they play a critical role in scaling operations, managing internal processes, and aligning them with the organization’s broader objectives.",
    color: "text-purple-500", // Added color for COO
    buttonColor: "bg-purple-500", // Added button color
    buttonHoverColor: "bg-purple-600", // Hover color for button
  },
  {
    id: 6,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "CIO",
    description:
      "The Chief Information Officer (CIO) oversees the organization’s IT strategy and infrastructure, ensuring the seamless integration of technology into business operations. They are responsible for securing the company’s digital assets, implementing systems to enhance productivity, and keeping the organization ahead in the rapidly evolving technological landscape. The CIO works closely with other executives to ensure that technology solutions align with the company’s goals while maintaining data security and compliance with industry standards.",
    color: "text-pink-500", // Added color for CIO
    buttonColor: "bg-pink-500", // Added button color
    buttonHoverColor: "bg-pink-600", // Hover color for button
  },
  {
    id: 7,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "CHRO",
    description:
      "The Chief Human Resources Officer (CHRO) leads the company’s human resources strategy, focusing on attracting, retaining, and developing top talent. They create and implement policies that foster a positive work environment, promote diversity, and enhance employee engagement. The CHRO ensures alignment between the workforce and organizational objectives while addressing employee needs and driving initiatives to build a strong company culture. Their leadership is crucial for maintaining a motivated and productive workforce.",
    color: "text-teal-500", // Added color for CHRO
    buttonColor: "bg-teal-500", // Added button color
    buttonHoverColor: "bg-teal-600", // Hover color for button
  },
];

export default function RoleCarousel() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const [expandedRoleId, setExpandedRoleId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
      prevIndex === roles.length - 3 ? 0 : prevIndex + 1
    );
    setExpandedRoleId(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? roles.length - 3 : prevIndex - 1
    );
    setExpandedRoleId(null);
  };

  const handleRoleClick = async (role) => {
    try {
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
      console.error("Error during role click:", error);
      toast.error("An unexpected error occurred. Please try again.");
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

  return (
    <div className="min-h-screen welcomepage-bg3  overflow-hidden">
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
        <img src={logo} className="mnc-logo mx-auto" />
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
              const index = (currentIndex + offset) % roles.length;
              const role = roles[index];
              const isExpanded = role.id === expandedRoleId;
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
                    handleRoleClick(role.title);
                  }}
                >
                  <div className="relative w-full aspect-square mb-4 md:mb-6">
                    <div className="absolute inset-0 border-2 border-[#2C7EFF] rounded-xl">
                      <img
                        src={role.image}
                        alt={role.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  <h2
                    className={`text-2xl md:text-3xl lg:text-4xl font-bold ${role.color} mb-2`}
                    style={{
                      fontFamily: "Bebas Neue",
                      verticalAlign: "Cap height",
                    }}
                  >
                    {role.title}
                  </h2>
                  <button
                    className={`${role.buttonColor} text-white font-medium px-3 py-2 rounded-full hover:opacity-90 transition-opacity`}
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
          {roles.slice(0, roles.length - 2).map((_, index) => (
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
                  src={selectedRole.image}
                  alt={`${selectedRole.title} profile`}
                  className="w-96 h-full object-cover  rounded-full mx-auto mb-4 "
                />
                <p
                  className={`${selectedRole.color} text-8xl text-center h-[84px]  leading-[144px] font-medium`}
                  style={{
                    fontFamily: "Bebas Neue",
                    verticalAlign: "Cap height",
                  }}
                >
                  {selectedRole.title}
                </p>
              </div>
            </div>
            <div className="relative backdrop-blur-sm bg-white/70  rounded-lg shadow-lg py-8 px-3 w-[40%]  flex">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-[#FF8439] text-2xl font-normal"
              >
                <CloseIcon sx={{ fontSize: 30 }} className="text-[#FF8439]" />
              </button>

              <div className=" p-4 flex flex-col">
                <h2 className="text-2xl font-bold text-[#FF8439] mb-4">
                  About Role
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {selectedRole.description}
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
              src={selectedRole.image}
              alt={`${selectedRole.title} profile`}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-full mb-6"
            />
            <p
              className={`${selectedRole.color} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-4`}
              style={{ fontFamily: "Bebas Neue", verticalAlign: "Cap height" }}
            >
              {selectedRole.title}
            </p>
            <div className="w-full text-center px-2 md:px-4 lg:px-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#FF8439] mb-4">
                About Role
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {selectedRole.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
