import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Text from "../../ui_components/Text";
import API_Interface from "../../API_Interface";
import { UserContext } from "../../providers/UserProvider";
import { LOGOUT } from "../../reducer/User/UserActions";
import useNavigator from "../../hooks/useNavigator";

const useLogout = () => {
  const { userDispatch } = useContext(UserContext);
  // const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const res = await API_Interface.Users.logout();
      if (res.status === "OK") {
        userDispatch({
          type: LOGOUT,
        });
        navigate("/");
      }
    };
    logout();
  }, [navigate, userDispatch]);

  // return [loggedOut, setLoggedOut];
};

const Logout = (props) => {
  useLogout();

  return (
    <Grid>
      <Text text="Signing Out" />
    </Grid>
  );
};

export default Logout;
