import { Colors } from "./types";

export const baseColors = {
  failure: "#ED4B9E",
  primary: "#DE5795",
  primaryBright: "#53DEE9",
  primaryDark: "#0098A1",
  secondary: "#FFF",
  success: "#31D0AA",
  warning: "#FFB237",
};

export const additionalColors = {
  binance: "#F0B90B",
  overlay: "#452a7a",
  gold: "#FFC700",
  silver: "#B2B2B2",
  bronze: "#E7974D",
};

export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  color1: "#FFF",
  color2: "#008FBC",
  color3: "#E78D1F",
  color4: "#DE5795",
  color5: "#EAE200",
  color6: "#161F28",
  color7: "#00B1E2",
  color8: "#FFF", // heading
  background: "#FAF9F9",
  backgroundDisabled: "#E9EAEB",
  backgroundAlt: "#FFFFFF",
  cardBorder: "#E7E3EB",
  contrast: "#191326",
  dropdown: "#F6F6F6",
  dropdownDeep: "#EEEEEE",
  invertedContrast: "#FFFFFF",
  input: "#eeeaf4",
  inputSecondary: "#d7caec",
  tertiary: "#EFF4F5",
  text: "#161F28",
  textDisabled: "#BDC2C4",
  textSubtle: "#262F48",
  disabled: "#E9EAEB",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #EAE200 0%, #FE97d5 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #e81 0%, #0be 100%)",
    cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
    violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
    violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  secondary: "#9A6AFF",
  color1: "#FFF",
  // blue
  color2: "#008FBC",
  // orange
  color3: "#E78D1F",
  // pink
  color4: "#0058A3",
  // yellow
  color5: "#EAE200",
  color6: "#FFFFFF",
  // lighter blue
  color7: "#00B1E2",
  color8: "#E81",
  background: "#212429",
  backgroundDisabled: "#3c3742",
  backgroundAlt: "#333",
  cardBorder: "#383241",
  contrast: "#FFFFFF",
  dropdown: "#1E1D20",
  dropdownDeep: "#100C18",
  invertedContrast: "#191326",
  input: "#222",
  inputSecondary: "#262130",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  text: "#F4EEFF",
  textDisabled: "#666171",
  textSubtle: "#B8ADD2",
  disabled: "#524B63",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #220 0%, #3a0e22 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
    cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
    violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};
