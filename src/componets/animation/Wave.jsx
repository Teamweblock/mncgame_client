
import React from "react";

const Wave = ({ direction }) => {
  return (
    <svg
      viewBox="0 0 500 100"
      preserveAspectRatio="none"
      style={{
        height: "100px",
        width: "100%",
        animation: `${direction}-wave-animation 2s linear infinite`,
      }}
    >
      <path
        d="M0,100 C150,0 350,200 500,100 L500,00 L0,0 Z"
        style={{
          stroke: "none",
          fill: "lightblue",
        }}
      />
    </svg>
  );
};

export default Wave;
