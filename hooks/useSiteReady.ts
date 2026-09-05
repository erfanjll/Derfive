"use client";

import { useEffect, useState } from "react";

export const SITE_READY_EVENT = "derfive:ready";

/**
 * True once the preloader has finished (or was skipped).
 * Lets the hero wait with its entrance animation instead of playing it behind the loader.
 */
export function useSiteReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.ready === "true") {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener(SITE_READY_EVENT, onReady);
    return () => window.removeEventListener(SITE_READY_EVENT, onReady);
  }, []);

  return ready;
}
