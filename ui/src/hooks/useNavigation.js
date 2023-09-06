// Reference: https://stackoverflow.com/questions/61307773/react-natives-usenavigation-hook-inside-of-a-custom-hook

import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const to = (dest) => navigate(`/${to}`);

  return { to };
};

export default useNavigation;
