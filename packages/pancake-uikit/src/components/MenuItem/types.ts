export type MenuItemTheme = {
  textColor: string;
};

export interface MenuItemProps {
  isActive?: boolean;
  label: string;
  href: string;
}
