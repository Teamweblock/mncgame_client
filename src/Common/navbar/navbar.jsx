import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../../Assets/images/logoimg.png";
import { Menu } from "lucide-react";
import { User } from "lucide-react";
import { getUserProfile } from "../../utils/axiosInstance"; // Import the new API function
import UserProfile from "../../Auth/UserProfile";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null); // Store user profile data
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(); // Fetch profile data using the new function
        if (profileData) {
          setUserData(profileData?.userData); // Set profile data in state
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserProfile();
  }, []); // This effect runs once when the component mounts

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOpen = () => {
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-purple-600 border-b-2 border-purple-600"
      : "text-black";

  // const token = localStorage.getItem("token");
  // const isLoggedIn = !!token;
  console.log("ajay", token, isLoggedIn);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      // console.log("User logged out");
      setIsDialogOpen(true);
      // navigate("/"); // Redirect to the signin page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className="transparent relative w-full bg-transparent pt-10">
        <div className="flex items-center justify-between w-[70%] max-md:w-[90%] mx-auto">
          <img src={logo} alt="Logo" height={70} width={90} />
          <div className="md:hidden" onClick={toggleMenu}>
            <Menu />
          </div>
          <div className="hidden md:flex w-full pt-2">
            <ul className="flex gap-4 items-center font-semibold ml-auto text-black">
              <Link to="/">
                <li className={`${isActive("/")}`}>Home</li>
              </Link>
              <Link to="/about">
                <li className={isActive("/about")}>About</li>
              </Link>
              <Link to="/games">
                <li className={isActive("/games")}>Game</li>
              </Link>
              <Link to="/contactus">
                <li className={isActive("/contactus")}>Contact</li>
              </Link>

              {isLoggedIn ? (
                <Link to="/profile/overview">
                  <div className="rounded-full h-10 w-10 flex justify-center items-center bg-[#f37ce7]">
                    {isLoggedIn ? (
                      <Link to="/profile/overview">
                        <div className="rounded-full h-10 w-10 flex justify-center items-center bg-[#f37ce7]">
                          {/* Use the UserProfile component to display the avatar/initials */}
                          <UserProfile user={userData} loading={loading} />
                        </div>
                      </Link>
                    ) : (
                      <button className="border-2 border-[#C04AE2] hover:border-[#C04AE2] hover:bg-white transition duration-700 text-black font-semibold rounded-lg px-4 py-1 w-28">
                        Login
                      </button>
                    )}
                  </div>
                </Link>
              ) : (
                <button
                  className="border-2 border-[#C04AE2] hover:border-[#C04AE2] hover:bg-white transition duration-700 text-black font-semibold rounded-lg px-4 py-1 w-28"
                  onClick={handleOpen}
                >
                  Login
                </button>
              )}
            </ul>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute z-10  top-0 right-0 w-[200px] h-[100vh] bg-white z-1000 flex flex-col  text-black font-semibold">
            <button
              className="absolute top-4 right-4 text-3xl"
              onClick={toggleMenu}
            >
              &times;
            </button>
            <ul className="flex flex-col gap-3 text-lg mt-16">
              <Link to="/" onClick={toggleMenu}>
                <li className={`${isActive("/")}`}>Home</li>
              </Link>
              <Link to="/about" onClick={toggleMenu}>
                <li className={`${isActive("/about")}`}>About</li>
              </Link>
              <Link to="/games" onClick={toggleMenu}>
                <li className={`${isActive("/games")}`}>Game</li>
              </Link>
              <Link to="/contactus" onClick={toggleMenu}>
                <li className={`${isActive("/contactus")}`}>Contact</li>
              </Link>
             
              {isLoggedIn ? (
                <>
                <Link to="/profile/overview" onClick={toggleMenu}>
                  <div className="w-max grid gap-2">
                    <li className={` ${isActive("/profile/overview")}`}>
                      Profile
                    </li>
                  </div>
                  </Link>
                  <button
                    className="border-2 border-[#C04AE2] hover:border-[#C04AE2] hover:bg-white transition duration-700 text-black font-semibold rounded-lg px-4 py-1 w-28"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  </>
              ) : (
                <button
                  className="border-2 border-[#C04AE2] hover:border-[#C04AE2] hover:bg-white transition duration-700 text-black font-semibold rounded-lg px-4 py-1 w-28"
                  onClick={handleOpen}
                >
                  Login
                </button>
              )}
            </ul>
          </div>
        )}
        {isDialogOpen && (
        <div className="fixed inset-0 px-2 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#6E9FFF] p-6 shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full outline outline-4 outline-[#6E9FFF] relative rounded-lg">
            <div className="absolute inset-0 m-[10px] py-16 border-4 border-white rounded-xl pointer-events-none"></div>
            <h2 className="text-white text-xl font-bold mb-4 leading-relaxed text-center relative z-10 mt-6">
            YOU ARE LOGGED OUT
            </h2>
            <div className="text-center relative mb-10 z-20">
              <button
                className="mt-[-3px] bg-white text-[#6E9FFF] font-bold px-24 py-3  rounded-full shadow-md hover:bg-yellow-100 transition-all transform hover:scale-110 hover:shadow-lg hover:translate-y-[-4px]"
                onClick={() => {
                  setIsDialogOpen(false); // Close the dialog
                  navigate("/"); // Redirect to the 'game1multiplelevelpage'
                }}
              >
                OKAY
              </button>
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navbar;
