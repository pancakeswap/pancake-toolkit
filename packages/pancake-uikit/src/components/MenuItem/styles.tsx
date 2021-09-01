import styled from "styled-components";
import { MenuItemHoverVariant, MenuItemProps } from "./types";

type StyledMenuItemProps = Pick<MenuItemProps, "isActive" | "hoverVariant">;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  display: block;
  color: ${({ theme }) => theme.menuItem.textColor};
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  padding: 8px 16px;

  &:hover {
    ${({ hoverVariant, theme }) =>
      hoverVariant === "default"
        ? `
          background: ${theme.menuItem.backgroundColor};
          border-radius: 16px;
        `
        : `
          border-radius: 2px;
          border-bottom: 4px solid ${theme.menuItem.borderColor};
        `}
  }
`;

export default StyledMenuItem;
