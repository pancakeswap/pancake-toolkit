import { DefaultTheme } from "styled-components";
import { dark as darkAlert } from "../components/Alert/theme";
import { dark as darkCard } from "../components/Card/theme";
import { dark as darkPancakeToggle } from "../components/PancakeToggle/theme";
import { dark as darkRadio } from "../components/Radio/theme";
import { dark as darkToggle } from "../components/Toggle/theme";
import { dark as darkMenuItem } from "../components/MenuItem/theme";
import { dark as darkSubMenuItems } from "../components/SubMenuItems/theme";
import { dark as darkDropdownMenuItem } from "../components/DropdownMenu/theme";
import { dark as darkNav } from "../widgets/Menu/theme";
import { dark as darkModal } from "../widgets/Modal/theme";
import { dark as darkTooltip } from "../components/Tooltip/theme";
import { dark as darkBottomNavItem } from "../components/BottomNavItem/theme";
import { dark as darkBottomNav } from "../components/BottomNav/theme";
import base from "./base";
import { darkColors } from "./colors";

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  alert: darkAlert,
  colors: darkColors,
  card: darkCard,
  toggle: darkToggle,
  nav: darkNav,
  menuItem: darkMenuItem,
  subMenuItems: darkSubMenuItems,
  dropdownMenuItem: darkDropdownMenuItem,
  bottomNavItem: darkBottomNavItem,
  bottomNav: darkBottomNav,
  modal: darkModal,
  pancakeToggle: darkPancakeToggle,
  radio: darkRadio,
  tooltip: darkTooltip,
};

export default darkTheme;
