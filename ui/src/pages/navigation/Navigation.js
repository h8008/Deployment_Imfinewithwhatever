import { Fragment, useContext, useEffect } from "react";
import { NavigationContext } from "../../providers/NavigationProvider";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { navigationState } = useContext(NavigationContext);
  const { shouldNavigate, destination, options } = navigationState;
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldNavigate) navigate(destination, options);
  }, [destination, navigate, options, shouldNavigate]);

  return <Fragment></Fragment>;
};

export default Navigation;
