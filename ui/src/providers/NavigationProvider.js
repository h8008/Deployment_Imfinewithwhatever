import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/Navigator/reducer";

const NavigationContext = createContext();

const NavigationProvider = (props) => {
  const [navigatorState, navigatorDispatch] = useReducer(reducer, initialState);

  return (
    <NavigationContext.Provider value={{ navigatorState, navigatorDispatch }}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
