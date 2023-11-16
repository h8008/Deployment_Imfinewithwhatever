import { createContext, useReducer } from "react";
import { initialState, reducer } from "../reducer/Statistics/reducer";

const StatisticsContext = createContext();

const StatisticsProvider = (props) => {
  const [statisticsState, statisticsDispatch] = useReducer(reducer, initialState);

  return (
    <StatisticsContext.Provider value={{ statisticsState, statisticsDispatch }}>
      {props.children}
    </StatisticsContext.Provider>
  );
};

export { StatisticsContext, StatisticsProvider };
