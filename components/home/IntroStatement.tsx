"use client";

import { site } from "@/content/site";
import { useLanguage } from "@/context/LanguageContext";
import { persona } from "@/content/i18n";

export function IntroStatement() {
  const { t } = useLanguage();

  const chips = [
    t(persona.identity),
    `${site.facts.studio} · with ${site.facts.partner}`,
    `${t(persona.university)} · ${site.facts.program}`,
    "Gameplay Systems & Motion Graphics",
  ];

  return (
    <section className="border-t border-line bg-graphite/40 py-16">
      <div className="wrap flex flex-wrap gap-3">
        {chips.map((chip, i) => (
          <span
            key={i}
            className="rounded-full border border-line bg-ash/50 px-4 py-1.5 font-mono text-xs text-fog"
          >
            {chip}
          </span>
        ))}
      </div>
    </section>
  );
}