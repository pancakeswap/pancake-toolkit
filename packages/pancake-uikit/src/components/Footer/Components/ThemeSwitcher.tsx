import React from "react";
import * as IconModule from "../../../widgets/Menu/icons";
import { SvgProps } from "../../Svg";
import { Toggle } from "../../Toggle";

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };
const { MoonIcon, SunIcon } = Icons;

interface Props {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const ThemeSwitcher: React.FC<Props> = ({ isDark, toggleTheme }) => (
  <Toggle
    checked={isDark}
    defaultColor="textDisabled"
    checkedColor="textDisabled"
    onChange={() => toggleTheme(!isDark)}
    scale="md"
    startIcon={(isActive = false) => <SunIcon color={isActive ? "warning" : "backgroundAlt"} />}
    endIcon={(isActive = false) => <MoonIcon color={isActive ? "secondary" : "backgroundAlt"} />}
  />
);

export default React.memo(ThemeSwitcher, (prev, next) => prev.isDark === next.isDark);
