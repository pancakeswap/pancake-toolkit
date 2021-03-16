import React, { useState } from "react";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import TabMenu from "./TabMenu";
import TabMenuItem from "./TabMenuItem";

export default {
  title: "Components/Tab Menu",
  component: TabMenu,
  argTypes: {},
} as Meta;

export const Default: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleClick = (newIndex) => setIndex(newIndex);

  return (
    <TabMenu activeIndex={index} onItemClick={handleClick}>
      <TabMenuItem>Button 1</TabMenuItem>
      <TabMenuItem>Button 2</TabMenuItem>
      <TabMenuItem>Button 3</TabMenuItem>
      <TabMenuItem>Button 4</TabMenuItem>
    </TabMenu>
  );
};
