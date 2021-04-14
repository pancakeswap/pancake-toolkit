import React from "react";
import StyledTab from "./StyledTab";
import { TabProps } from "./types";
import { Text } from "../Text";

const Tab: React.FC<TabProps> = ({ isActive = false, onClick, children }) => {
  return (
    <StyledTab
      onClick={onClick}
      bgColor={isActive ? "textSubtle" : "input"}
      color={isActive ? "backgroundAlt" : "textSubtle"}
    >
      <Text fontWeight={600} color={isActive ? "backgroundAlt" : "textSubtle"}>
        {children}
      </Text>
    </StyledTab>
  );
};
export default Tab;
