import { SpaceProps } from "styled-system";

export interface ContainerProps {
  width: number;
  height: number;
  responsive?: boolean;
}

export interface ImageProps extends ContainerProps, SpaceProps {
  src: string;
  alt?: string;
}

export interface TokenImageBaseProps extends Omit<ImageProps, "src"> {
  baseUrl?: string;
  imageFormat?: string;
}

export interface TokenPairImageProps extends TokenImageBaseProps {
  primaryTokenAddress: string;
  secondaryTokenAddress: string;
}

export interface TokenImageProps extends TokenImageBaseProps {
  tokenAddress: string;
}
