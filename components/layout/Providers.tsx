"use client";

import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/context/LanguageContext";

/** Global motion settings + language (EN/FA) context for the whole app. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageProvider>
  );
}
