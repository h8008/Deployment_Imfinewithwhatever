import SwipeableDrawer from "../../ui_components/SwipeableDrawer";

const SideMenu = (props) => {
  const { user, items, onSelectMenuItemCallback } = props;
  return <SwipeableDrawer data={user} items={items} onSelectMenuItemCallback={onSelectMenuItemCallback} />;
};

export default SideMenu;
