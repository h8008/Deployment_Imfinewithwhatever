export default class Users {
  constructor(axiosAgent) {
    this.axiosAgent = axiosAgent;
    this.name = "Users";
  }

  async login(params) {
    return this.axiosAgent({
      url: `users/login`,
      method: "post",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((loginInfo) => loginInfo.data)
      .catch((error) => ({
        error,
        user: undefined,
      }));
  }

  async signup(params) {
    return this.axiosAgent
      .post(`users/signup`, { ...params })
      .then((signupInfo) => signupInfo.data)
      .catch((error) => ({
        error,
        user: undefined,
      }));
  }

  async addFoodPreference(params) {
    const { email, restaurantId, preference } = params;
    return this.axiosAgent
      .post(`users/user/food_preference`, {
        email,
        restaurantId,
        preference,
      })
      .then((foodPrefInfo) => foodPrefInfo.data)
      .catch((error) => ({
        error,
        foodPreference: undefined,
      }));
  }

  async addRestaurantPreference(params) {
    return this.axiosAgent
      .post(`users/user/restaurant_preference`, [...params])
      .then((restaurantPrefInfo) => restaurantPrefInfo.data)
      .catch((error) => ({
        error,
        restaurantPreference: undefined,
      }));
  }

  async updateRestaurantPreference(params) {
    return this.axiosAgent
      .post(`users/user/restaurant_preference/update`, { ...params })
      .then((restaurantPrefInfo) => restaurantPrefInfo.data)
      .catch((error) => ({
        error,
        restaurantPreference: undefined,
      }));
  }

  async getRestaurantPreferences(params) {
    const { email, restaurantID } = params;
    return this.axiosAgent
      .get(`users/user/restaurant_preference/${email}/${restaurantID}`)
      .then((restaurantPrefInfo) => restaurantPrefInfo.data)
      .catch((error) => ({
        error,
        restaurantPreference: undefined,
      }));
  }

  async getAllRestaurantPreferencesForUser(params) {
    const { email } = params;
    return this.axiosAgent
      .get(`users/user/restaurant_preferences/${email}`)
      .then((restanrantPrefInfo) => restanrantPrefInfo.data)
      .catch((error) => ({
        error,
        restaurantPreference: undefined,
      }));
  }

  async updateLikeRestaurant(params) {
    const { like } = params;
    return this.axiosAgent
      .get(`users/user/restaurant_preferences/${like}`)
      .then((restaurantPrefInfo) => restaurantPrefInfo.data)
      .catch((error) => ({
        error,
        restanrantPrefInfo: undefined,
      }));
  }

  async addCurrentUserData(params) {
    return this.axiosAgent
      .post(`users/user/current_user/update`, params)
      .then((currentUserInfo) => currentUserInfo.data)
      .catch((error) => ({
        error,
        currentUserInfo: undefined,
      }));
  }

  // async getCurrentUserData(params) {
  //   return this.axiosAgent
  //     .get(`users/user/current_user`, params)
  //     .then((currentUserInfo) => currentUserInfo.data)
  //     .catch((error) => ({
  //       error,
  //       currentUserInfo: undefined,
  //     }));
  // }

  async fetchYelpAPIData(params) {
    return (
      this.axiosAgent({
        url: `users/currentuser/yelp`,
        method: "get",
        params: {
          email: params.email,
        },
      })
        // .get(`users/currentuser/yelp/${params.email}`)
        .then((currentUserInfo) => currentUserInfo.data)
        .catch((error) => ({
          error,
          currentUserInfo: undefined,
        }))
    );
  }

  async updateCurrentUser(params) {
    return this.axiosAgent
      .post(`currentuser/update`, params)
      .then((currentUserInfo) => currentUserInfo.data)
      .catch((error) => ({
        error,
        currentUserInfo: undefined,
      }));
  }
}
