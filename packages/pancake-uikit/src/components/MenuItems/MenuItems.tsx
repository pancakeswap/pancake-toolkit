import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import StyledMenuItems from "./styles";
import { MenuItemsProps } from "./types";

const MenuItems: React.FC<MenuItemsProps> = ({ items = [], ...props }) => {
  return (
    <StyledMenuItems {...props}>
      {items.map(({ label, items: menuItems, href, isActive }) => (
        <DropdownMenu key={label} items={menuItems} py="12px">
          <MenuItem href={href} isActive={isActive}>
            {label}
          </MenuItem>
        </DropdownMenu>
      ))}
    </StyledMenuItems>
  );
};

export default MenuItems;
