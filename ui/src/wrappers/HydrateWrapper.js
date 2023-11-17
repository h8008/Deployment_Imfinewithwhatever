import { Fragment, useContext } from "react";
import useHydrate from "../hooks/useHydrate";
import useDetectRefresh from "../hooks/useDetectRefresh";
import { RestaurantsContext } from "../providers/RestaurantsProvider";
import { UserContext } from "../providers/UserProvider";

const HydrateWrapper = (props) => {
  const { userState: user, userDispatch } = useContext(UserContext);
  const { restaurantState: restaurant, restaurantDispatch } = useContext(RestaurantsContext);
  const [refresh] = useDetectRefresh();
  useHydrate({ dispatch: restaurantDispatch, refresh, email: user.email });

  return <Fragment>{props.children}</Fragment>;
};

export default HydrateWrapper;
