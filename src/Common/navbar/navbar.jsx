// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll"; // Import Link from react-scroll
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginPage from "../../Auth/LoginPage";
import logo from "../../Assets/images/logoimg.png";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOpen = () => {
    setOpen(true);
    navigate("/login");
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="">
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
            {/* Use Link from react-scroll for smooth scrolling */}
            <Link
              to="contact" // This should match the id of the Contact section
              smooth={true} // Enable smooth scrolling
              duration={500} // Duration of scroll animation
              onClick={() => setMenuOpen(false)} // Close the menu after clicking
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
      </nav>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <LoginPage />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
