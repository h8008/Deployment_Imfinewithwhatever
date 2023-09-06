import {
  UPDATE_MESSAGE,
  UPDATE_MODAL_OPEN,
  BULK_UPDATE,
} from "./MessageAction";

const initialMessageState = {
  message: "",
  modalOpen: false,
  interactive: false,
  onModalClick: () => {},
};

const messageReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.message,
        modalOpen: true,
        interactive:
          action.interactive == null
            ? initialMessageState.interactive
            : action.interactive,
        onModalClick:
          action.onModalClick == null
            ? initialMessageState.onModalClick
            : action.onModalClick,
      };
    case UPDATE_MODAL_OPEN:
      return {
        ...state,
        modalOpen: action.modalOpen,
        message: !action.modalOpen ? "" : state.message,
      };
    case BULK_UPDATE:
      // const keys = action.keys
      // const newValues = action.values
      const stateKeys = Object.keys(state);
      let newState = Object.fromEntries(
        stateKeys.map((key) => {
          if (action.payloads[key] != null) {
            return [key, action.payloads[key]];
          }
          return [key, state[key]];
        })
      );
      return newState;
    default:
      return { ...state };
  }
};

export { messageReducer, initialMessageState };
