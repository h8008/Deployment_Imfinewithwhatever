import { HYDRATE } from "./actions";

const initialState = {
  data: {},
  apiInterface: "",
  email: "",
  shouldHydrate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: {
      const shouldHydrate = Object.keys(action.payload.data).length > 0;
      return {
        data: action.payload.data,
        apiInterface: action.payload.apiInterface,
        email: action.payload.email,
        shouldHydrate: shouldHydrate,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, reducer };
