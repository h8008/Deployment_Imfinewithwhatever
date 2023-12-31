import { API } from "../../../API_Interface";

const stealRestaurantsFromYelp = async (params) => {
  const res = await API.Restaurants.add(params);
  return res;
};

export default stealRestaurantsFromYelp;
