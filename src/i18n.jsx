import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locals/eng.json";
import translationAR from "./locals/ar.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ar: { translation: translationAR },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;
