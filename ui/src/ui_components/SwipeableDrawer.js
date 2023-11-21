import * as React from "react";
import { useState } from "react";

import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
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

export default function SwipeableTemporaryDrawer(props) {
  const { data, items, onSelectMenuItemCallback } = props;

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [anchor, setAnchor] = useState("left");
  const menuItems = [data.email, ...items];

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* <ListItem>
          <ListItemButton>
            <ListItemIcon>{MailIcon}</ListItemIcon>
            <ListItemText primary={menuItems[0]} />
          </ListItemButton>
        </ListItem> */}
        {items.map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => onSelectMenuItemCallback(index)}>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {["Messages"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {/* <React.Fragment key={anchor}> */}
      <SideMenuComponent>
        <Button onClick={toggleDrawer(anchor, true)}>{<SlideOutComponent />}</Button>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </SideMenuComponent>
      {/* </React.Fragment> */}
      {/* ))} */}
    </div>
  );
}
