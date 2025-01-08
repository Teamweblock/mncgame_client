import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import img28 from "../Assets/icon/img1.png";
import imgc32 from "../Assets/icon/32 copy.png";
import image1 from "../Assets/icon/img2.png";

const testimonials = [
  {
    title: "TESTIMONIAL",
    name: "Kabir Manja",
    role: "Music Producer",
    content:
      "Kollit a do eiusmod tempor incididunt ut labore et do irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "TESTIMONIAL",
    name: "Kabir Manja",
    role: "Music Producer",
    content:
      "Kollit a do eiusmod tempor incididunt ut labore et do irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "TESTIMONIAL",
    name: "Kabir Manja",
    role: "Music Producer",
    content:
      "Kollit a do eiusmod tempor incididunt ut labore et do irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];


const SwipeSide = () => {
  return (
    <Swiper
    pagination={true}
    modules={[Pagination, Autoplay]}
    autoplay={{
      delay: 1000, 
      disableOnInteraction: false, 
    }}
    className="mySwiper"
     
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
            <div className="flex w-[70%] max-lg:w-[90%] mx-auto justify-between max-lg:flex-col ">

   
          {/* left div */}
          <div className="flex gap-4  items-start w-1/2 lg:pt-60">
            {/* left div */}
            <div className="mt-2">
              <img src={img28} alt="" height={100} width={150} />
            </div>
            {/* right div */}
            <div>
              <p className="text-nowrap  text-[1.3rem] font-medium tracking-widest   text-[#a90bd4]">
                {testimonial.title}
              </p>
              <div className="text-5xl font-bold text-[#1b1916] max-md:text-3xl">
                They are awesome!
              </div>
              <p className="text-[#78695b] font-normal text-[1.3rem] py-8">
                {testimonial.content}
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-6 h-[2px] bg-blue-900 mb-[10px] max-md:hidden"></div>
                <div className="flex gap-4 items-center">
                  <p className="text-[1.5rem] font-bold max-md:text-[1.2rem] text-nowrap">{testimonial.name}</p>
                  <p className="text-lg font-normal  text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* right div */}
          <div className="relative pb-10 ">
            <img src={imgc32} alt="" className="h-[600px] w-[450px] z-10 relative max-md:h-[500px] max-md:w-[350px] max-w-full" />
            <img
              src={image1}
              alt=""
              height={300}
              width={300}
              className="absolute -bottom-10 -left-32 z-0 max-lg:hidden"
            />
          </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwipeSide;
