
import React, { useState, useEffect, useRef } from 'react';
import "./Playgame3.css";
import img1 from "../Assets/gameimages/img9.png";
import { useNavigate } from 'react-router-dom';
import icon1 from "../Assets/gameimages/icon1.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Import Pagination module correctly
import "../Assets/CSS/Game3/ChooseRole.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/swiper-bundle.css';

const ChooseRole = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth - clientX) / 120;
    const y = (window.innerHeight - clientY) / 120;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleroleofCEO = () => navigate("/aboutrole");
  const handleroleofCFO = () => navigate("/aboutrole2");
  const handleroleofCTO = () => navigate("/aboutrole3");

  return (
    <>
      <div className='Game3-bg'>
        <img src={logo} className='mnc-logo' alt="Logo" />
        <img 
          src={icon1} 
          className='icon1-game3' 
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} 
          alt="Icon"
        />
        <div className='choose-text'>
          <h1 className='chooserole-title'>
            <span className='your-text'>CHOOSE</span><br />
            <span className='your-text2'>YOUR</span>
          </h1>
          <h1 className='role-text'>ROLE</h1>
        </div>

        <div className='person-images'>
          <Swiper 
          className='myswiper2'
            ref={swiperRef}
            modules={[Pagination]} // Use Pagination module here
            pagination={{ clickable: true }} // Enable clickable pagination dots
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 0 },
              700: { slidesPerView: 2, spaceBetween: 0 },
              807: { slidesPerView: 2, spaceBetween: 0 },
              1232: { slidesPerView: 3, spaceBetween: 0 },
            }}
            navigation={{
              prevEl: '.custom-navigation button:first-child',
              nextEl: '.custom-navigation button:last-child',
            }}
          >
            <SwiperSlide className='slider-center'>
              <img src={img1} className='person-imgs1' alt="CEO Role" onClick={handleroleofCEO} />
            </SwiperSlide>
            <SwiperSlide className='slider-center'>
              <img src={img1} className='person-imgs2' alt="CFO Role" onClick={handleroleofCFO} />
            </SwiperSlide>
            <SwiperSlide className='slider-center'>
              <img src={img1} className='person-imgs3' alt="CTO Role" onClick={handleroleofCTO} />
            </SwiperSlide>
            <SwiperSlide className='slider-center'>
              <img src={img1} className='person-imgs1' alt="CEO Role" onClick={handleroleofCEO} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default ChooseRole;
