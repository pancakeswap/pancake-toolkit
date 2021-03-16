import React from "react";
import StyledTab from "./StyledTab";
import { TabProps } from "./types";
import { Text } from "../Text";

const Tab: React.FC<TabProps> = ({ isActive = false, onClick, children }) => (
  <StyledTab onClick={onClick} bgColor={isActive ? "textSubtle" : "input"} color={isActive ? "card" : "textSubtle"}>
    <Text fontWeight={600} color={isActive ? "card" : "textSubtle"} m={"0 8px"}>
      {children}
    </Text>
  </StyledTab>
);
export default Tab;
