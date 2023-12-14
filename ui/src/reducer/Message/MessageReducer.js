import { UPDATE_MESSAGE, UPDATE_MODAL_OPEN, BULK_UPDATE } from "./MessageAction";

const initialMessageState = {
  message: "",
  modalOpen: false,
  interactive: false,
  onModalClick: () => {},
};

// const modalClickDefaultBehavior = (state) => ({ ...state, modalOpen: false });
const modalClickDefaultBehavior = () => {};

const messageReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE: {
      const newState = {
        ...state,
        message: action.message,
        modalOpen: true,
        interactive: action.interactive == null ? initialMessageState.interactive : action.interactive,
      };
      newState.onModalClick =
        action.onModalClick == null
          ? modalClickDefaultBehavior
          : () => {
              action.onModalClick();
            };
      return newState;
    }
    case UPDATE_MODAL_OPEN: {
      return {
        ...state,
        modalOpen: action.modalOpen,
        message: !action.modalOpen ? "" : state.message,
      };
    }
    case BULK_UPDATE: {
      const stateKeys = Object.keys(state);
      const newState = Object.fromEntries(
        stateKeys.map((key) => {
          if (action.payloads[key] != null) {
            return [key, action.payloads[key]];
          }
          return [key, state[key]];
        })
      );
      return newState;
    }
    default:
      return { ...state };
  }
};

export { messageReducer, initialMessageState };
