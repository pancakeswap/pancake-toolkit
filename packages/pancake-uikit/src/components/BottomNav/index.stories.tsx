import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Flex } from "../Box";
import BottomNav from "./BottomNav";
import MenuItemsMock from "./mock";
import { BottomNavProps } from "./types";

export default {
  title: "Components/Menu/BottomNav",
  component: BottomNav,
};

const Template: React.FC<BottomNavProps> = (args) => {
  return (
    <BrowserRouter>
      <Flex alignItems="flex-end" height="100vh">
        <BottomNav {...args} />
      </Flex>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: MenuItemsMock,
};
