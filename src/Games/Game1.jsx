import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
const Game1 = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(true);
  };
  const navigate = useNavigate()
  const multiplePlayer = () => {
    navigate("/registerform")
  }
  return (
    <>
      <div className="game1-bg-img">
        <div className="container">
          <div style={{ width: "80%", margin: "auto" }}>
            <h1 style={{ textAlign: "center", marginTop: "30px", fontSize: "52px" }}>
              Game1- Problem Piolot
            </h1>
            <span
              style={{ borderBottom: "3px solid #C04AE2", margin: "30px 0px" }}
            >
              Description
            </span>
            <p className="mt-4" style={{ fontSize: "20px" }}>
              lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </p>
            <div className="text-center m-auto">
              <button onClick={handleClick} className="start-btn ">
                Start
              </button>
              {showDetails && (
                <div className="showdetails mt-5">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card card1" style={{ height: "300px", width: "100%" }}>
                        <IoPerson style={{ fontSize: "50px" }} />
                        <h2>Single Players</h2></div>

                    </div>
                    <div className="col-md-6">
                      <div className="card card1" onClick={multiplePlayer} style={{ height: "300px", width: "100%" }}>

                        <IoPersonAddSharp style={{ fontSize: "50px" }} />
                        <h2> Multiple Players</h2>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game1;
