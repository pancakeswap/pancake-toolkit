import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Flex } from "../Box";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./types";

export default {
  title: "Components/Menu/MenuItem",
  component: MenuItem,
};

const Template: React.FC<MenuItemProps> = ({ label, ...args }) => {
  return (
    <BrowserRouter>
      <Flex>
        <MenuItem {...args}>{label}</MenuItem>
      </Flex>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  isActive: false,
  label: "Trade",
};
