import { createContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/BackgroundDispatch/reducer";
const BackgroundDispatchContext = createContext();

const BackgroundDispatchProvider = (props) => {
  const [backgroundDispatchState, backgroundDispatch] = useReducer(reducer, initialState);

  return (
    <BackgroundDispatchContext.Provider value={{ backgroundDispatchState, backgroundDispatch }}>
      {props.children}
    </BackgroundDispatchContext.Provider>
  );
};

export { BackgroundDispatchContext, BackgroundDispatchProvider };
