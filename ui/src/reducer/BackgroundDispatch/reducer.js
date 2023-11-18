import { DISPATCH } from "./actions";

const initialState = {
  data: {},
  apiInterface: "",
  shouldDispatch: false,
  store: "",
  func: () => {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPATCH: {
      const shouldDispatch = Object.keys(action.payload.data).length > 0;
      return {
        data: action.payload.data,
        apiInterface: action.payload.apiInterface,
        shouldDispatch: shouldDispatch,
        store: action.payload.store,
        func: action.payload.func,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, reducer };
