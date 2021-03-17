import React, { cloneElement, Children, ReactElement } from "react";
import styled from "styled-components";
import Flex from "../Box/Flex";
import StyledTabMenu from "./StyledTabMenu";
import { TabMenuProps } from "./types";

const Wrapper = styled(Flex)`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  padding: 0 16px;
  justify-content: space-around;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`;

const ButtonMenu: React.FC<TabMenuProps> = ({ activeIndex = 0, onItemClick, children }) => {
  return (
    <Wrapper>
      <StyledTabMenu>
        {Children.map(children, (child: ReactElement, index) => {
          return cloneElement(child, {
            isActive: activeIndex === index,
            onClick: onItemClick ? () => onItemClick(index) : undefined,
          });
        })}
      </StyledTabMenu>
    </Wrapper>
  );
};

export default ButtonMenu;
