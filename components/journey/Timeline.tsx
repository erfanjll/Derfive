"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { journey } from "@/content/journey";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scroll-driven timeline. A lime line fills as you scroll; each stage sits on
 * alternating sides on desktop and stacks in a single column on mobile.
 */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      {/* Track + animated fill */}
      <span aria-hidden className="absolute left-[7px] top-0 h-full w-px bg-line md:left-1/2" />
      <motion.span
        aria-hidden
        className="absolute left-[7px] top-0 h-full w-px origin-top bg-signal md:left-1/2"
        style={{ scaleY: reduce ? 1 : progress }}
      />

      {journey.map((stage, i) => {
        const left = i % 2 === 0;
        return (
          <li key={stage.id} className="relative grid gap-4 py-14 pl-10 md:grid-cols-2 md:gap-x-24 md:py-24 md:pl-0">
            {/* Node */}
            <motion.span
              aria-hidden
              className="absolute left-0 top-[3.6rem] h-[15px] w-[15px] rotate-45 border border-line bg-ink md:left-1/2 md:top-[6.2rem] md:-translate-x-1/2"
              initial={false}
              whileInView={reduce ? undefined : { borderColor: "#c8f542", backgroundColor: "#c8f542" }}
              viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
              transition={{ duration: 0.4 }}
            />

            {/* Content */}
            <Reveal className={cn("md:row-start-1", left ? "md:col-start-1 md:text-right" : "md:col-start-2")}>
              <p className="font-mono text-xs text-signal">{stage.index}</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{stage.title}</h2>
              <p className="label-mono mt-3 normal-case tracking-normal">
                {stage.period}
                {stage.org ? ` · ${stage.org}` : ""}
              </p>
              <p className={cn("mt-6 max-w-md text-base leading-relaxed text-fog", left && "md:ml-auto")}>{stage.body}</p>
            </Reveal>

            {/* Giant outlined index on the opposite side (desktop only) */}
            <div aria-hidden className={cn("hidden select-none md:row-start-1 md:block", left ? "md:col-start-2" : "md:col-start-1 md:text-right")}>
              <span className="outline-text font-display text-[clamp(7rem,14vw,14rem)] font-extrabold leading-none tracking-[-0.06em]">
                {stage.index}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
