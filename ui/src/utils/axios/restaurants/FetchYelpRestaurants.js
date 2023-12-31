import { API } from "../../../API_Interface";

const fetchRestaurantsFromYelp = async () => {
  const res = await API.Restaurants.get();
  return res.status === "OK" ? res.data : undefined;
};

export default fetchRestaurantsFromYelp;
