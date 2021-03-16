import React from "react";
import { renderWithTheme } from "../../testHelpers";
import { TabMenu, TabMenuItem } from "../../components/TabMenu";

const handleClick = jest.fn();

it("renders correctly", () => {
  const { asFragment } = renderWithTheme(
    <TabMenu activeIndex={0} onItemClick={handleClick}>
      <TabMenuItem>Item 1</TabMenuItem>
      <TabMenuItem>Item 2</TabMenuItem>
    </TabMenu>
  );
  expect(asFragment()).toMatchSnapshot();
});
