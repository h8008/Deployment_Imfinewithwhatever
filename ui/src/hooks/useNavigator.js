import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useNavigator = (props) => {
  const { dest, cond } = props;

  const navigate = useNavigate();
  useEffect(() => {
    if (cond) {
      navigate(dest);
    }
  }, [cond, dest, navigate]);
};

export default useNavigator;
