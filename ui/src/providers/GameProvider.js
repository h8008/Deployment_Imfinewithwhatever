import { useReducer, createContext } from "react";
import { gameReducer, initialGameState } from "../reducer/Game/GameReducer";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

  return <GameContext.Provider value={{ gameState, gameDispatch }}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
