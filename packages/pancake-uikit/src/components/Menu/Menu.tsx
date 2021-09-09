import React from "react";
import { BoxProps } from "../Box";
import BaseMenu from "./BaseMenu";
import { MenuContainer } from "./styles";
import { BaseMenuProps } from "./types";

const Menu: React.FC<BaseMenuProps & BoxProps> = ({ children, component, isOpen = false, ...props }) => {
  return (
    <BaseMenu options={{ placement: "bottom" }} component={component} isOpen={isOpen}>
      <MenuContainer {...props}>{children}</MenuContainer>
    </BaseMenu>
  );
};

export default Menu;
