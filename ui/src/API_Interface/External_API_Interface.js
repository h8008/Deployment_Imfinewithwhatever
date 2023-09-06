// import * as dotenv from 'dotenv'
// dotenv.config({ path: '../../.env'})
// import webpack from 'webpack'
// import dotenv from 'dotenv'

export default class YelpAPI {
  constructor(axiosAgent) {
    this.axiosAgent = axiosAgent;
    this.name = "YelpAPI";
    this.headers = {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    };
    this.endpoint = "https://api.yelp.com/v3/businesses/search";
    this.get = this.getRestaurantsByLocation.bind(this);
  }

  async getRestaurantsByLocation(params) {
    return this.axiosAgent({
      url: `yelp/restaurants/${params.term}/${params.location}`,
      method: "get",
    })
      .then((restaurantsInfo) => restaurantsInfo.data)
      .catch((error) => ({
        error,
        restaurants: undefined,
      }));
  }

  async getRestaurantsByCuisine(params) {
    const { term, location, categories } = params;
    return this.axiosAgent({
      url: `yelp/restaurants/${term}/${location}/${categories}`,
      method: "get",
    })
      .then((restaurantInfo) => restaurantInfo.data)
      .catch((error) => ({
        error,
        restaurant: undefined,
      }));
  }

  async getRestaurantById(params) {
    return this.axiosAgent({
      url: `yelp/restaurant/${params.id}`,
      method: "get",
    })
      .then((restaurantInfo) => restaurantInfo.data)
      .catch((error) => ({
        error,
        restaurant: undefined,
      }));
  }
}
