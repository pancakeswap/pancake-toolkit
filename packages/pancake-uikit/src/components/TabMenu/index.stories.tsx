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
    <div>
      <TabMenu activeIndex={index} onItemClick={handleClick}>
        <TabMenuItem>Total</TabMenuItem>
        <TabMenuItem>Cakers</TabMenuItem>
        <TabMenuItem>Flippers</TabMenuItem>
        <TabMenuItem>Storm</TabMenuItem>
      </TabMenu>
    </div>
  );
};
