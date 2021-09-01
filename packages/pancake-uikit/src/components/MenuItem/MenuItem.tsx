import React from "react";
import { Link } from "react-router-dom";
import StyledMenuItem from "./styles";
import { MenuItemHoverVariant, MenuItemProps } from "./types";

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  isActive = false,
  hoverVariant = "default",
  ...props
}) => {
  return (
    <StyledMenuItem as={Link} to={href} isActive={isActive} hoverVariant={hoverVariant} {...props}>
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem;
