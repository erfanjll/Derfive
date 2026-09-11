"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/cn";

type TTextTag = "p" | "span" | "div";

interface TTextProps {
  en: string;
  fa: string;
  as?: TTextTag;
  className?: string;
}

/**
 * Long-form copy in the active language (EN/FA).
 *
 * Persian renders as a self-contained RTL island: `dir="rtl"`, `lang="fa"`
 * and the Vazirmatn stack (`.fa-text`) live on THIS element only — the
 * document itself always stays `lang="en" dir="ltr"`, which keeps the
 * custom cursor, pointer math and layout architecture untouched.
 */
export function TText({ en, fa, as = "p", className }: TTextProps) {
  const { lang } = useLanguage();
  const isFa = lang === "fa";
  const Tag = as;

  return (
    <Tag
      dir={isFa ? "rtl" : undefined}
      lang={isFa ? "fa" : undefined}
      className={cn(isFa && "fa-text", className)}
    >
      {isFa ? fa : en}
    </Tag>
  );
}