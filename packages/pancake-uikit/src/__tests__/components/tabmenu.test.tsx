import React from "react";
import { renderWithTheme } from "../../testHelpers";
import { TabMenu, Tab } from "../../components/TabMenu";

const handleClick = jest.fn();

it("renders correctly", () => {
  const { asFragment } = renderWithTheme(
    <TabMenu activeIndex={0} onItemClick={handleClick}>
      <Tab>Item 1</Tab>
      <Tab>Item 2</Tab>
    </TabMenu>
  );
  expect(asFragment()).toMatchSnapshot();
});
