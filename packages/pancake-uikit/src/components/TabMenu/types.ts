export interface TabMenuItemProps {
  isActive?: boolean;
  onClick?: () => void;
}

export interface TabMenuProps {
  activeIndex?: number;
  onItemClick?: (index: number) => void;
  children: React.ReactElement[];
}
