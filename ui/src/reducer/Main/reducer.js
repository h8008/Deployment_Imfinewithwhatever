import { UPDATE_LOCATION, UPDATE_CUISINE, UPDATE_OPTION, UPDATE_RESTAURANT, UPDATE_RESTAURANTS } from "./actions";
import Cookies from "js-cookie";

const initialState = {
  location: "",
  options: [],
  option: "",
  cuisines: [], // this is an alias for the food_prefs mentioned in the design doc
  allCuisines: [
    "Mexican",
    "Japanese",
    "Filipino",
    "Burgers",
    "Italian",
    "Chinese",
    "BBQ",
    "Asian",
    "American",
    "Pizza",
  ],
  restaurantsData: [],
  restaurant: {},
  region: {},
  statistics: {
    externalFetching: true,
  },
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case UPDATE_LOCATION: {
      newState = { ...newState, location: action.location };
      break;
    }
    case UPDATE_CUISINE: {
      newState = { ...newState, cuisines: action.cuisines };
      break;
    }
    case UPDATE_OPTION: {
      newState = { ...newState, option: action.option };
      break;
    }
    case UPDATE_RESTAURANT: {
      newState = { ...newState, restaurant: { ...action.restaurant } };
      break;
    }
    case UPDATE_RESTAURANTS: {
      newState = {
        ...newState,
        restaurantsData: [...action.payload.restaurantsData],
        region: action.payload.region ? action.payload.region : newState.region,
      };

      console.log("new restaurants state", newState);

      break;
    }
    default:
      return state;
  }
  Cookies.set("cuisines", newState.cuisines);
  Cookies.set("location", newState.location);
  // Cookies.set("restaurant", JSON.stringify(newState.restaurant));
  newState = { ...newState, statistics: { externalFetching: state.restaurantsData == null } };
  return newState;
};

export { initialState, reducer };
