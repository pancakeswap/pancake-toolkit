import { darkColors, lightColors } from "../../theme/colors";
import { MenuItemTheme } from "./types";

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
