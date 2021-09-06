import React from "react";
import { Link } from "react-router-dom";
import StyledMenuItem from "./styles";
import { MenuItemProps } from "./types";

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  isActive = false,
  variant = "default",
  statusColor,
  ...props
}) => {
  return (
    <StyledMenuItem as={Link} to={href} $isActive={isActive} $variant={variant} $statusColor={statusColor} {...props}>
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem;
