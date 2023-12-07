import { useCallback, useContext, useState, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { UserContext } from "../providers/UserProvider";
import SwipeableDrawer from "../ui_components/SwipeableDrawer";

import { TiThMenuOutline } from "react-icons/ti";

const IconComponent = styled(TiThMenuOutline)(({ children, theme, ...otherProps }) => ({
  width: "35px",
  height: "35px",
  // color: "white",
  color: theme.palette.error.light.main,
}));

const MenuComponent = styled(Grid)((props) => ({
  width: "100%",
  height: "5vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: props.color,
  zIndex: 1,
}));

const LinkComponent = styled(NavLink)((props) => ({
  width: "100%",
  height: "50px",
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const LinkNameComponent = styled(Typography)(({ theme, children, ...otherProps }) => ({
  color: theme.palette.primary.dark.main,
  textAlign: "center",
  alignItems: "center",
  ...otherProps,
}));

const handleNavigate = (to, navigate) => {
  navigate(to);
};

const getOptions = (loggedIn, dest) => {
  return dest === "Login" && loggedIn ? "Logout" : dest;
};

const getName = (option) => {
  return option === "/" ? "Home" : option.slice(1, option.length);
};

const getDest = (to, loggedIn) => {
  let dest = getOptions(loggedIn, to);
  return dest === "Home" ? "/" : "/" + dest;
};

const intializeOptions = (names, loggedIn) => Object.values(names).map((name, idx) => getDest(name, loggedIn));

const getLinkComponents = (props) =>
  props.options.map((option, index) => (
    <LinkComponent
      key={index}
      to={option}
      onClick={() => handleNavigate(option, props.navigate)}
      color={props.palette.primary.contrastText}
      height={"100px"}
    >
      <LinkNameComponent width={"100%"} fontSize={"200%"}>
        {getName(option)}
      </LinkNameComponent>
    </LinkComponent>
  ));

const Menu = (props) => {
  console.log("Menu Component");

  const { palette } = useTheme();
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  const options = useMemo(() => {
    const names = {
      Home: "Home",
      Login: "Login",
      Main: "Main",
      Profile: "Profile",
    };
    return intializeOptions(names, userState.loggedIn);
  }, [userState.loggedIn]);

  return (
    <MenuComponent color={palette.primary.dark.main} data_id="navigation-component">
      <SwipeableDrawer
        slideIcon={IconComponent}
        items={getLinkComponents({ options, palette, navigate })}
        drawerWidth={250}
      />
    </MenuComponent>
  );
};

export default Menu;
