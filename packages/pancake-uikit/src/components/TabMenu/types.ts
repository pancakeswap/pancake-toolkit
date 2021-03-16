export interface TabMenuItemProps {
  isActive?: boolean;
}

export interface TabMenuProps {
  activeIndex?: number;
  onItemClick?: (index: number) => void;
  children: React.ReactElement[];
}
