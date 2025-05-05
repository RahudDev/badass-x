import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import translationAR from './locales/ar/translation.json';
import translationDE from './locales/de/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';
import translationHI from './locales/hi/translation.json';
import translationIT from './locales/it/translation.json';
import translationJA from './locales/ja/translation.json';
import translationKO from './locales/ko/translation.json';
import translationPT from './locales/pt/translation.json';
import translationRU from './locales/ru/translation.json';
import translationZH from './locales/zh/translation.json';


// Add more languages as needed

const resources = {
  ar: {
    translation: translationAR,
  },
  de: {
    translation: translationDE,
  },
  en : {
    translation : translationEN,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  },
  it: {
    translation: translationIT,
  },
  ja: {
    translation: translationJA,
  },
  ko: {
    translation: translationKO,
  },
  pt: {
    translation: translationPT,
  },
  ru: {
    translation: translationRU,
  },
  zh: {
    translation: translationZH,
  },
  // Add more languages as needed
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
