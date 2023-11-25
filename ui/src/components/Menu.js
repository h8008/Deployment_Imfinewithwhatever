import { useCallback, useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Text from "../ui_components/Text";
import Box from "../ui_components/Box";

import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

import { UserContext } from "../providers/UserProvider";
import SwipeableDrawer from "../ui_components/SwipeableDrawer";

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

const LinkComponent = styled(Link)((props) => ({
  width: "50px",
  height: "50px",
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "50px",
}));

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
    <LinkComponent key={index} to={option} color={props.palette.primary.contrastText}>
      <Text text={getName(option)} color={props.palette.primary.contrastText} />
    </LinkComponent>
  ));

const Menu = (props) => {
  const { palette } = useTheme();
  const { userState, userDispatch } = useContext(UserContext);

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
      <SwipeableDrawer items={getLinkComponents({ options, palette })} drawerWidth={250} />
      {/* {options.map((option, index) => (
        <LinkComponent key={index} to={option} color={palette.primary.contrastText}>
          <Text text={getName(option)} color={palette.primary.contrastText} />
        </LinkComponent>
      ))} */}
    </MenuComponent>
  );
};

export default Menu;
