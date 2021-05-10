import { ColorProps } from "styled-system";

export interface TabMenuProps {
  activeIndex?: number;
  onItemClick?: (index: number) => void;
  children: React.ReactElement[];
}
export interface TabProps extends ColorProps {
  isActive?: boolean;
  onClick?: () => void;
  scale?: "md" | "lg";
}
