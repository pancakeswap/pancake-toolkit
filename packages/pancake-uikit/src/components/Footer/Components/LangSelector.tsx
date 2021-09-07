import React from "react";
import Text from "../../Text/Text";
import Dropdown from "../../Dropdown/Dropdown";
import Button from "../../Button/Button";
import LanguageIcon from "../../Svg/Icons/Language";
import MenuButton from "./MenuButton";
import { darkColors, Language } from "../../..";

interface Props {
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
}

const LangSelector: React.FC<Props> = ({ currentLang, langs, setLang }) => (
  <Dropdown
    position="top-right"
    target={
      <Button variant="text" startIcon={<LanguageIcon color={darkColors.textSubtle} width="24px" />}>
        <Text color={darkColors.textSubtle}>{currentLang?.toUpperCase()}</Text>
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton
        key={lang.locale}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: "32px", height: "auto" }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
);

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang);
