import React from "react";
import StyledTab from "./StyledTab";
import { TabMenuItemProps } from "./types";
import { Text } from "../Text";

const TabMenuItem: React.FC<TabMenuItemProps> = ({ isActive = false, children, ...props }) => (
  <StyledTab {...props} isActive={isActive} bgColor={isActive ? "textSubtle" : "input"}>
    <Text fontWeight={600} color={isActive ? "card" : "textSubtle"}>
      {children}
    </Text>
  </StyledTab>
);
export default TabMenuItem;
