import React, { cloneElement, Children, ReactElement } from "react";
import StyledTabMenu from "./StyledTabMenu";
import { TabMenuProps } from "./types";

const ButtonMenu: React.FC<TabMenuProps> = ({ activeIndex = 0, onItemClick, children }) => {
  return (
    <StyledTabMenu p="0 16px">
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
        });
      })}
    </StyledTabMenu>
  );
};

export default ButtonMenu;
