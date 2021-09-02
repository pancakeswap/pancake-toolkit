import { darkColors, lightColors } from "../../theme/colors";

export type BottomNavItemTheme = {
  backgroundColor: string;
};

export const light: BottomNavItemTheme = {
  backgroundColor: lightColors.tertiary,
};

export const dark: BottomNavItemTheme = {
  backgroundColor: darkColors.tertiary,
};
