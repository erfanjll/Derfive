"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/content/i18n";

const STORAGE_KEY = "derfive-lang";

interface LanguageContextValue {
  lang: Lang;
  /** Convenience getter for { en, fa } pairs (long-form copy only). */
  t: (strings: { en: string; fa: string }) => string;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

/**
 * Bilingual state (EN/FA).
 *
 * Deliberately does NOT touch <html lang/dir>: the document always stays
 * lang="en" dir="ltr". Persian is scoped per-paragraph by <TText>, which
 * keeps the custom cursor, pointer math and layout architecture intact.
 */
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English on the server and on first paint (so hydration is always clean);
  // the persisted choice, if any, is restored right after mount.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "fa" || saved === "en") setLangState(saved);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
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
