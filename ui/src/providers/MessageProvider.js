import { useReducer, createContext } from "react";
import {
  messageReducer,
  initialMessageState,
} from "../reducer/Message/MessageReducer";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messageState, messageDispatch] = useReducer(
    messageReducer,
    initialMessageState
  );

  return (
    <MessageContext.Provider value={{ messageState, messageDispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };
