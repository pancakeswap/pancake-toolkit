import React, { useState } from "react";
import * as IconModule from "../../widgets/Menu/icons";
import { SvgProps } from "../Svg/types";
import Toggle from "./Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
};

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

export const Default: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { MoonIcon, SunIcon } = Icons;

  const toggle = () => setIsChecked(!isChecked);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <Toggle checked={isChecked} onChange={toggle} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <Toggle checked={isChecked} onChange={toggle} scale="md" />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <Toggle
          checked={isChecked}
          defaultColor="textDisabled"
          checkedColor="textDisabled"
          onChange={toggle}
          scale="md"
          startIcon={(isActive = false) => <SunIcon color={isActive ? "warning" : "backgroundAlt"} />}
          endIcon={(isActive = false) => <MoonIcon color={isActive ? "secondary" : "backgroundAlt"} />}
        />
      </div>
      <div>
        <Toggle checked={isChecked} onChange={toggle} scale="sm" />
      </div>
    </>
  );
};
