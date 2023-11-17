import { useContext, useEffect } from "react";
import { UPDATE_MESSAGE } from "../reducer/Message/MessageAction";
import { MessageContext } from "../providers/MessageProvider";

const useMessageCenter = (message, condition, onMessageCenterCloseCallback = () => {}) => {
  const { messageDispatch } = useContext(MessageContext);

  useEffect(() => {
    if (condition) {
      messageDispatch({
        type: UPDATE_MESSAGE,
        message: message,
        onModalClick: onMessageCenterCloseCallback,
      });
    }
  }, [message, messageDispatch, condition, onMessageCenterCloseCallback]);
};

export default useMessageCenter;
