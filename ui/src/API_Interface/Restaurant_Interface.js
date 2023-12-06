export default class Restaurants {
  constructor(axiosAgent) {
    this.axios = axiosAgent;
    this.name = "Restaurants";
  }

  async add(params) {
    return await this.axios({
      url: `restaurants/add`,
      method: "post",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((restaurantsInfo) => restaurantsInfo.data)
      .catch((error) => ({
        error,
        restaurants: undefined,
        message: undefined,
      }));
  }
}
