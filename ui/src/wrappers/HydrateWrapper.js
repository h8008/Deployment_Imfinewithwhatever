import { Fragement, useContext } from "react";
import useHydrate from "../hooks/useHydrate";
import useDetectRefresh from "../hooks/useDetectRefresh";
import { UserContext } from "../providers/UserProvider";

const HydrateWrapper = (props) => {
  const { userDispatch } = useContext(UserContext);
  const [refresh] = useDetectRefresh();
  useHydrate({ userDispatch, refresh });

  return <Fragement>{props.children}</Fragement>;
};

export default HydrateWrapper;
