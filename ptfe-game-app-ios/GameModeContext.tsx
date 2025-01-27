import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types for gameMode and context
type GameModeContextType = {
  gameState: number;
  setGameState: React.Dispatch<React.SetStateAction<number>>;
  gameMode: number;
  setGameMode: React.Dispatch<React.SetStateAction<number>>;
  submitState: number;
  setsubmitState: React.Dispatch<React.SetStateAction<number>>;
  setCategoryState: number;
  setSetCategoryState: React.Dispatch<React.SetStateAction<number>>;
  // slider: [];
  // setslider: React.Dispatch<React.SetStateAction<Array>>;
};

// Provide a default value for the context
const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

type GameModeProviderProps = {
  children: ReactNode;
};

export const GameModeProvider = ({ children }: GameModeProviderProps) => {
  const [gameMode, setGameMode] = useState<number>(0);
  const [gameState, setGameState] = useState<number>(0);
  const [submitState, setsubmitState] = useState<number>(0);
  const [setCategoryState, setSetCategoryState] = useState<number>(0);
  useEffect(() => {
    // Function to calculate the milliseconds until the next midnight
    const calculateTimeToMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Set to 00:00 of the next day
      return midnight.getTime() - now.getTime();
    };

    // Initial timeout to set the state at midnight
    const initialTimeout = setTimeout(() => {
      setSetCategoryState(0); // Reset state at midnight

      // Set interval to reset the state every 24 hours
      const interval = setInterval(() => {
        setSetCategoryState(0);
      }, 24 * 60 * 60 * 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, calculateTimeToMidnight());

    // Cleanup timeout on component unmount
    return () => clearTimeout(initialTimeout);
  }, []);
  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode, gameState, setGameState, submitState, setsubmitState, setCategoryState, setSetCategoryState }}>
      {children}
    </GameModeContext.Provider>
  );
};

// Custom hook to use gameMode in other components
export const useGameMode = () => {
  const context = useContext(GameModeContext);
  if (!context) {
    throw new Error("useGameMode must be used within a GameModeProvider");
  }
  return context;
};
