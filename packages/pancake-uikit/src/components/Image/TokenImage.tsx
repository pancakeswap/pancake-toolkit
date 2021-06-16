import React from "react";
import styled from "styled-components";
import Image from "./Image";
import { TokenImageProps } from "./types";

const StyledTokenImage = styled(Image)`
  background-origin: border-box;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
`;

const TokenImage: React.FC<TokenImageProps> = ({
  tokenAddress,
  baseUrl = "/images/tokens",
  imageFormat = "png",
  ...props
}) => {
  return <StyledTokenImage src={`${baseUrl}/${tokenAddress}.${imageFormat}`} {...props} />;
};

export default TokenImage;
