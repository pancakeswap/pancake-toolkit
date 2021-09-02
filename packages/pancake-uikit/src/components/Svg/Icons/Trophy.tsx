import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 19 19" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.908.042A1.5 1.5 0 005.8 1.85c.078.327.455 1.213.876 2.15H2.958c-1.1 0-2 .9-2 2v1c0 .319.03.63.088.932.401 2.11 2.141 3.737 4.302 4.008a5.01 5.01 0 003.61 2.96V17h-3a1 1 0 100 2h8.007a1 1 0 00-.006-2h-3v-2.1a5.013 5.013 0 003.61-2.96c.308-.039.608-.105.897-.197 2.022-.64 3.493-2.512 3.493-4.743V6c0-1.1-.9-2-2-2H13.24c.42-.937.798-1.823.876-2.15a1.5 1.5 0 10-2.917-.7L10.516 4H9.401l-.684-2.85A1.5 1.5 0 006.908.042zM16.958 7c0 1.3-.84 2.4-2 2.82V6h2v1zm-12 2.82c-1.16-.42-2-1.52-2-2.82V6h2v3.82z"
      />
    </Svg>
  );
};

export default Icon;
