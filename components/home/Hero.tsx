"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { useSiteReady } from "@/hooks/useSiteReady";
import { EASE } from "@/lib/motion";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Button } from "@/components/ui/Button";

const letters = site.brand.toUpperCase().split("");

export function Hero() {
  const ready = useSiteReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const show = ready ? "show" : "hidden";

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden" aria-labelledby="hero-title">
      <HeroCanvas />

      <div className="wrap relative flex min-h-[100svh] flex-col justify-between pb-10 pt-28 md:pb-14 md:pt-36">
        {/* Top meta row — viewport-style labels */}
        <motion.div
          className="label-mono flex flex-wrap items-center justify-between gap-y-2"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9, duration: 0.8 } } }}
          initial="hidden"
          animate={show}
          style={{ opacity: fade }}
        >
          <span>{site.name}</span>
          <span className="hidden md:inline">{site.facts.studio} · {site.facts.years} yrs · with {site.facts.partner}</span>
          <span>{site.facts.university} · {site.facts.semester}</span>
        </motion.div>

        <div className="mt-auto">
          <motion.p
            className="mb-6 max-w-md text-base leading-relaxed text-fog md:text-lg"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.8, ease: EASE } } }}
            initial="hidden"
            animate={show}
          >
            Game developer. Second-semester computer science student. Beginner at making things move — and not shy about it.
          </motion.p>

          <motion.h1
            id="hero-title"
            aria-label={site.brand}
            className="font-display text-[clamp(4.25rem,17.5vw,19rem)] font-extrabold leading-[0.82] tracking-[-0.05em] text-bone"
            style={{ y: wordY }}
          >
            {letters.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  aria-hidden
                  className="inline-block"
                  variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { delay: 0.1 + i * 0.05, duration: 0.9, ease: EASE } } }}
                  initial="hidden"
                  animate={show}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, ease: EASE } } }}
            initial="hidden"
            animate={show}
          >
            <Button href="/projects" magnetic>See the work</Button>
            <Button href="/about" variant="ghost" magnetic>Who is Erfan</Button>
            <span aria-hidden className="ml-auto hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist md:flex">
              scroll <span className="h-8 w-px overflow-hidden bg-line"><motion.span className="block h-full w-full bg-signal" animate={reduce ? undefined : { y: ["-100%", "100%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} /></span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
