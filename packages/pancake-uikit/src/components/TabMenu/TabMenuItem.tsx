import React from "react";
import StyledTab from "./StyledTab";
import { TabMenuItemProps } from "./types";
import { Text } from "../Text";

const TabMenuItem: React.FC<TabMenuItemProps> = ({ isActive = false, onClick, children }) => (
  <StyledTab onClick={onClick} bgColor={isActive ? "textSubtle" : "input"} color={isActive ? "card" : "textSubtle"}>
    <Text fontWeight={600} color={isActive ? "card" : "textSubtle"}>
      {children}
    </Text>
  </StyledTab>
);
export default TabMenuItem;
