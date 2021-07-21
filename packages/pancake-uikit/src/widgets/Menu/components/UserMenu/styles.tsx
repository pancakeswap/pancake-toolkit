import React from "react";
import styled from "styled-components";
import { UserMenuItemProps } from "./types";

export const UserMenuDivider = styled.hr`
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-style: solid;
  border-width: 1px 0 0;
`;

export const BaseUserMenuItem: React.FC<UserMenuItemProps> = ({ children, endIcon, ...props }) => (
  <button type="button" {...props}>
    {children}
    {endIcon}
  </button>
);

export const UserMenuItem = styled(BaseUserMenuItem)`
  align-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme, disabled }) => theme.colors[disabled ? "textDisabled" : "textSubtle"]};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  outline: 0;
  padding: 8px 16px;
  width: 100%;

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
  }
`;
