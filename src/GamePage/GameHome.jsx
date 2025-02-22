
import React from "react";
import AddSkill from "./AddSkill";
import PilotSection from "./PilotSection";
import Entrepreneurial from "./Entrepreneurial";
import Strategy from "./Strategy";
import Contact from "../Auth/Contact";
const GameHome = () => {
  return (
    <div>
      <AddSkill />
      <PilotSection />
      <Entrepreneurial />
      <Strategy />
     <div id="contact">
          <Contact />
        </div>
    </div>
  );
};
export default GameHome;