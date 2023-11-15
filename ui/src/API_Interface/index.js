import axios from "axios";
import Users from "./User_Interface";
import UserReviews from "./User_Review_Interface";
import YelpAPI from "./External_API_Interface";
import axiosBaseUrl from "../utils/AxiosBaseUrl";

const AxiosConfigured = () => {
  // // Indicate to the API that all requests for this app are AJAX
  // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  // Set the baseURL for all requests to the API domain instead of the current domain
  // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
  axios.defaults.baseURL = axiosBaseUrl();
  // Allow the browser to send cookies to the API domain (which include auth_token)
  axios.defaults.withCredentials = true;
  //    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

  axios.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
    common: {
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  return axios;
};

const axiosAgent = AxiosConfigured();

class APIInterface {
  constructor() {
    this.Users = new Users(axiosAgent);
    this.UserReviews = new UserReviews(axiosAgent);
    this.YelpAPI = new YelpAPI(axiosAgent);
  }

  getInterface(interfaceName) {
    return this[`${interfaceName}`];
  }

  apiResHandling(res) {
    if (res.status === "OK" || res.status === "NOT FOUND") {
      console.log(res.message);
      return res.data;
    } else {
      return null;
    }
  }
}

export default new APIInterface();
