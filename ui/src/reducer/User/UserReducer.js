import { LOGIN, LOGOUT, UPDATE_PREFERENCES } from "./UserActions";
import Cookies from "js-cookie";
import API from "../../API_Interface";

// const getAllRestaurantPreferencesForUser = (email) => {
//   return new Promise(async (resolve, reject) => {
//     const res = await API.Users.getAllRestaurantPreferencesForUser({
//       email: email,
//     });
//     if (res.status === "OK") {
//       return resolve(res.data);
//     }
//     console.log(res.message);
//     return resolve([]);
//   });
// };

const initialUserState = async () => {
  const loggedIn = Cookies.get("loggedIn");
  const email = Cookies.get("email");
  const preferences = [];
  return {
    loggedIn: loggedIn == null ? false : Cookies.get("loggedIn"),
    email: email == null ? "" : Cookies.get("email"),
    preferences: preferences,
  };
};

const UserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      Cookies.set("email", action.email);
      Cookies.set("loggedIn", true);
      return { ...state, loggedIn: true, email: action.email };
    case LOGOUT:
      Cookies.remove("email");
      Cookies.remove("loggedIn");
      Cookies.remove("access_token");
      Cookies.remove("restaurantData");
      return initialUserState;
    case UPDATE_PREFERENCES:
      return { ...state, preferences: action.preferences };
    default:
      return state;
  }
};

export { UserReducer, initialUserState };
