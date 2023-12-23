import { UPDATE_MESSAGE, UPDATE_MODAL_OPEN, BULK_UPDATE } from "./MessageAction";

const initialMessageState = {
  message: "",
  modalOpen: false,
  interactive: false,
  onModalClick: () => {},
  clicked: false,
};

// const modalClickDefaultBehavior = (state) => ({ ...state, modalOpen: false });
const modalClickDefaultBehavior = () => {};

const messageReducer = (state = initialMessageState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_MESSAGE: {
      newState = {
        ...state,
        message: action.message,
        modalOpen: action.message !== "",
        interactive: action.interactive == null ? initialMessageState.interactive : action.interactive,
      };
      newState.onModalClick = action.onModalClick == null ? modalClickDefaultBehavior : () => action.onModalClick();
      break;
    }
    case UPDATE_MODAL_OPEN: {
      newState = {
        ...state,
        modalOpen: action.modalOpen,
        message: !action.modalOpen ? "" : state.message,
      };
      break;
    }
    // case BULK_UPDATE: {
    //   const stateKeys = Object.keys(state);
    //   const newState = Object.fromEntries(
    //     stateKeys.map((key) => {
    //       if (action.payloads[key] != null) {
    //         return [key, action.payloads[key]];
    //       }
    //       return [key, state[key]];
    //     })
    //   );
    //   return newState;
    // }
    default:
      return { ...state };
  }
  newState.clicked = newState.modalOpen !== state.modalOpen;
  return newState;
};

export { messageReducer, initialMessageState };
