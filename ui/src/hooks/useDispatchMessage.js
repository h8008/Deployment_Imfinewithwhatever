import { useEffect, useContext } from "react";
import { MessageContext } from "../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../reducer/Message/MessageAction";

const useDispatchMessage = (message) => {
  const { messageDispatch } = useContext(MessageContext);
  useEffect(() => {
    if (message !== "") {
      messageDispatch({
        type: UPDATE_MESSAGE,
        message: message,
      });
    }
  }, [message, messageDispatch]);
};

export default useDispatchMessage;
