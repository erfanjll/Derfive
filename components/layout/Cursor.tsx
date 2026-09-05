"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useIsFinePointer } from "@/hooks/useMediaQuery";

type CursorState = "default" | "link" | "view" | "hidden";

/**
 * Custom cursor for mouse users. Elements can request a state with:
 *   data-cursor="view"  → large ring with "VIEW" label (media, project cards)
 *   data-cursor="link"  → medium ring (default for links/buttons)
 */
export function Cursor() {
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });
  const [state, setState] = useState<CursorState>("hidden");

  useEffect(() => {
    if (!enabled) {
      delete document.documentElement.dataset.cursor;
      return;
    }
    document.documentElement.dataset.cursor = "custom";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setState((s) => (s === "hidden" ? "default" : s));
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button, [role='button'], input, textarea, label");
      if (!el) return setState("default");
      if (el.matches("input, textarea")) return setState("hidden");
      setState((el.dataset.cursor as CursorState) || "link");
    };
    const onLeave = () => setState("hidden");
    const onEnter = () => setState("default");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      delete document.documentElement.dataset.cursor;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = { default: 34, link: 48, view: 84, hidden: 0 }[state];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-signal"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: state === "hidden" ? 0 : 1 }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-bone/70 font-mono text-[10px] tracking-widest text-bone"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ring,
          height: ring,
          opacity: state === "hidden" ? 0 : 1,
          backgroundColor: state === "view" ? "rgba(5,5,5,0.55)" : "rgba(5,5,5,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {state === "view" && "VIEW"}
      </motion.div>
    </div>
  );
}
