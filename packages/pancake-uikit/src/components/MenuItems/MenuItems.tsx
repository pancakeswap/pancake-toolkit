import React from "react";
import { Flex } from "../Box";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import { MenuItemsProps } from "./types";

const MenuItems: React.FC<MenuItemsProps> = ({ items = [], ...props }) => {
  return (
    <Flex {...props}>
      {items.map(({ label, items: menuItems, href, isActive }) => (
        <DropdownMenu key={label} items={menuItems} py="12px">
          <MenuItem href={href} isActive={isActive}>
            {label}
          </MenuItem>
        </DropdownMenu>
      ))}
    </Flex>
  );
};

export default MenuItems;
