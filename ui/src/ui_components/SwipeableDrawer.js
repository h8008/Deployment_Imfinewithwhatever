import * as React from "react";
import { useState } from "react";

import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MUISwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InputTwoToneIcon from "@mui/icons-material/InputTwoTone";

const SlideOutComponent = styled(InputTwoToneIcon)(({ theme }) => ({}));

const SideMenuComponent = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
});

const ListItemComponent = styled(ListItem)((children, ...otherProps) => ({
  ...otherProps,
}));

const itemToListItem = (item, index, onSelectMenuItemCallback) => {
  // const Item = typeof item === React.Component ? React.cloneElement(item) : ListItemComponent;
  return (
    // <Item key={index} disablePadding>
    //   <ListItemButton>
    //     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //   </ListItemButton>
    // </Item>
    <ListItem key={index} disablePadding>
      {item}
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
