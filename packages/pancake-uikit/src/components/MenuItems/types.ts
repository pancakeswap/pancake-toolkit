import { BoxProps } from "../Box";
import { DropdownMenuItems } from "../DropdownMenu/types";

export type MenuItemsType = {
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
  items: DropdownMenuItems[];
};

export interface MenuItemsProps extends BoxProps {
  items: MenuItemsType[];
}
