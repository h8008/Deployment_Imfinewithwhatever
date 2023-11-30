import { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Text from "../../ui_components/Text";
import API_Interface from "../../API_Interface";
import { UserContext } from "../../providers/UserProvider";
import { LOGOUT } from "../../reducer/User/UserActions";
import useNavigator from "../../hooks/useNavigator";

const useLogout = () => {
  const { userDispatch } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const logout = async () => {
      const res = await API_Interface.Users.logout();
      if (res.status === "OK") {
        userDispatch({
          type: LOGOUT,
        });
        setLoggedOut(true);
      }
    };
    logout();
  }, [userDispatch]);

  return [loggedOut, setLoggedOut];
};

const Logout = (props) => {
  const [loggedOut, setLoggedOut] = useLogout();

  useNavigator({ dest: "/", cond: loggedOut });

  return (
    <Grid>
      <Text text="Signing Out" />
    </Grid>
  );
};

export default Logout;
