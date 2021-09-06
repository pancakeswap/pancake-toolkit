import { CommonNavProps } from "../../widgets/Menu/types";

export interface Language {
  code: string;
  language: string;
  locale: string;
}

export type FooterLinkType = {
  label: string;
  items: { label: string; href?: string; isHighlighted?: boolean }[];
};

export type FooterProps = { items: FooterLinkType[]; buyCakeLabel: string } & CommonNavProps;
