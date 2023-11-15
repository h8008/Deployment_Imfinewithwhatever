import { useContext, useEffect } from "react";
import API_Interface from "../API_Interface";
import { MessageContext } from "../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../reducer/Message/MessageAction";

const useDehydrate = (dehydratedData) => {
  useEffect(() => {
    const dehydrate = async () => {
      if (Object.keys(dehydratedData).length > 0) {
        const res = await API_Interface.Users.addCurrentUserData(dehydratedData);
      }
    };
    dehydrate();
  }, [dehydratedData]);
};

export default useDehydrate;
