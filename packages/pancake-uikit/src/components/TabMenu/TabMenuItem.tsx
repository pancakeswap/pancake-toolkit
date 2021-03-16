import React from "react";
import { ActiveTab, InactiveTab } from "./StyledTabs";
import { TabMenuItemProps } from "./types";

const TabMenuItem: React.FC<TabMenuItemProps> = ({ isActive = false, children }) => {
  if (!isActive) {
    return <InactiveTab>{children}</InactiveTab>;
  }

  return <ActiveTab>{children}</ActiveTab>;
};

export default TabMenuItem;
