import { useContext } from "react";
import { TranslationContext } from "./Provider";

const useTranslations = () => {
  const translationContext = useContext(TranslationContext);

  if (translationContext === undefined) {
    throw new Error("useTranslations must be used within a TranslateProvider");
  }

  return translationContext;
};

export default useTranslations;
