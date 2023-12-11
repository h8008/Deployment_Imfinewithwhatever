import API from "../../../API_Interface";

const getFoodPreferences = (preferences) => {
  const lowercased_categories = preferences.map((preference) => {
    const charArray = preference.split().map((char, index) => {
      if (index === 0) {
        return char.toLowerCase();
      }
      return char;
    });
    return charArray.join(", ");
  });
  return lowercased_categories.reduce((string, category, categoryIdx) => `${string}${category},`, "").slice(0, -1);
};

const getRestaurantsByCuisines = async (cuisines, location = "San Jose") => {
  let params = {
    term: "food",
    location: location,
    categories: await getFoodPreferences(cuisines),
  };
  let restaurant_by_cuisine_response = await API.YelpAPI.getRestaurantsByCuisine(params);
  if (restaurant_by_cuisine_response.status === "OK") {
    return restaurant_by_cuisine_response.restaurantsData;
  }
  return {};
};

export default getRestaurantsByCuisines;
