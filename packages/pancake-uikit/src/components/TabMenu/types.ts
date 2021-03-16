export interface StyledTabProps {
  color: "card" | "textSubtle";
  bgColor: "textSubtle" | "input";
}
export interface TabMenuProps {
  activeIndex?: number;
  onItemClick?: (index: number) => void;
  children: React.ReactElement[];
}
export interface TabMenuItemProps {
  isActive?: boolean;
  onClick?: () => void;
}
