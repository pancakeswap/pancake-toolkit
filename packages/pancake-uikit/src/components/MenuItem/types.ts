export type MenuItemTheme = {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
};

export type MenuItemHoverVariant = "default" | "border";

export interface MenuItemProps {
  isActive?: boolean;
  href: string;
  hoverVariant?: MenuItemHoverVariant;
}
