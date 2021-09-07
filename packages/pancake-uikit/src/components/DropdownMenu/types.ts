import React from "react";
import { Colors } from "../../theme";
import { BoxProps } from "../Box";

export interface DropdownMenuProps extends BoxProps {
  items?: DropdownMenuItems[];
  isBottomNav?: boolean;
  openMenuTimeout?: number;
}

export interface StyledDropdownMenuItemProps extends React.ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  isActive?: boolean;
}

export enum DropdownMenuItemType {
  INTERNAL_LINK,
  EXTERNAL_LINK,
  BUTTON,
  DIVIDER,
}

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}

export interface DropdownMenuItems {
  label?: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: DropdownMenuItemType;
  status?: LinkStatus;
  disabled?: boolean;
  isActive?: boolean;
}
