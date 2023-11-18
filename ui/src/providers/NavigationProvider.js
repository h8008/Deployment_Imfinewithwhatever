import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/Navigation/reducer";

const NavigationContext = createContext();

const NavigationProvider = (props) => {
  const [navigationState, navigationDispatch] = useReducer(reducer, initialState);

  return (
    <NavigationContext.Provider value={{ navigationState, navigationDispatch }}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
