import { NAVIGATE } from "./actions";

const initialState = {
  shouldNavigate: false,
  destination: "",
  options: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE: {
      return {
        shouldNavigate: true,
        destination: action.payload.destination,
        options: action.payload.options == null ? {} : action.payload.options,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, reducer };
