import React from "react";
import { TranslationProvider } from "./Provider";
import useTranslations from "./useTranslations";

const projectId = Number(process.env.STORYBOOK_PROJECT_ID);
const apiKey = process.env.STORYBOOK_API_KEY;
const fileId = Number(process.env.STORYBOOK_FILE_ID);

export default {
  title: "Translation Provider",
  component: TranslationProvider,
  decorators: [
    (Story): JSX.Element => (
      <TranslationProvider projectId={projectId} apiKey={apiKey} fileId={fileId}>
        <Story />
      </TranslationProvider>
    ),
  ],
};

const memberCount = Math.random() * 4999 + 1;

export const Default: React.FC = () => {
  const { currentLanguage, isFetching, t, setLanguageByCode, translations, languages } = useTranslations();
  const handleChange = (evt) => {
    setLanguageByCode(evt.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>{`Is Fetching?: ${isFetching ? "Yes" : "No"}`}</div>
      <div style={{ marginBottom: "16px" }}>{t(292, "ENGLISH FALLBACK")}</div>
      <div style={{ marginBottom: "16px" }}>{t(834, `${memberCount} members`, { count: memberCount })}</div>
      <div style={{ marginBottom: "16px" }}>
        <select name="lang" onChange={handleChange} value={currentLanguage.code}>
          {Object.values(languages).map((language) => (
            <option key={language.code} value={language.code}>
              {language.language}
            </option>
          ))}
        </select>
      </div>
      <div>Languages in store</div>
      <pre>{JSON.stringify(Object.keys(translations), null, 2)}</pre>
    </div>
  );
};
