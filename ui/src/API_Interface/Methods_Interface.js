import Cookies from "js-cookie"
import axios from "axios";
import axiosBaseUrl from "../utils/AxiosBaseUrl";

const AxiosConfigured = () => {
  // // Indicate to the API that all requests for this app are AJAX
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  // Set the baseURL for all requests to the API domain instead of the current domain
  // Allow the browser to send cookies to the API domain (which include auth_token)
  axios.defaults.baseURL = axiosBaseUrl();
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

export default class Methods_Interface {
    constructor() {
        this.axiosAgent = axiosAgent
    }

    async get(request) {
        const params = request.params ? request.params : {} 
        const url = request.url
        const email = params.email ? params.email : Cookies.get("email")
        return await this.axiosAgent.get(url, {
          params: { ...params, email},
          headers: {
            "Content-Type": "application/json",
          }
        })
      }
    
      async post(request) {
        const params = request.params ? request.params : {} 
        return await this.axiosAgent({
          url: request.url,
          method: "post",
          data: { ...params, email: Cookies.get("email")}
        })
        .then((reviewsInfo) => reviewsInfo.data)
        .catch((error) => ({
          error,
          reviews: undefined,
        }));
      }
}