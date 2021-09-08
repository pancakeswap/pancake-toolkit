import React from "react";
import { Flex } from "../Box";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import { MenuItemsProps } from "./types";

const MenuItems: React.FC<MenuItemsProps> = ({ items = [], activeItem, ...props }) => {
  return (
    <Flex {...props}>
      {items.map(({ label, items: menuItems, href }) => {
        const statusColor = menuItems.find((menuItem) => menuItem.status !== undefined)?.status?.color;
        return (
          <DropdownMenu key={label} items={menuItems} py="12px">
            <MenuItem href={href} isActive={activeItem === label} statusColor={statusColor}>
              {label}
            </MenuItem>
          </DropdownMenu>
        );
      })}
    </Flex>
  );
};

export default MenuItems;
