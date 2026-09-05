"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";

const years = ["01", "02", "03", "04"];

/** Four bars, one per year at EMVP. No dates until Erfan adds them. */
export function ExperienceMeter({ compact }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-sm border border-line bg-graphite p-6 md:p-8">
      <div>
        <p className="label-mono">Experience</p>
        <p className="mt-2 font-display text-[clamp(4rem,9vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em] text-bone">
          {site.facts.years.padStart(2, "0")}
          <span className="ml-2 align-top font-mono text-sm font-normal tracking-normal text-signal">yrs</span>
        </p>
        <p className="mt-2 text-sm text-fog">
          {site.facts.studio} · with {site.facts.partner}
        </p>
      </div>

      <div className={compact ? "mt-10" : "mt-16"}>
        <div className="flex items-end gap-2" style={{ height: compact ? 96 : 160 }}>
          {years.map((y, i) => (
            <div key={y} className="flex h-full flex-1 flex-col justify-end gap-2">
              <motion.div
                className="w-full origin-bottom bg-signal"
                style={{ height: `${40 + i * 20}%` }}
                initial={{ scaleY: 0, opacity: 0.4 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
              />
              <span className="font-mono text-[10px] text-mist">Y{y}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Year markers · dates to be added</p>
      </div>
    </div>
  );
}
