import { darkColors, lightColors } from "../../theme/colors";

export type MenuItemTheme = {
  textColor: string;
  activeTextColor: string;
  backgroundColor: string;
  borderColor: string;
};

export const light: MenuItemTheme = {
  textColor: lightColors.textSubtle,
  activeTextColor: lightColors.secondary,
  backgroundColor: lightColors.tertiary,
  borderColor: lightColors.primary,
};

export const dark: MenuItemTheme = {
  textColor: darkColors.textSubtle,
  activeTextColor: darkColors.secondary,
  backgroundColor: darkColors.tertiary,
  borderColor: darkColors.primary,
};
