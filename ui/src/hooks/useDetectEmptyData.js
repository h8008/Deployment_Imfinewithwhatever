import { useState } from "react";
import useMessageCenter from "./useMessageCenter";
import useNavigation from "./useNavigation";

const useDetectEmptyData = (message, data, destinationOnEmptyData) => {
  const [messageCenterOpen, setMessageCenterOpen] = useState(true);
  const onMessageCenterCloseCallback = () => {
    setMessageCenterOpen(false);
  };
  useMessageCenter(message, data == null);
  useNavigation(destinationOnEmptyData);
};

export default useDetectEmptyData;
