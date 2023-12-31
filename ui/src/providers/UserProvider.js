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
  // const newUserState = { ...initialUserState }

  // console.log("logged in ? ", loggedIn == null)
  // console.log("email", email == null)

  const initialArgs = loggedIn == null && email == null? { ...initialUserState, loggedIn: false, email: "" } : initialUserState

  const [userState, userDispatch] = useReducer(
    UserReducer,
    initialArgs
  );

  return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
