import React from "react";
import { Box } from "../Box";
import MenuItem from "../MenuItem/MenuItem";
import StyledSubMenuItems from "./styles";
import { SubMenuItemsProps } from "./types";

const MenuItems: React.FC<SubMenuItemsProps> = ({ items = [], ...props }) => {
  return (
    <StyledSubMenuItems justifyContent={["start", "start", "center"]} {...props} pl={["12px", "12px", "0px"]}>
      {items.map(({ label, href, isActive }) => (
        <Box key={label} mr="20px">
          <MenuItem href={href} isActive={isActive} variant="subMenu">
            {label}
          </MenuItem>
        </Box>
      ))}
    </StyledSubMenuItems>
  );
};

export default MenuItems;
