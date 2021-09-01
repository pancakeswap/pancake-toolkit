import { AlertTheme } from "../components/Alert/types";
import { CardTheme } from "../components/Card/types";
import { MenuItemTheme } from "../components/MenuItem/types";
import { SubMenuItemsTheme } from "../components/SubMenuItems/types";
import { DropdownMenuItemTheme } from "../components/DropdownMenu/theme";
import { PancakeToggleTheme } from "../components/PancakeToggle/types";
import { RadioTheme } from "../components/Radio/types";
import { ToggleTheme } from "../components/Toggle/types";
import { TooltipTheme } from "../components/Tooltip/types";
import { NavThemeType } from "../widgets/Menu/theme";
import { ModalTheme } from "../widgets/Modal/types";
import { Colors, Breakpoints, MediaQueries, Spacing, Shadows, Radii, ZIndices } from "./types";

export interface PancakeTheme {
  siteWidth: number;
  isDark: boolean;
  alert: AlertTheme;
  colors: Colors;
  card: CardTheme;
  nav: NavThemeType;
  menuItem: MenuItemTheme;
  subMenuItems: SubMenuItemsTheme;
  dropdownMenuItem: DropdownMenuItemTheme;
  modal: ModalTheme;
  pancakeToggle: PancakeToggleTheme;
  radio: RadioTheme;
  toggle: ToggleTheme;
  tooltip: TooltipTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: Spacing;
  shadows: Shadows;
  radii: Radii;
  zIndices: ZIndices;
}

export { default as dark } from "./dark";
export { default as light } from "./light";

export { lightColors } from "./colors";
export { darkColors } from "./colors";
export * from "./types";
