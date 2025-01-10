
import React, { useState } from "react";
import img1 from "../../Assets/gameimages/img11.jpg";
import icon1 from "../../Assets/gameimages/icon1.png"
import logo from "../../Assets/gameimages/mnclogo2.png"
import "../../Assets/CSS/Game3/PersonResult.css"
import { useEffect } from "react";

const Person2Result = () => {

  const [percentage, setPercentage] = useState(40);
  const [percentage2, setPercentage2] = useState(50);
  const [percentage3, setPercentage3] = useState(70);
  const [percentage4, setPercentage4] = useState(40);
  const [percentage5, setPercentage5] = useState(89);  
  

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
  return (
    <>
      <div className="game3-bg">
      <img src="/mnclogo2.png" className='mnc-logo'/>
      <img src={icon1} className='icon1-game3' style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}/>
        <div className="game3result-width">
          <div className="result-group">
            <div className="result-img-div">
              <img className="result-img" src={img1} alt="Game result" />
            </div>
            <div className="result-range">
              <div className="range-box">
                <span className="progress-bar-label">
                  CREATIVITY & INNOVATION
                </span>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="progress-bar-percentage">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <span className="progress-bar-label2">STRATEGIC THINKING</span>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill2"
                    style={{ width: `${percentage2}%` }}
                  >
                    <span className="progress-bar-percentage">
                      {percentage2}%
                    </span>
                  </div>
                </div>

                <span className="progress-bar-label3">FUNDAMENTAL SKILLS</span>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill3"
                    style={{ width: `${percentage3}%` }}
                  >
                    <span className="progress-bar-percentage">
                      {percentage3}%
                    </span>
                  </div>
                </div>

                <span className="progress-bar-label4">MANAGEMENT SKILLS</span>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill4"
                    style={{ width: `${percentage4}%` }}
                  >
                    <span className="progress-bar-percentage">
                      {percentage4}%
                    </span>
                  </div>
                </div>

                <span className="progress-bar-label5">
                  OVERALL IMPACT AND CONFIGURATION
                </span>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill5"
                    style={{ width: `${percentage5}%` }}
                  >
                    <span className="progress-bar-percentage">
                      {percentage5}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Person2Result;
