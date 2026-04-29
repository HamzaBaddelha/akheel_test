"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import english from "@/locales/english.json";
import arabic from "@/locales/arabic.json";
import french from "@/locales/french.json";

type Language = "en" | "ar" | "fr";

type Dictionary = Record<string, unknown>;
const DICTIONARIES: Record<Language, Dictionary> = {
  en: english,
  ar: arabic,
  fr: french,
};

interface I18nContextValue {
  language: Language;
  direction: "ltr" | "rtl";
  isRTL: boolean;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getValue(dict: Dictionary, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);

  return typeof value === "string" ? value : path;
}

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;

  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, template);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const direction: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";
  const isRTL = direction === "rtl";
  const dictionary = DICTIONARIES[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("akheel-lang");
    if (saved === "en" || saved === "ar" || saved === "fr") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("akheel-lang", language);
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dataset.lang = language;
    document.body.dataset.dir = direction;
  }, [language, direction]);

  const value = useMemo<I18nContextValue>(() => {
    return {
      language,
      direction,
      isRTL,
      setLanguage,
      t: (key, params) => interpolate(getValue(dictionary, key), params),
    };
  }, [language, direction, isRTL, dictionary]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}
