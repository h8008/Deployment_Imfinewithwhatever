import { API } from "../../API_Interface";

const handleGetRestaurantsByCuisine = async (cuisineParams) => {
  return await API.YelpAPI.getRestaurantsByCuisine(cuisineParams);
};

const handleGetRestaurantByLocation = async (locationParams) => {
  return await API.YelpAPI.getRestaurantsByLocation(locationParams);
};

const handleGetAggregatedRestaurantsData = async (base, add) => {
  return await {
    ...base,
    ...add.restaurantData,
  };
};

export { handleGetRestaurantsByCuisine, handleGetRestaurantByLocation, handleGetAggregatedRestaurantsData };
