import React, { forwardRef } from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { WrapperProps } from "./types";

const StyledWrapper = styled.div<{ $width: number; $height: number; responsive: boolean }>`
  align-self: start;
  max-height: ${({ $height }) => $height}px;
  max-width: ${({ $width }) => $width}px;
  position: relative;
  width: 100%;

  &:after {
    content: "";
    display: block;
    padding-top: ${({ $width, $height }) => ($height / $width) * 100}%;
  }

  ${space}
`;

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ responsive = true, width, height, ...props }, ref) => {
  return <StyledWrapper ref={ref} responsive={responsive} $width={width} $height={height} {...props} />;
});

export default Wrapper;
