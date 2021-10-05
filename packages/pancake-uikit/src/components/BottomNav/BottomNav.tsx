import React, { useState } from "react";
import BottomNavItem from "../BottomNavItem";
import StyledBottomNav, { StyledOverlay } from "./styles";
import { Box } from "../Box";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { BottomNavProps } from "./types";
import { NotificationDot } from "../NotificationDot";

const BottomNav: React.FC<BottomNavProps> = ({ items = [], activeItem = "", activeSubItem = "", ...props }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <>
      {showOverlay && <StyledOverlay />}
      <StyledBottomNav justifyContent="space-around" {...props}>
        {items.map(({ label, items: menuItems, href, icon, showOnMobile = true, showItemsOnMobile = true }) => {
          const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
          return (
            showOnMobile && (
              <DropdownMenu
                key={label}
                items={menuItems}
                isBottomNav
                activeItem={activeSubItem}
                showItemsOnMobile={showItemsOnMobile}
                setShowOverlay={setShowOverlay}
              >
                <Box>
                  <NotificationDot show={!!statusColor} color={statusColor}>
                    <BottomNavItem
                      href={href}
                      isActive={href === activeItem}
                      label={label}
                      iconName={icon}
                      showItemsOnMobile={showItemsOnMobile}
                    />
                  </NotificationDot>
                </Box>
              </DropdownMenu>
            )
          );
        })}
      </StyledBottomNav>
    </>
  );
};

export default BottomNav;
