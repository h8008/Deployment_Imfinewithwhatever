import * as React from "react";
import { useState } from "react";

import { ListItemText, styled, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MUISwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendIcon from "@mui/icons-material/Send";

// import InputTwoToneIcon from "@mui/icons-material/InputTwoTone";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
// import { TiThMenuOutline } from "react-icons/ti";

// const SlideOutComponent = styled(InputTwoToneIcon)(({ theme }) => ({}));

const getSlideIcon = (Icon, color) => (Icon ? <Icon color={color} /> : <DoubleArrowIcon color={color} />);

const SideMenuComponent = styled(Grid)(({ children, ...otherProps }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  ...otherProps,
}));

const itemToListItem = (item, index, onSelectMenuItemCallback) => {
  const packageItem = (item) =>
    typeof item === "string" ? (
      <ListItemButton>
        <ListItemText primary={item} />
      </ListItemButton>
    ) : (
      item
    );
  return (
    <ListItem key={index} disablePadding onClick={() => onSelectMenuItemCallback(index)}>
      {packageItem(item)}
    </ListItem>
  );
};

const slideOutButtonBaseStyle = {
  width: "50px",
  height: "50px",
};

export default function SwipeableDrawer({
  children,
  data,
  items,
  drawerWidth,
  slideIcon,
  slideOutButtonPos,
  slideOutButtonColor,
  slideOutButtonStyle,
  style,
  ...otherProps
}) {
  const theme = useTheme();
  const buttonPos = slideOutButtonPos ? slideOutButtonPos : { x: "0px", y: "0px" };
  const buttonStyle = slideOutButtonStyle
    ? { ...slideOutButtonStyle, ...slideOutButtonBaseStyle }
    : slideOutButtonBaseStyle;
  const buttonColor = slideOutButtonColor ? slideOutButtonColor : theme.palette.error.main;

  // console.log("slide out button color", otherProps.slideOutButtonColor);
  console.log("other props", otherProps);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchor, setAnchor] = useState("left");
  const onSelectMenuItemCallback = otherProps.onSelectMenuItemCallback ? otherProps.onSelectMenuItemCallback : () => {};

  const width = drawerWidth ? drawerWidth : anchor === "top" || anchor === "bottom" ? "auto" : 600;

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ backgroundColor: "white", width: width, height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>{items.map((item, index) => itemToListItem(item, index, onSelectMenuItemCallback))}</List>
      <Divider />
    </Box>
  );

  return (
    <SideMenuComponent sx={style}>
      <Button sx={slideOutButtonBaseStyle} onClick={toggleDrawer(anchor, true)}>
        {getSlideIcon(slideIcon, buttonColor)}
      </Button>
      <MUISwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </MUISwipeableDrawer>
    </SideMenuComponent>
  );
}
