import styled from "styled-components";
import { MenuItemProps } from "./types";

type StyledMenuItemProps = Pick<MenuItemProps, "isActive">;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  display: block;
  color: ${({ theme }) => theme.menuItem.textColor};
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  padding: 8px 16px;

  &:hover {
    background: #eff4f5;
    border-radius: 16px;
  }
`;

export default StyledMenuItem;
