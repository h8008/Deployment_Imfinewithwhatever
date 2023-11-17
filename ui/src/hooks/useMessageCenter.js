import { useContext, useEffect } from "react";
import { UPDATE_MESSAGE } from "../reducer/Message/MessageAction";
import { MessageContext } from "../providers/MessageProvider";

const useMessageCenter = (message, condition) => {
  const { messageDispatch } = useContext(MessageContext);

  useEffect(() => {
    if (condition) {
      messageDispatch({
        type: UPDATE_MESSAGE,
        message: message,
      });
    }
  }, [message, messageDispatch, condition]);
};

export default useMessageCenter;
