import { createContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/Dehydrate/reducer";
const DehydrateContext = createContext();

const DehydrateProvider = (props) => {
  const [hydrateState, hydrateDispatch] = useReducer(reducer, initialState);

  return (
    <DehydrateContext.Provider value={{ hydrateState, hydrateDispatch }}>{props.children}</DehydrateContext.Provider>
  );
};

export { DehydrateContext, DehydrateProvider };
