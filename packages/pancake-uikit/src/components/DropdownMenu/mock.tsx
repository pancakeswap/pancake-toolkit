import { noop } from "lodash";
import React from "react";
import { Flex } from "../Box";
import { LogoutIcon } from "../Svg";
import { DropdownMenuItems, DropdownMenuItemType } from "./types";

const ItemsMock: DropdownMenuItems[] = [
  {
    label: "Exchange",
    href: "/swap",
  },
  {
    label: "Liquidity",
    href: "/pool",
  },
  {
    label: "LP Migration",
    href: "https://v1exchange.pancakeswap.finance/#/migrate",
    type: DropdownMenuItemType.EXTERNAL_LINK,
  },
  {
    type: DropdownMenuItemType.DIVIDER,
  },
  {
    label: "Disconnect",
    onClick: noop,
    type: DropdownMenuItemType.BUTTON,
  },
  {
    label: (
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        Disconnect (as component)
        <LogoutIcon />
      </Flex>
    ),
    onClick: noop,
    type: DropdownMenuItemType.BUTTON,
  },
];

export default ItemsMock;
