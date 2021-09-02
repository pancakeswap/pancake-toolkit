import { darkColors, lightColors } from "../../theme/colors";

export type BottomNavTheme = {
  backgroundColor: string;
};

export const light: BottomNavTheme = {
  backgroundColor: lightColors.backgroundAlt,
};

export const dark: BottomNavTheme = {
  backgroundColor: darkColors.backgroundAlt,
};
