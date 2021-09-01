export type MenuItemTheme = {
  textColor: string;
  activeTextColor: string;
  backgroundColor: string;
  borderColor: string;
};

export type MenuItemVariant = "default" | "subMenu";

export interface MenuItemProps {
  isActive?: boolean;
  href: string;
  variant?: MenuItemVariant;
}
