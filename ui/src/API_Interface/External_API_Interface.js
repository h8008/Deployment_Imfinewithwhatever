import Methods_Interface from "./Methods_Interface";

export default class YelpAPI extends Methods_Interface {
  constructor() {
    super()
    // this.axiosAgent = axiosAgent;
    this.name = "YelpAPI";
    this.headers = {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    };
    this.endpoint = "https://api.yelp.com/v3/businesses/search";
    // this.get = this.getRestaurantsByLocation.bind(this);
  }

  // async getRestaurantsByLocation(params) {
  //   return await this.axiosAgent({
  //     url: `yelp/restaurants/${params.term}/${params.location}`,
  //     method: "get",
  //   })
  //     .then((restaurantInfo) => {
  //       return restaurantInfo.data;
  //     })
  //     .catch((error) => ({
  //       error,
  //       restaurants: undefined,
  //     }));
  // }

  async getRestaurantsByLocation(params) {
    return await this.get({
      url: `yelp/restaurantsbylocation`,
      params,
      headers: this.headers
    })
      .then((restaurantInfo) => {
        return restaurantInfo.data;
      })
      .catch((error) => ({
        error,
        restaurants: undefined,
      }));
  }

  async getRestaurantsByCuisine(params) {
    return await this.get({ url: `yelp/restaurantsbycuisines`, params, headers: this.headers }).then((restaurantInfo) => {
        return restaurantInfo.data;
      })
      .catch((error) => ({
        error,
        restaurant: undefined,
      }));
  }

  // async getRestaurantsByCuisine(params) {
  //   const { term, location, categories } = params;
  //   return await this.axiosAgent({
  //     url: `yelp/restaurants/${term}/${location}/${categories}`,
  //     method: "get",
  //   })
  //     .then((restaurantInfo) => {
  //       return restaurantInfo.data;
  //     })
  //     .catch((error) => ({
  //       error,
  //       restaurant: undefined,
  //     }));
  // }

  // async getRestaurantById(params) {
  //   return await this.axiosAgent({
  //     url: `yelp/restaurant/${params.id}`,
  //     method: "get",
  //   })
  //     .then((restaurantInfo) => restaurantInfo.data)
  //     .catch((error) => ({
  //       error,
  //       restaurant: undefined,
  //     }));
  // }

  async getRestaurantById(params) {
    return await this.get({
      url: `yelp/restaurant`,
      params,
      headers: this.headers
    })
      .then((restaurantInfo) => restaurantInfo.data)
      .catch((error) => ({
        error,
        restaurant: undefined,
      }));
  }

  async getRestaurantReviews(params) {
    return await this.get({
      url: `yelp/restaurant/${params.id}/reviews`,
      params,
      headers: this.headers
    })
      .then((restaurantInfo) => restaurantInfo.data)
      .catch((error) => ({
        error,
        restaurant: undefined,
      }));
  }

  // async getRestaurantReviews(params) {
  //   return await this.axiosAgent({
  //     url: `yelp/restaurant/${params.id}/reviews`,
  //     method: "get",
  //   })
  //     .then((restaurantInfo) => restaurantInfo.data)
  //     .catch((error) => ({
  //       error,
  //       restaurant: undefined,
  //     }));
  // }
}
