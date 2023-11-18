import { Fragment, useContext, useEffect, useCallback } from "react";
import { NavigationContext } from "../../providers/NavigationProvider";
import { GET_LOCATION_CHANGE } from "../../reducer/Navigation/actions";
import { useLocation, useNavigate } from "react-router-dom";

const useUpdatePageHistory = (prev, cur, navigationDispatch) => {
  const updatePageHistory = useCallback(() => {
    if (prev !== cur) {
      navigationDispatch({
        type: GET_LOCATION_CHANGE,
        payload: {
          location: cur,
        },
      });
    }

    updatePageHistory();
  }, [prev, cur, navigationDispatch]);
};

const Navigation = () => {
  const { navigationState, navigateDispatch } = useContext(NavigationContext);
  const { shouldNavigate, destination, options, history } = navigationState;
  const navigate = useNavigate();
  const location = useLocation();

  useUpdatePageHistory(history[-1], location, navigateDispatch);

  useEffect(() => {
    if (shouldNavigate) navigate(destination, options);
  }, [destination, navigate, options, shouldNavigate]);

  return <Fragment></Fragment>;
};

export default Navigation;
