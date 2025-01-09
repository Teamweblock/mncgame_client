// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import logo from "../../Assets/images/logoimg.png";
import "./navbar.css";
import { Menu } from "lucide-react";
import { User } from "lucide-react";
// import {  MenuItem, Button } from "@material-ui/core";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOpen = () => {
    setOpen(true);
    navigate("/login");
  };

  const handleClose = () => setOpen(false);
  const isActive = (path) =>
    location.pathname === path
      ? "text-purple-600 border-b-2 border-purple-600"
      : "text-black";

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  console.log("ajay", token, isLoggedIn);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      console.log("User logged out");
      navigate("/"); // Redirect to the signin page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };


  return (
    <>
      <nav className="transparent relative w-full bg-transparent pt-10 ">
        <div className="flex items-center justify-between   w-[70%] max-md:w-[90%] mx-auto">
          <img src={logo} alt="Logo" className="" height={70} width={90} />
          <div className=" md:hidden  " onClick={toggleMenu}>
            <Menu />
          </div>
          <div className="hidden md:flex w-full pt-2">
            <ul className="flex gap-4 items-center font-semibold ml-auto text-black">
              <Link to="/">
                <li className={`${isActive("/")} `}>Home</li>
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
                <Link to="/">
                  <div
                    className="rounded-full h-10 w-10 flex justify-center items-center bg-[#f37ce7] cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <User color="white" />
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                      <ul className="py-2">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          // onClick={closeDropdown}
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
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
              className="absolute top-4 right-4 black text-3xl"
              onClick={toggleMenu}
            >
              &times;
            </button>
            <ul className="flex flex-col gap-3 text-lg mt-16">
              <Link to="/" onClick={toggleMenu}>
                <div className="w-max">
                  <li className={` ${isActive("/")}`}>Home</li>
                </div>
              </Link>

              <Link to="/about" smooth={true} onClick={toggleMenu}>
                <div className="w-max">
                  <li className={` ${isActive("/about")}`}>About</li>
                </div>
              </Link>
              <Link to="/games" onClick={toggleMenu}>
                <div className="w-max">
                  <li className={` ${isActive("/games")}`}>Game</li>
                </div>
              </Link>
              <Link to="/contactus" onClick={toggleMenu}>
                <div className="w-max">
                  <li className={` ${isActive("/contactus")}`}>Contact</li>
                </div>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link to="/" onClick={toggleMenu}>
                    <div className="w-max grid gap-2">
                      <li className={` ${isActive("/")}`}>
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
      </nav>
      {/* <nav className="navbar">
        <div className="flx items-center ">
          <a href="/">
            <img src={logo} alt="Logo" className="nav-logo" />
          </a>
        </div>
        <div className="">
          <div className="navbar-menu-icon" onClick={toggleMenu}>
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={menuOpen ? "navbar-menu active" : "navbar-menu"}>
            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/games" activeClassName="active">
                Games
              </NavLink>
            </li>
            <li>
              <Link
                to="contact" 
                smooth={true} 
                duration={500} 
                onClick={() => setMenuOpen(false)} 
              >
                Contact
              </Link>
            </li>
            <li>
              <div className="login-button">
                <button
                  onClick={handleOpen}
                  style={{
                    backgroundColor: "white",
                    borderColor: "#C04AE2",
                    color: "black",
                    padding: "7px 30px",
                    border: "3px solid #C04AE2",
                    borderRadius: "10px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                  className="loginbtn"
                >
                  LOGIN
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav> */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <LoginPage />
        </Box>
      </Modal> */}
    </>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu } from "your-menu-component"; // Replace with your menu component
// import logo from "your-logo-path"; // Replace with your logo import

// const Navbar = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <nav className="transparent relative w-full">
//       <div className="flex items-center w-[70%] max-md:w-[90%] mx-auto">
//         <img src={logo} alt="Logo" height={70} width={90} />

//         {/* Hamburger Menu for Mobile */}
//         <div className="md:hidden ml-auto" onClick={toggleSidebar}>
//           <Menu />
//         </div>

//         {/* Navigation Links */}
// <div className="hidden md:flex w-full">
//   <ul className="flex gap-4 items-center font-semibold ml-auto">
//     <Link to="/">
//       <li>Home</li>
//     </Link>
//     <Link to="/about">
//       <li>About</li>
//     </Link>
//     <Link to="/game">
//       <li>Game</li>
//     </Link>
//     <Link to="/contact">
//       <li>Contact</li>
//     </Link>
//     <button className="border-2 border-[#C04AE2] text-black font-semibold rounded-lg px-4 py-1 w-28">
//       Login
//     </button>
//   </ul>
// </div>
//       </div>

//       {/* Sidebar for Mobile */}
//       {isSidebarOpen && (
//         <div className="absolute top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center text-white">
//           <button
//             className="absolute top-4 right-4 text-white text-3xl"
//             onClick={toggleSidebar}
//           >
//             &times;
//           </button>
//           <ul className="flex flex-col gap-6 text-lg mt-16">
//             <Link to="/" onClick={toggleSidebar}>
//               <li>Home</li>
//             </Link>
//             <Link to="/about" onClick={toggleSidebar}>
//               <li>About</li>
//             </Link>
//             <Link to="/game" onClick={toggleSidebar}>
//               <li>Game</li>
//             </Link>
//             <Link to="/contact" onClick={toggleSidebar}>
//               <li>Contact</li>
//             </Link>
//             <button
//               className="border-2 border-[#C04AE2] text-black font-semibold rounded-lg px-4 py-1 w-28"
//               onClick={toggleSidebar}
//             >
//               Login
//             </button>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
