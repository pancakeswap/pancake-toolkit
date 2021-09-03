import { BoxProps } from "../Box";

export type SubMenuItemsType = {
  label: string;
  href: string;
  isActive?: boolean;
};

export type SubMenuItemsTheme = {
  backgroundColor: string;
};

export interface SubMenuItemsProps extends BoxProps {
  items: SubMenuItemsType[];
}
