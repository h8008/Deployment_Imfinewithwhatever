import { useReducer, createContext } from "react";
import { UserReducer, initialUserState } from "../reducer/User/UserReducer";
import { useCookies } from "react-cookie";

const UserContext = createContext();

// Global provider for the state of the currently logged in user
const UserProvider = ({ children }) => {
  const [cookies, setCookies] = useCookies();
  const loggedIn = cookies.loggedIn;
  const email = cookies.email;
  const [userState, userDispatch] = useReducer(
    UserReducer,
    loggedIn != null && email != null ? { ...initialUserState, loggedIn: true, email: email } : initialUserState
  );

  return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
