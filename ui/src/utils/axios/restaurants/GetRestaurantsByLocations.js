import API from "../../../API_Interface";

const getRestaurantsByLocations = async (location) => {
  let params = { term: "restaurant", location: location };
  let restaurant_by_location_response = await API.YelpAPI.getRestaurantsByLocation(params);
  if (restaurant_by_location_response.status === "OK") {
    return restaurant_by_location_response.restaurantsData;
  }
  return {};
};

export default getRestaurantsByLocations;
