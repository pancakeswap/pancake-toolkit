import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import StyledMenuItems from "./styles";
import { MenuItemsProps } from "./types";

const MenuItems: React.FC<MenuItemsProps> = ({ items = [], ...props }) => {
  return (
    <StyledMenuItems {...props}>
      {items.map((menuItem) => (
        <DropdownMenu key={menuItem.label} items={menuItem.items} py="12px">
          <MenuItem label={menuItem.label} href={menuItem.href} />
        </DropdownMenu>
      ))}
    </StyledMenuItems>
  );
};

export default MenuItems;
