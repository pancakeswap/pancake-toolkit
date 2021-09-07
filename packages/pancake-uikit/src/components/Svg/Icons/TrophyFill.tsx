import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 18 18" {...props}>
      <path d="M16 2.404h-2a2 2 0 00-2-2H6a2 2 0 00-2 2H2c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 008 13.304v2.1H5a1 1 0 100 2h8a1 1 0 100-2h-3v-2.1a5.01 5.01 0 003.61-2.96c2.47-.31 4.39-2.39 4.39-4.94v-1c0-1.1-.9-2-2-2zm-14 3v-1h2v3.82c-1.16-.42-2-1.52-2-2.82zm7 6c-1.65 0-3-1.35-3-3v-6h6v6c0 1.65-1.35 3-3 3zm7-6c0 1.3-.84 2.4-2 2.82v-3.82h2v1z" />
    </Svg>
  );
};

export default Icon;
