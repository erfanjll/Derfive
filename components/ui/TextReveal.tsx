"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  /** Animate immediately (hero) instead of when scrolled into view. */
  immediate?: boolean;
  /** For the hero: wait for this to become true before animating. */
  ready?: boolean;
}

/** Word-by-word masked reveal. Screen readers get the plain sentence. */
export function TextReveal({ text, className, as: Tag = "p", delay = 0, stagger = 0.04, immediate, ready = true }: TextRevealProps) {
  const words = text.split(" ");
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <Tag className={cn("inline", className)} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={container}
        initial="hidden"
        {...(immediate
          ? { animate: ready ? "show" : "hidden" }
          : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } })}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span className="inline-block" variants={word}>
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
