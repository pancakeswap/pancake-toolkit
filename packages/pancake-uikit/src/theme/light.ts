import { DefaultTheme } from "styled-components";
import { light as lightAlert } from "../components/Alert/theme";
import { light as lightCard } from "../components/Card/theme";
import { light as lightPancakeToggle } from "../components/PancakeToggle/theme";
import { light as lightRadio } from "../components/Radio/theme";
import { light as lightToggle } from "../components/Toggle/theme";
import { light as lightTooltip } from "../components/Tooltip/theme";
import { light as lightNav } from "../widgets/Menu/theme";
import { light as lightModal } from "../widgets/Modal/theme";
import base from "./base";
import { lightColors } from "./colors";

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  alert: lightAlert,
  colors: lightColors,
  card: lightCard,
  toggle: lightToggle,
  nav: lightNav,
  modal: lightModal,
  pancakeToggle: lightPancakeToggle,
  radio: lightRadio,
  tooltip: lightTooltip,
};

export default lightTheme;
