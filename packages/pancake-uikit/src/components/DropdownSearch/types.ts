import { ReactText } from "react";

export interface DropdownSearchProps {
  options: DropdownSearchOptionProps[];
  onChange?: (option: DropdownSearchOptionProps) => void;
}

export interface DropdownSearchOptionProps {
  label: string;
  value: ReactText;
}
