import React from "react";
import { Link } from "react-router-dom";
import StyledMenuItem from "./styles";
import { MenuItemProps } from "./types";

const MenuItem: React.FC<MenuItemProps> = ({ label, href, isActive = false, ...props }) => {
  return (
    <StyledMenuItem as={Link} to={href} isActive={isActive} {...props}>
      {label}
    </StyledMenuItem>
  );
};

export default MenuItem;
