import SwipeableDrawer from "../../ui_components/SwipeableDrawer";

const SideMenu = ({ children, user, items, onSelectMenuItemCallback, ...otherProps }) => {
  return (
    <SwipeableDrawer data={user} items={items} {...otherProps} onSelectMenuItemCallback={onSelectMenuItemCallback} />
  );
};

export default SideMenu;
