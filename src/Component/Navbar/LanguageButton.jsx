import React from "react";
import { useTranslation } from "react-i18next";
import "../Navbar/nav.css";

export default function LanguageButton() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className="btn btn rounded-circle text-center btn-sm ms- lang-btn"
      onClick={toggleLanguage}
    >
      {i18n.language === "en" ? "AR" : "EN"}
    </button>
  );
}
