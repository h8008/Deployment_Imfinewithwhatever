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

const SideMenuComponent = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "absolute",
  top: "0",
  left: "0",
});

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

export default function SwipeableDrawer(props) {
  const theme = useTheme();
  const { data, items, drawerWidth, slideIcon } = props;
  const slideOutButtonPos = props.slideOutButtonPos ? props.slideOutButtonPos : { x: "0px", y: "0px" };
  const slideOutButtonColor = props.slideOutButtonColor ? props.slideOutButtonColor : theme.palette.error.main;

  console.log("slide out button color", props.slideOutButtonColor);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchor, setAnchor] = useState("left");
  const onSelectMenuItemCallback = props.onSelectMenuItemCallback ? props.onSelectMenuItemCallback : () => {};

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
    <SideMenuComponent>
      <Button
        sx={{ width: "50px", height: "50px", transform: `translateY(${slideOutButtonPos.y})}` }}
        onClick={toggleDrawer(anchor, true)}
      >
        {getSlideIcon(slideIcon, slideOutButtonColor)}
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
