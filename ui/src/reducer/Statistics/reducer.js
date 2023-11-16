import { UPDATE_EXTERNAL_API_CALLS, UPDATE_RELOAD } from "./actions";

const initialState = {
  reloaded: false,
  externalAPICalls: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EXTERNAL_API_CALLS: {
      return { ...state, externalAPICalls: state.externalAPICalls + 1, fetchNewData: true };
    }
    case UPDATE_RELOAD: {
      return { ...state, reloaded: true };
    }
    default: {
      return state;
    }
  }
};

export { reducer, initialState };
