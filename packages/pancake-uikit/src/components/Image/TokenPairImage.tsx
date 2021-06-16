import React from "react";
import Box from "../Box/Box";
import { TokenPairImageProps, variants } from "./types";
import { StyledPrimaryImage, StyledSecondaryImage } from "./styles";

const TokenPairImage: React.FC<TokenPairImageProps> = ({
  secondaryTokenAddress,
  primaryTokenAddress,
  width,
  height,
  variant = variants.DEFAULT,
  primaryImageProps = {},
  secondaryImageProps = {},
  ...props
}) => {
  const primaryImageSize = Math.floor(width * (variant === variants.DEFAULT ? 0.92 : 0.85)); // Arbitrary ratio
  const secondaryImageSize = Math.floor(primaryImageSize / 2);

  return (
    <Box position="relative" display="inline-block" width={width} height={height} {...props}>
      <StyledPrimaryImage
        variant={variant}
        tokenAddress={primaryTokenAddress}
        width={primaryImageSize}
        height={primaryImageSize}
        {...primaryImageProps}
      />
      <StyledSecondaryImage
        variant={variant}
        tokenAddress={secondaryTokenAddress}
        width={secondaryImageSize}
        height={secondaryImageSize}
        {...secondaryImageProps}
      />
    </Box>
  );
};

export default TokenPairImage;
