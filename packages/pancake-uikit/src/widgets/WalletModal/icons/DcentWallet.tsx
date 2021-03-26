import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
      <circle cx="48" cy="48" r="48" fill="#FFFFFF" />
      <g>
        <g>
          <polygon fill="#B3B5B6" points="48.68,30.76 52.82,28.36 52.82,22.67 48.68,20.28 48.68,20.28 		" />
          <path
            fill="#77C6C4"
            d="M33.49,55.55V39.53l13.81-7.98V20.28l-22.87,13.2c-0.44,0.25-0.71,0.71-0.71,1.22v26.41c0,0.03,0,0.05,0,0.08
            L33.49,55.55z"
          />
          <path
            fill="#6D6F71"
            d="M61.82,56.69l-13.82,7.98l-13.74-7.93l-9.75,5.63l22.8,13.17c0.22,0.12,0.46,0.19,0.69,0.19
            s0.49-0.07,0.69-0.19l22.87-13.2c0,0,0,0,0.02,0L61.82,56.69z"
          />
          <g>
            <path
              fill="#B3B5B6"
              d="M71.57,33.48l-9.06-5.24v5.7l-9.73,5.63l9.73,5.63v10.26l9.77,5.64V34.7
              C72.26,34.21,71.99,33.74,71.57,33.48z"
            />
          </g>
          <polygon fill="#6D6F71" points="43.16,45.11 43.16,56.28 52.64,50.81 52.64,39.63 		" />
        </g>
      </g>
    </Svg>
  );
};

export default Icon;
