import React from "react";
import BottomNavItem from "../BottomNavItem";
import StyledBottomNav from "./styles";
import { Box } from "../Box";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { BottomNavProps } from "./types";
import MAX_TIME_PRESSED from "./constants";

const BottomNav: React.FC<BottomNavProps> = ({ items = [], activeItem = "", ...props }) => {
  return (
    <StyledBottomNav justifyContent={["start", "start", "center"]} {...props}>
      {items.map(({ label, items: menuItems, href, icon }) => {
        return (
          <DropdownMenu key={label} items={menuItems} isBottomNav openMenuTimeout={MAX_TIME_PRESSED}>
            <Box mr="20px">
              <BottomNavItem href={href} isActive={href === activeItem} label={label} iconName={icon} />
            </Box>
          </DropdownMenu>
        );
      })}
    </StyledBottomNav>
  );
};

export default BottomNav;
