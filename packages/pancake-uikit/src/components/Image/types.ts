import { ImgHTMLAttributes } from "react";
import { SpaceProps } from "styled-system";

export interface ContainerProps {
  width: number;
  height: number;
  responsive?: boolean;
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, SpaceProps {
  width: number;
  height: number;
  responsive?: boolean;
}

export interface TokenImageBaseProps extends Omit<ImageProps, "src"> {
  baseUrl?: string;
  imageFormat?: string;
}

export const variants = {
  DEFAULT: "default",
  INVERTED: "inverted",
} as const;

export type Variant = typeof variants[keyof typeof variants];

export interface TokenPairImageProps extends SpaceProps {
  primaryTokenAddress: string;
  secondaryTokenAddress: string;
  variant?: Variant;
  height: number;
  width: number;
  primaryImageProps?: TokenImageBaseProps;
  secondaryImageProps?: TokenImageBaseProps;
}

export interface TokenImageProps extends TokenImageBaseProps {
  tokenAddress: string;
}
