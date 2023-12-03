import * as React from "react";
import { useState } from "react";

import { ListItemText, styled } from "@mui/material";
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
import InputTwoToneIcon from "@mui/icons-material/InputTwoTone";

const SlideOutComponent = styled(InputTwoToneIcon)(({ theme }) => ({}));

const SideMenuComponent = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
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
  const { data, items, drawerWidth } = props;
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
    <div>
      <SideMenuComponent>
        <Button onClick={toggleDrawer(anchor, true)}>{<SlideOutComponent />}</Button>
        <MUISwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </MUISwipeableDrawer>
      </SideMenuComponent>
    </div>
  );
}
