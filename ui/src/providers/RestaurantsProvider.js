import { useReducer, createContext } from "react";
import { reducer, initialState } from "../reducer/Main/reducer";
import { useCookies } from "react-cookie";

const RestaurantsContext = createContext();

const RestaurantsProvider = ({ children }) => {
  const [cookies, setCookies] = useCookies();
  const location = cookies.location;
  const cuisines = cookies.cuisines;
  // const restaurant =
  //   cookies.restaurant == null ? undefined : JSON.parse(cookies.restaurant);

  const [restaurantState, restaurantDispatch] = useReducer(
    reducer,
    location != null && cuisines != null ? { ...initialState, location, cuisines } : initialState
  );

  return (
    <RestaurantsContext.Provider value={{ restaurantState, restaurantDispatch }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export { RestaurantsProvider, RestaurantsContext };
