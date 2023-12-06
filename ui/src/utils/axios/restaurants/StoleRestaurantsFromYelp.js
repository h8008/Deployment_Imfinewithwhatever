import API from "../../../API_Interface";

const useStealRestaurantsFromYelp = async (params) => {
  const res = await API.Restaurants.add(params);
  return res;
};

export default useStealRestaurantsFromYelp;
