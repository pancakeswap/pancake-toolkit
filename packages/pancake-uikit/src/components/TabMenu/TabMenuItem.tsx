import React from "react";
import StyledTab from "./StyledTab";
import { TabMenuItemProps } from "./types";

const TabMenuItem: React.FC<TabMenuItemProps> = ({ isActive = false, children }) => (
  <StyledTab isActive={isActive}>{children}</StyledTab>
);
export default TabMenuItem;
