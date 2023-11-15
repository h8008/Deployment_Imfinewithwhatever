import { Fragment, useContext, useEffect } from "react";
import { NavigationContext } from "../../providers/NavigationProvider";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { navigatorState } = useContext(NavigationContext);
  const { shouldNavigate, destination, options } = navigatorState;
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldNavigate) navigate(destination, options);
  }, [destination, navigate, options, shouldNavigate]);

  return <Fragment></Fragment>;
};

export default Navigation;
