export type MenuItemTheme = {
  textColor: string;
  backgroundColor: string;
};

export interface MenuItemProps {
  isActive?: boolean;
  href: string;
}
