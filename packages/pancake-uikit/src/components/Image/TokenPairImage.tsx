import React from "react";
import styled from "styled-components";
import Flex from "../Box/Flex";
import TokenImage from "./TokenImage";
import { TokenPairImageProps } from "./types";

const StyledSecondaryImage = styled(TokenImage)`
  bottom: -4px;
  position: absolute;
  right: -4px;
  z-index: 6;
`;

const TokenPairImage: React.FC<TokenPairImageProps> = ({
  primaryTokenAddress,
  secondaryTokenAddress,
  width,
  height,
  ...props
}) => {
  const secondaryImageSize = Math.floor(width / 2);

  return (
    <Flex alignItems="center" position="relative" display="inline-flex" width={width} height={height}>
      <TokenImage tokenAddress={primaryTokenAddress} width={width} height={height} {...props} />
      <StyledSecondaryImage
        tokenAddress={secondaryTokenAddress}
        width={secondaryImageSize}
        height={secondaryImageSize}
      />
    </Flex>
  );
};

export default TokenPairImage;
