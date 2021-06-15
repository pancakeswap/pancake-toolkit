import React from "react";
import styled from "styled-components";
import BackgroundImage from "./BackgroundImage";
import { TokenImageProps } from "./types";

const StyledTokenImage = styled(BackgroundImage)`
  align-items: center;
  background-origin: border-box;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  display: inline-flex;
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  z-index: 5;
`;

const TokenImage: React.FC<TokenImageProps> = ({
  tokenAddress,
  baseUrl = "https://pancakeswap.finance/images/tokens",
  imageFormat = "png",
  ...props
}) => {
  return <StyledTokenImage src={`${baseUrl}/${tokenAddress}.${imageFormat}`} {...props} />;
};

export default TokenImage;
