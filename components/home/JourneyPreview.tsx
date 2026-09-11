"use client";

import Link from "next/link";
import { journey } from "@/content/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TText } from "@/components/ui/TText";
import { journeyBodiesFa } from "@/content/i18n";

export function JourneyPreview() {
  return (
    <section className="wrap py-24 md:py-36" aria-labelledby="home-journey">
      <SectionHeading index="04" eyebrow="Journey" title="Where this is going." titleClassName="font-display" />
      <span id="home-journey" className="sr-only">Journey</span>

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
        <span aria-hidden className="absolute left-0 top-3 hidden h-px w-full bg-line md:block" />
        {journey.map((s, i) => (
          <Reveal key={s.id} as="li" delay={i * 0.08} className="relative md:pt-8">
            <span aria-hidden className="absolute left-0 top-1.5 hidden h-3 w-3 rotate-45 border border-signal bg-ink md:block" />
            <p className="font-mono text-xs text-signal">{s.index}</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{s.title}</h3>
            <p className="label-mono mt-1 normal-case tracking-normal">{s.period}</p>
            <TText
              en={s.body}
              fa={journeyBodiesFa[s.id] ?? s.body}
              className="mt-4 text-sm leading-relaxed text-fog"
            />
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-12">
        <Link href="/journey" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-signal">
          Full timeline <span className="h-px w-10 bg-signal transition-all duration-500 group-hover:w-16" />
        </Link>
      </Reveal>
    </section>
  );
}
