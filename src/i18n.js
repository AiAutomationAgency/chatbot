import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from './locale/en.json'
import nlJSON from './locale/nl.json'


i18n.use(initReactI18next).init({
  resources: {
    en: enJSON
        ,
    nl: { ...nlJSON },
  },
  lng: "en",
});
