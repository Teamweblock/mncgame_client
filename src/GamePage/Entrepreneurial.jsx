
import React from "react";
import img15 from "../Assets/images/gameimg1.png";
import "./CSS/Entrepreneurial.css";
import { useNavigate } from "react-router-dom";

const Entrepreneurial = () => {

  const navigate = useNavigate();

  const playGame1 = () => {
    navigate("/welcomepagegame2");
  };

  
  return (
    <>
      <div className="EntrepreneurialMain">
        <div className="EntrepreneurialMainPaet">
          <div className="EntrepreneurialTextSeacation">
            <div className="game-description">
              <h2 className="EntrepreneurialTitle">Entrepreneurial Edge</h2>
              <p className="EntrepreneurialText">
                Assess and enhance entrepreneurial skills by choosing the most
                entrepreneurial response to various situations
              </p>
              <div>
                <button className="EntrepreneurialButton" onClick={playGame1}>Play Now</button>
              </div>
            </div>
          </div>
          <div className="EntrepreneurialImageSeaction">
            <div>
              <img src={img15} className="EntrepreneurialImage" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Entrepreneurial;