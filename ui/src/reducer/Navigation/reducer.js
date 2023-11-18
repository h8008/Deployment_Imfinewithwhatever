import { NAVIGATE, GET_LOCATION_CHANGE, UPDATE_HISTORY } from "./actions";

const initialState = {
  shouldNavigate: false,
  destination: "",
  options: {},
  history: [],
  locationChanged: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE: {
      return {
        ...state,
        shouldNavigate: true,
        destination: action.payload.destination,
        options: action.payload.options == null ? {} : action.payload.options,
      };
    }
    case GET_LOCATION_CHANGE: {
      const locationChanged = state.history[-1] !== action.payload.location;
      return {
        ...state,
        history: locationChanged ? [...state.history, action.payload.location] : [...state.history],
        locationChanged: locationChanged,
      };
    }
    case UPDATE_HISTORY: {
      return {
        ...state,
        history: [...state.history, action.payload.history],
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, reducer };
