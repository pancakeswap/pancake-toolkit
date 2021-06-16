import React, { forwardRef } from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { WrapperProps } from "./types";

const StyledWrapper = styled.div<{ $width: number; $height: number; responsive: boolean }>`
  height: ${({ responsive, $height }) => (responsive ? "100%" : `${$height}px`)};
  max-height: ${({ $height }) => $height}px;
  max-width: ${({ $width }) => $width}px;
  position: relative;
  width: ${({ responsive, $width }) => (responsive ? "100%" : `${$width}px`)};

  &:before {
    content: "";
    display: block;
    padding-top: ${({ $width, $height }) => ($height / $width) * 100}%;
    width: 100%;
  }

  ${space}
`;

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ responsive = true, ...props }, ref) => {
  return <StyledWrapper ref={ref} responsive={responsive} {...props} />;
});

export default Wrapper;
