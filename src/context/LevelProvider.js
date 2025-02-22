import React, { createContext, useState, useContext } from "react";

// Create a context to hold level data
const LevelContext = createContext();

export const useLevelContext = () => {
  return useContext(LevelContext);
};

export const LevelProvider = ({ children }) => {
  const [levelData, setLevelData] = useState({
    levelNumber: null,
    response: null,
  });

  const setLevelInfo = (levelNumber, response) => {
    setLevelData({ levelNumber, response });
  };

  return (
    <LevelContext.Provider value={{ levelData, setLevelInfo }}>
      {children}
    </LevelContext.Provider>
  );
};
