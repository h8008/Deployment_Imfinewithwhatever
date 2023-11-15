import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Text from "../ui_components/Text";
import Box from "../ui_components/Box";

import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

import { UserContext } from "../providers/UserProvider";
import { MessageContext } from "../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../reducer/Message/MessageAction";
import { LOGOUT } from "../reducer/User/UserActions";

const MenuComponent = styled(Grid)((props) => ({
  width: "100%",
  height: "5vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: props.color,
  zIndex: 1,
}));

const Menu = (props) => {
  const { palette } = useTheme();
  const { userState, userDispatch } = useContext(UserContext);
  const { messageDispatch } = useContext(MessageContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    userDispatch({
      type: LOGOUT,
    });
  };

  const options = {
    Home: "Home",
    Login: userState.loggedIn ? "Logout" : "Login",
    Main: "Main",
    Profile: "Profile",
  };

  const handleOptionClick = (clickedOption) => {
    if (clickedOption === "Home") {
      navigate("/");
    } else if (!userState.loggedIn && clickedOption !== "Login" && clickedOption !== "Logout") {
      navigate("/Login");
      messageDispatch({
        type: UPDATE_MESSAGE,
        message: "Please login",
      });
    } else if (clickedOption === "Logout") {
      handleLogout();
    } else {
      const destionation = options[clickedOption];
      navigate(`/${destionation}`);
    }
  };

  return (
    <MenuComponent color={palette.error.light} data_id="naviagation-component">
      {Object.values(options).map((option, index) => (
        <Box key={index} sx={{ marginRight: "20px" }} onClick={() => handleOptionClick(option)}>
          <Text text={option} color={palette.primary.contrastText} />
        </Box>
      ))}
    </MenuComponent>
  );
};

export default Menu;
