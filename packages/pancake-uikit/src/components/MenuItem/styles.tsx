import styled from "styled-components";
import { MenuItemProps } from "./types";

type StyledMenuItemProps = Pick<MenuItemProps, "isActive" | "variant" | "statusColor">;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary : theme.colors.textSubtle)};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary : theme.colors.textSubtle)};
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};

  ${({ statusColor, theme }) =>
    statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

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

    border-bottom: 4px solid ${theme.colors.primary};
  `};

  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
    ${({ variant }) => variant === "default" && "border-radius: 16px;"};
  }
`;

export default StyledMenuItem;
