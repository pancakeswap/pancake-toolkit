import { StringTranslationsModel } from "@crowdin/crowdin-api-client";
import { ReactText } from "react";
import { languages } from "./languages";

export type ContextData = {
  [key: string]: ReactText;
};

export type LanguageCode = keyof typeof languages;

export interface Language {
  code: LanguageCode;
  language: string;
}

export type CrowdinTranslation = StringTranslationsModel.PlainLanguageTranslation;

export interface CrowdinTranslations {
  [key: string]: CrowdinTranslation;
}

export type Action =
  | { type: "SET_LANG"; language: Language }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCEEDED"; translations: CrowdinTranslations; code: LanguageCode };

export interface ProviderState {
  isFetching: boolean;
  currentLanguage: Language;
  translations: {
    [key in LanguageCode]?: {
      [key: string]: CrowdinTranslation;
    };
  };
}

export interface ContextApi extends ProviderState {
  languages: {
    [key in LanguageCode]: Language;
  };
  setLanguage: (language: Language) => void;
  setLanguageByCode: (code: LanguageCode) => void;
  fetchLanguageTranslations: (code: LanguageCode) => void;
  t: (stringId: number, fallback: string, data?: ContextData) => string;
}

export interface ProviderProps {
  initialLanguage?: Language;
  projectId: number;
  fileId: number;
  apiKey: string;
}
