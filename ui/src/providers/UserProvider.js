import { useReducer, createContext } from "react";
import { UserReducer, initialUserState } from "../reducer/User/UserReducer";
import { useCookies } from "react-cookie";
import cookies from 'js-cookie'

const UserContext = createContext();

// Global provider for the state of the currently logged in user
const UserProvider = ({ children }) => {
  // const [cookies, setCookies] = useCookies();
  const loggedIn = cookies.get("loggedIn");
  const email = cookies.get("email");

  const initialArgs = JSON.stringify(loggedIn) !== "undefined" && JSON.stringify(email) !== "undefined" ? { ...initialUserState, loggedIn: false, email: "" } : initialUserState

  const [userState, userDispatch] = useReducer(
    UserReducer,
    initialArgs
  );

  return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
