export interface DropdownSearchProps {
  options: DropdownSearchOptionProps[]
  onChange?: (option: DropdownSearchOptionProps) => void
}

export interface DropdownSearchOptionProps {
  label: string
  value: any
}
