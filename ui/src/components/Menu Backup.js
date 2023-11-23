import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Text from "../ui_components/Text";
import Box from "../ui_components/Box";

import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

import { UserContext } from "../providers/UserProvider";
import { MessageContext } from "../providers/MessageProvider";
import { NavigationContext } from "../providers/NavigationProvider";
import { UPDATE_MESSAGE } from "../reducer/Message/MessageAction";
import { LOGOUT } from "../reducer/User/UserActions";
import { NAVIGATE } from "../reducer/Navigation/actions";

import useNavigation from "../hooks/useNavigation";

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

const curryDestination = (clickedOption, options, loggedIn) => {
  if (clickedOption === "Home") {
    // navigate("/");
    // setDestination("/");
    return "/";
  } else if (!loggedIn && clickedOption !== "Login" && clickedOption !== "Logout") {
    // navigate("/Login");
    // setDestination("/Login");
    // messageDispatch({
    //   type: UPDATE_MESSAGE,
    //   message: "Please login",
    // });
    return "/Login";
  } else if (clickedOption === "Logout") {
    // handleLogout();
    return "/Logout";
  } else {
    const destination = `/${options[clickedOption]}`;
    // navigate(`/${destionation}`);
    // setDestination(destination);
    return destination;
  }
};

const useDetectLogout = (destination, logout) => {
  const detectLogout = useCallback(() => {
    if (destination === "/Logout") {
      logout();
    }
  }, [destination, logout]);
  detectLogout();
};

// const useDetectLogin = (destination, message)

const useHandleOptionClick = (clickedOption, setDestination, setClickedOption, options, loggedIn) => {
  const handleClick = useCallback(() => {
    if (clickedOption != null) {
      const curriedDestination = curryDestination(clickedOption, options, loggedIn);
      setDestination(curriedDestination);
      setClickedOption(null);
    }
  }, [clickedOption, setDestination, setClickedOption, options, loggedIn]);

  handleClick();
};

const Menu = (props) => {
  const { palette } = useTheme();
  const { userState, userDispatch } = useContext(UserContext);
  const { messageDispatch } = useContext(MessageContext);

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

  const [clickedOption, setClickedOption] = useState(null);
  const [destination, setDestination] = useState(null);
  useNavigation(destination, destination != null, { replace: true });
  useHandleOptionClick(clickedOption, setDestination, setClickedOption, options, userState.loggedIn);
  useDetectLogout(destination, handleLogout);

  // const curryDestination = (clickedOption) => {
  //   if (clickedOption === "Home") {
  //     // navigate("/");
  //     // setDestination("/");
  //     return "/"
  //   } else if (!userState.loggedIn && clickedOption !== "Login" && clickedOption !== "Logout") {
  //     // navigate("/Login");
  //     // setDestination("/Login");
  //     // messageDispatch({
  //     //   type: UPDATE_MESSAGE,
  //     //   message: "Please login",
  //     // });
  //     return "/Login"
  //   } else if (clickedOption === "Logout") {
  //     // handleLogout();
  //     return "/Logout"
  //   } else {
  //     const destination = `/${options[clickedOption]}`;
  //     // navigate(`/${destionation}`);
  //     // setDestination(destination);
  //     return destination
  //   }
  // };

  // const useDetectLogout = (destination) => {
  //   const detectLogout = useCallback(() => {
  //     if (destination === "/Logout") {
  //       handleLogout()
  //     }
  //   }, [destination])
  //   detectLogout()
  // }

  // const useHandleOptionClick = (clickedOption) => {
  //   const handleClick = useCallback(() => {
  //     if (clickedOption != null) {
  //       const curriedDestination = curryDestination(clickedOption)
  //       setDestination(curriedDestination)
  //     }
  //   }, [clickedOption])

  //   handleClick()
  // }

  const handleOptionClick = (option) => {
    setClickedOption(option);
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
