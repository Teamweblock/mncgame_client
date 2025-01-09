import React from "react";
import "../Assets/CSS/Game2/WelcomePageGame2.css";
import GameChartResult from "../playgame2/GameChartResult";
import icon1 from "../Assets/gameimages/icon1.png";
import icon2 from "../Assets/gameimages/icon3.png";
import { useState } from "react";

const Game2NewResult = ({ score, levelNumber }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <img
        src={icon1}
        className="icon1-game1 parallax-layer max-sm:hidden"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <img
        src={icon2}
        className="icon2-game1 parallax-layer"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />

{/* <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 m-10 justify-between'>
      <div className='border-2 border-black w-full h-fit col-span-1 text-center' >sgfeshfb </div>
      <div className='border-2 border-black w-full h-fit col-span-1 text-center' >sgfeshfb </div>
      <div className='border-2 border-black w-full h-fit col-span-1 text-center' >sgfeshfb </div>
    </div> */}
      <div className="sm:w-[90%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[70%] flex flex-col sm:flex-row md:flex place-content-center items-center mx-auto text-center">
      {/* <div className="grid h-[50%] sm:grid-cols-2 md:grid-cols-5 grid-cols-1 gap-2 m-10 justify-center items-center"> */}
        <h1 className=" text-white text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  px-2 sm:px-4 mt-4 sm:mt-0">
        ENTEREPRENEURIAL
        </h1>

        <GameChartResult className="col-span-3" score={score} levelNumber={levelNumber} />
        <h1 className="  text-white text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold px-8 sm:px-4 mt-4 sm:mt-0">
          MINDSETSCORE
        </h1>
      </div>
    </div>
  );
};

export default Game2NewResult;

// import React from "react";
// import "../Assets/CSS/Game2/WelcomePageGame2.css";
// import GameChartResult from "../playgame2/GameChartResult";
// import icon1 from "../Assets/gameimages/icon1.png";

// import icon2 from "../Assets/gameimages/icon3.png";
// import { useState } from "react";
// const Game2NewResult = ({ score, levelNumber }) => {
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   return (
//     <>
//       <div className=" w-full flex justify-center  items-center flex-col  ">
//         <img
//           src={icon1}
//           className="icon1-game1 parallax-layer max-sm:hidden"
//           style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
//         />
//         <img
//           src={icon2}
//           className="icon2-game1 parallax-layer"
//           style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
//         />
//         <div className="w-full flex flex-col md:flex-row justify-center items-center mx-auto">
//           <h1 className="text-white text-4xl font-bold tracking-wider px-8">
//             ENTREPRENEURIA
//           </h1>
//           <GameChartResult score={score} levelNumber={levelNumber} />
//           <h1 className="text-white text-4xl font-bold tracking-wider px-8">
//             MINDSETSCORE
//           </h1>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Game2NewResult;
