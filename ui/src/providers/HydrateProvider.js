import { createContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/Hydrate/reducer";
const HydrateContext = createContext();

const HydrateProvider = (props) => {
  const [hydrateState, hydrateDispatch] = useReducer(reducer, initialState);

  return <HydrateContext.Provider value={{ hydrateState, hydrateDispatch }}>{props.children}</HydrateContext.Provider>;
};

export { HydrateContext, HydrateProvider };
