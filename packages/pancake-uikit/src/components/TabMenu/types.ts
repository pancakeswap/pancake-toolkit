export interface TabMenuItemProps {
  isActive?: boolean;
  color: "card" | "textSubtle";
  bgColor: "textSubtle" | "input";
}

export interface TabMenuProps {
  activeIndex?: number;
  onItemClick?: (index: number) => void;
  children: React.ReactElement[];
}
