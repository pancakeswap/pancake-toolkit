import styled from "styled-components";
import { MenuItemProps } from "./types";

type StyledMenuItemProps = Pick<MenuItemProps, "isActive" | "variant">;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.menuItem.textColor};
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};

  ${({ variant }) =>
    variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    border-bottom: 4px solid transparent;
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}

  ${({ isActive, variant, theme }) =>
    isActive &&
    variant === "subMenu" &&
    `
    border-radius: 2px;
    border-bottom: 4px solid ${theme.menuItem.borderColor};
  `};

  &:hover {
    background: ${({ theme }) => theme.menuItem.backgroundColor};
    ${({ variant }) => variant === "default" && "border-radius: 16px;"}
`;

export default StyledMenuItem;
