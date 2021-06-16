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
  const primaryImageSize = Math.floor(width * 0.83); // Arbitrary ratio
  const secondaryImageSize = Math.floor(width / 2);

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
