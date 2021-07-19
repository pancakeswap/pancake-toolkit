import React from "react";
import styled from "styled-components";
import Flex from "../../../../components/Box/Flex";
import { ChevronDownIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";

const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 16px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 40px;
  padding-right: 8px;
  position: relative;
`;

const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({ account, text, avatarSrc, variant = variants.DEFAULT, ...props }) => {
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null;

  return (
    <StyledUserMenu {...props}>
      <MenuIcon avatarSrc={avatarSrc} variant={variant} />
      <LabelText title={text || account}>{text || accountEllipsis}</LabelText>
      <ChevronDownIcon color="text" width="24px" />
    </StyledUserMenu>
  );
};

export default UserMenu;
