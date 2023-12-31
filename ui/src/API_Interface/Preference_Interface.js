import Methods_Interface from "./Methods_Interface";

export default class Preference extends Methods_Interface {
  constructor() {
    super()
    // this.axiosAgent = axiosAgent;
    this.name = "Preference";
  }

  // async add(params) {
  //   return await this.axiosAgent
  //     .post(`preferences/add`, { ...params })
  //     .then((preferenceData) => {
  //       return preferenceData;
  //     })
  //     .catch((error) => ({
  //       error,
  //       preference: undefined,
  //     }));
  // }

  // async getAllForCurrentUser(params) {
  //   return await this.axiosAgent({
  //     url: `preferences/currentuser/getall`,
  //     method: "get",
  //     params: {
  //       ...params,
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.data)
  //     .catch((error) => ({
  //       error,
  //       preferences: undefined,
  //     }));
  // }

  // async getAll() {
  //   return await this.axiosAgent({
  //     url: `preferences/getall`,
  //     method: "get",
  //   })
  //     .then((response) => response.data)
  //     .catch((error) => ({
  //       error,
  //       preferences: undefined,
  //     }));
  // }

  async getAllForCurrentUser(params) {
    return await this.get({ url: `preferences/currentuser/getall`, params}).then((response) => response.data)
    .catch((error) => ({
      error,
      preferences: [],
    }));
  }

  async add(params) {
    return await this.post({ url: `preferences/add`, params: params}).then((response) => response.data)
    .catch((error) => ({
      error,
      preferences: [],
    }));
  }

  async getAll() {
    return await this.get({ url: `preferences/getall`}).then((response) => response.data)
    .catch((error) => ({
      error,
      preferences: [],
    }));
  }
}
