import { darkColors, lightColors } from "../../theme/colors";
import { MenuItemTheme } from "./types";

export const light: MenuItemTheme = {
  textColor: lightColors.textSubtle,
  backgroundColor: lightColors.tertiary,
  borderColor: lightColors.primary,
};

export const dark: MenuItemTheme = {
  textColor: darkColors.textSubtle,
  backgroundColor: darkColors.tertiary,
  borderColor: darkColors.primary,
};
