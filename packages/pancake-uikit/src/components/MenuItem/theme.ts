import { darkColors, lightColors } from "../../theme/colors";
import { MenuItemTheme } from "./types";

export const light: MenuItemTheme = {
  textColor: lightColors.textSubtle,
  backgroundColor: lightColors.tertiary,
};

export const dark: MenuItemTheme = {
  textColor: darkColors.textSubtle,
  backgroundColor: darkColors.tertiary,
};
