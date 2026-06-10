"use client";

import { useSettings } from "@/lib/settings-context";
import { useSyncExternalStore } from "react";

import ukTranslations from "./translations/uk.json";
import enTranslations from "./translations/en.json";

const translations = {
  uk: ukTranslations,
  en: enTranslations,
} as const;

type TranslationKey = string;
type Translations = typeof ukTranslations;

function getTranslation(key: string, lang: "uk" | "en"): string {
  const keys = key.split(".");
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export function useTranslation() {
  const { language } = useSettings();
  
  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };
  
  return { t, language };
}
