import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/du/translation.json";
import translationFR from "./locales/fr/translation.json";
import backend from "i18next-http-backend";
// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  nl: {
    translation: translationDE,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(backend) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
