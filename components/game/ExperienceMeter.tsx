"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";

const projectSlots = [
  { id: "01", label: "EMVP Core" },
  { id: "02", label: "SBU Engine" },
];

export function ExperienceMeter({ compact }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-sm border border-line bg-graphite p-6 md:p-8">
      <div>
        <p className="label-mono">Featured Works</p>
        <p className="mt-2 font-display text-[clamp(4rem,9vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em] text-bone">
          02
          <span className="ml-2 align-top font-mono text-sm font-normal tracking-normal text-signal">
            Games
          </span>
        </p>
        <p className="mt-2 text-sm text-fog">
          {site.facts.studio} · with {site.facts.partner}
        </p>
      </div>

      <div className={compact ? "mt-10" : "mt-16"}>
        <div className="flex items-end gap-3" style={{ height: compact ? 96 : 160 }}>
          {projectSlots.map((slot, i) => (
            <div key={slot.id} className="flex h-full flex-1 flex-col justify-end gap-2">
              <motion.div
                className="w-full origin-bottom bg-signal"
                style={{ height: `${65 + i * 25}%` }}
                initial={{ scaleY: 0, opacity: 0.4 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.15 }}
              />
              <span className="font-mono text-[10px] text-mist">{slot.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mist">
          Indie Collaboration & Academic Systems
        </p>
      </div>
    </div>
  );
}