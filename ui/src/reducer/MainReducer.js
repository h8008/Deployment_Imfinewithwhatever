import { UPDATE_LOCATION, UPDATE_CUISINE, UPDATE_OPTION, UPDATE_RESTAURANT, UPDATE_RESTAURANTS } from "./MainActions";
import Cookies from "js-cookie";

const initialState = {
  location: "",
  options: [],
  option: "",
  cuisines: [], // this is an alias for the food_prefs mentioned in the design doc
  allCuisines: ["Japanese", "Filipino", "Burgers", "Italian", "Chinese", "BBQ", "Asian", "American", "Pizza"],
  restaurantsData: undefined,
  restaurant: {},
  region: {},
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case UPDATE_LOCATION: {
      newState = { ...state, location: action.location };
      break;
    }
    case UPDATE_CUISINE: {
      newState = { ...state, cuisines: action.cuisines };
      break;
    }
    case UPDATE_OPTION: {
      newState = { ...state, option: action.option };
      break;
    }
    case UPDATE_RESTAURANT: {
      newState = { ...state, restaurant: { ...action.restaurant } };
      break;
    }
    case UPDATE_RESTAURANTS: {
      newState = {
        ...state,
        restaurantsData: action.restaurantsData,
        region: action.region,
      };
      break;
    }
    default:
      return state;
  }
  Cookies.set("cuisines", newState.cuisines);
  Cookies.set("location", newState.location);
  // Cookies.set("restaurant", JSON.stringify(newState.restaurant));
  return newState;
};

export { initialState, reducer };
