import { darkColors, lightColors } from "../../theme/colors";

export type DropdownMenuItemTheme = {
  textColor: string;
  activeTextColor: string;
  disabledTextColor: string;
};

export const light: DropdownMenuItemTheme = {
  textColor: lightColors.textSubtle,
  activeTextColor: lightColors.secondary,
  disabledTextColor: lightColors.textDisabled,
};

export const dark: DropdownMenuItemTheme = {
  textColor: darkColors.textSubtle,
  activeTextColor: darkColors.secondary,
  disabledTextColor: darkColors.textDisabled,
};
