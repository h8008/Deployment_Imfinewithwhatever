import { DEHYDRATE } from "./actions";

const initialState = {
  data: {},
  apiInterface: "",
  email: "",
  shouldHydrate: false,
  store: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DEHYDRATE: {
      const shouldDehydrate = Object.keys(action.payload.data).length > 0;
      return {
        data: action.payload.data,
        apiInterface: action.payload.apiInterface,
        email: action.payload.email,
        shouldDehydrate: shouldDehydrate,
        store: action.payload.store,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, reducer };
