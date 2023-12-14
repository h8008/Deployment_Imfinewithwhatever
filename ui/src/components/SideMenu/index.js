import SwipeableDrawer from "../../ui_components/SwipeableDrawer";

const SideMenu = ({ children, user, items, onSelectMenuItemCallback, ...otherProps }) => {
  const drawerStyle = {
    position: "absolute",
    top: "50px",
    left: "5px",
    width: "50px",
    height: "100%",
  };

  return (
    <SwipeableDrawer
      data={user}
      items={items}
      // slideOutButtonStyle={slideOutButtonStyle}
      style={drawerStyle}
      {...otherProps}
      onSelectMenuItemCallback={onSelectMenuItemCallback}
    />
  );
};

export default SideMenu;
