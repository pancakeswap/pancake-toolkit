import styled from "styled-components";
import { Button } from "../../../../components/Button";

export const UserMenuDivider = styled.hr`
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-style: solid;
  border-width: 1px 0 0;
`;

export const UserMenuItem = styled(Button).attrs({ variant: "text", width: "100%" })`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-weight: normal;
  height: auto;
  justify-content: start;
  padding: 16px;

  &:disabled,
  &.pancake-button--disabled {
    background-color: transparent;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 1;
    transform: none;
    box-shadow: none;
  }
`;

export const UserMenuItemLink = styled.a<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) => theme.colors[disabled ? "textDisabled" : "textSubtle"]};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: block;
  padding: 16px;
`;
