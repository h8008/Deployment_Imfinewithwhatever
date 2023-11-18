import { useCallback, useContext } from "react";
import { DISPATCH } from "../reducer/BackgroundDispatch/actions";
import { BackgroundDispatchContext } from "../providers/DeHydrateProvider";

const useBackgroundDispatcher = (props) => {
  const { backgroundDispatch } = useContext(BackgroundDispatchContext);

  const backgroundDispatcher = useCallback(
    () =>
      backgroundDispatch({
        type: DISPATCH,
        payload: {
          params: props.data,
          apiInterface: props.interface,
          store: props.store,
          func: props.apiInterface,
        },
      }),
    [backgroundDispatch, props.apiInterface, props.data, props.interface, props.store]
  );

  backgroundDispatcher();
};

export default useBackgroundDispatcher;
