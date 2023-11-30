import { LOGIN, LOGOUT, UPDATE_PREFERENCES, HYDRATE } from "./UserActions";
import Cookies from "js-cookie";

// const getInitialUserState = async () => {
//   const loggedIn = Cookies.get("loggedIn");
//   const email = Cookies.get("email");
//   const preferences = [];
//   const data = null;
//   return {
//     loggedIn: loggedIn == null ? false : Cookies.get("loggedIn"),
//     email: email == null ? "" : Cookies.get("email"),
//     preferences: preferences,
//     data: data,
//   };
// };

const initialUserState = {
  loggedIn: Cookies.get("loggedIn") == null ? false : Cookies.get("loggedIn"),
  email: Cookies.get("email") == null ? "" : Cookies.get("email"),
  preferences: [],
  data: null,
};

const UserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      Cookies.set("email", action.email);
      Cookies.set("loggedIn", true);
      return { ...state, loggedIn: true, email: action.email };
    case LOGOUT:
      return initialUserState;
    case UPDATE_PREFERENCES:
      return { ...state, preferences: action.preferences };
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export { UserReducer, initialUserState };
