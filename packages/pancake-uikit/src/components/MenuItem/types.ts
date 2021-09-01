export type MenuItemTheme = {
  textColor: string;
  backgroundColor: string;
};

export interface MenuItemProps {
  isActive?: boolean;
  label: string;
  href: string;
}
