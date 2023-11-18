export default class UserPreferences {
  constructor(axiosAgent) {
    this.axiosAgent = axiosAgent;
    this.name = "Preference";
  }

  async add(params) {
    await this.axiosAgent
      .post(`preferences/add`, { ...params })
      .then((preferenceData) => {
        console.log(preferenceData);
        return preferenceData;
      })
      .catch((error) => ({
        error,
        preference: undefined,
      }));
  }
}
