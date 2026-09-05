"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { SITE_READY_EVENT } from "@/hooks/useSiteReady";
import { EASE } from "@/lib/motion";

const MAX_WAIT_MS = 2000; // never hold the visitor longer than this
const SESSION_KEY = "derfive-visited";

function markReady() {
  document.documentElement.dataset.ready = "true";
  window.dispatchEvent(new Event(SITE_READY_EVENT));
}

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Returning visitors in the same session skip the loader entirely.
    if (sessionStorage.getItem(SESSION_KEY) || reduce) {
      setVisible(false);
      markReady();
      return;
    }

    let target = 0;
    let shown = 0;
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      sessionStorage.setItem(SESSION_KEY, "1");
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        markReady();
      }, 250);
    };

    // Real signals: fonts + full page load. Progress eases toward them.
    document.fonts.ready.then(() => (target = Math.max(target, 60)));
    if (document.readyState === "complete") target = 100;
    else window.addEventListener("load", () => (target = 100), { once: true });

    const tick = () => {
      shown += (Math.max(target, shown + 0.4) - shown) * 0.12;
      setProgress(Math.min(99, Math.round(shown)));
      if (target >= 100 && shown > 96) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const cap = setTimeout(finish, MAX_WAIT_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-6 md:px-12 md:py-10"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE } }}
        >
          <div className="flex items-center justify-between">
            <span className="label-mono">{site.brand} / loading</span>
            <span className="label-mono">{site.name}</span>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-display text-[clamp(3rem,12vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-bone">
              {site.brand.toUpperCase()}
            </span>
            <span className="font-mono text-2xl tabular-nums text-signal md:text-4xl">{progress}</span>
          </div>

          <div className="h-px w-full bg-line">
            <motion.div className="h-full bg-signal" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
