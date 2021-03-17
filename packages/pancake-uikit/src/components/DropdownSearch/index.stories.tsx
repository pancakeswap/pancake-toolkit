import React from "react";
import Button from "../Button/Button";
import DropdownSearch from "./DropdownSearch";

export default {
  title: "Components/DropdownSearch",
  component: DropdownSearch,
  argTypes: {},
};

export const Default: React.FC = () => {
  return (
    <div>
      <DropdownSearch
        options={[
          {
            label: "Hot",
            value: "hot",
          },
          {
            label: "APR",
            value: "apr",
          },
          {
            label: "Multiplier",
            value: "multiplier",
          },
          {
            label: "Earned",
            value: "earned",
          },
          {
            label: "Liquidity",
            value: "liquidity",
          },
        ]}
        target={<Button>Hover</Button>}
      >
        {[...Array(30)].map(() => (
          <div>Content</div>
        ))}
      </DropdownSearch>
    </div>
  );
};
