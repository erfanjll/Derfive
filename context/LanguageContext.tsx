"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/content/i18n";

const STORAGE_KEY = "derfive-lang";

interface LanguageContextValue {
  lang: Lang;
  /** Convenience getter: given { en, fa }, returns the string for the active language. */
  t: (strings: { en: string; fa: string }) => string;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLang(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang === "fa" ? "fa" : "en";
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English on the server and on first paint; the real, persisted
  // choice (if any) is applied right after mount — same pattern as the theme toggle.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "fa" || saved === "en") {
      setLangState(saved);
      applyDocumentLang(saved);
    } else {
      applyDocumentLang("en");
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    applyDocumentLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "fa" : "en");
  }, [lang, setLang]);

  const t = useCallback((strings: { en: string; fa: string }) => strings[lang], [lang]);

  const value = useMemo(() => ({ lang, t, toggleLang, setLang }), [lang, t, toggleLang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside a <LanguageProvider>");
  }
  return ctx;
}
