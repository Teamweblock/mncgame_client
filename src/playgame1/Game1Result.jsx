import React from "react";
import img1 from "../Assets/gameimages/img6.png";
import icon1 from "../Assets/gameimages/icon2.png";
import { useState } from "react";
import icon2 from "../Assets/gameimages/icon3.png";
import { useEffect } from "react";
import logo from "../Assets/gameimages/mnclogo2.png";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/Game1/Game1Result.css";
const Game1Result = () => {
  const [value, setValue] = useState(10);
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
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const selectLevelpage = () => {
    navigate("/game1levelpage");
  };
  return (
    <>
      <div className="Game1-bg-result">
        <img src={logo} className="mnc-logo" />
        <img
          src={icon1}
          className="icon7-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon1}
          className="icon8-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <img
          src={icon2}
          className="icon9-game1 parallax-layer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
        <div>
          <h1 className="text-8xl font-bold text-white max-lg:text-4xl  text-center lg:my-20 mt-20 py-4">
            WELL DONE
          </h1>

          <div className="w-[70%] max-lg:w-[90%] mx-auto">
            <div className="flex gap-4 max-lg:flex-col max-lg:gap-0  mb-4">
              <div className="flex flex-col items-center ">
                <img
                  src={img1}
                  className="avtar-img2  "
                  height={200}
                  width={200}
                
                />
                <h6 className="text-[1.3rem] text-white mt-2 font-bold">
                  Player 1
                </h6>
              </div>

              <div>
                <div className=" bg-white text-black font-medium text-[1.2rem] rounded-2xl p-4 text-center max-sm:text-[1rem]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </div>
                <div className="flex items-center gap-2 my-4 max-lg:hidden">
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">Non implementable</h5>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">Implementable</h5>
                </div>
                <div className="flex items-center  flex-col  mt-4 px-2 lg:hidden">
                  <div className="progress-bar-container w-full">
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full mt-2">
                    <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px] ">
                      Non implementable
                    </h5>
                    <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">
                      Implementable
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 max-lg:flex-col max-lg:gap-0">
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src={img1}
                    className="avtar-img2 "
                    height={200}
                    width={200}
                
                  />
                  <h6 className="text-[1.3rem] text-white mt-2 font-bold">
                    Player 1
                  </h6>
                </div>
              </div>
              <div>
                <div className=" bg-white text-black font-medium text-[1.2rem] rounded-2xl p-4 text-center  max-sm:text-[1rem]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </div>
                <div className="flex items-center gap-2 my-4 max-lg:hidden">
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">Non implementable</h5>

                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      className="slider"
                      onChange={handleChange}
                      style={{
                        '--value': `${value}%`,
                      }}
                    /> */}
                  <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">Implementable</h5>
                </div>

                <div className="flex items-center  flex-col  mt-4 px-2 lg:hidden">
                  <div className="progress-bar-container w-full">
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full mt-2">
                    <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px] ">
                      Non implementable
                    </h5>
                    <h5 className="text-white text-[1.5rem] font-bold max-md:text-[13px]">
                      Implementable
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-group2 pb-3">
              <button className="home-btn" onClick={handleHome}>
                Home
              </button>
              <button className="next-btn" onClick={selectLevelpage}>
                Next Lavel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game1Result;
