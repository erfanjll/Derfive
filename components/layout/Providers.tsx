"use client";

import { MotionConfig } from "motion/react";

/** Global motion settings: honours the user's "reduce motion" system preference. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
