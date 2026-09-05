import Link from "next/link";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";

const chips = [
  `${site.facts.years} years of game development`,
  `${site.facts.studio} · with ${site.facts.partner}`,
  `${site.facts.university} · ${site.facts.semester}`,
  "Editing & animation · beginner",
];

export function IntroStatement() {
  return (
    <section className="wrap py-28 md:py-44" aria-labelledby="intro-title">
      <p className="label-mono mb-10">
        <span className="text-signal">00</span> — Who is behind Derfive
      </p>
      <TextReveal
        as="h2"
        text="I build games. Four years of it at EMVP with Mobin Kohi, a computer science degree in progress, and a growing habit of making things move on a timeline."
        className="font-display text-[clamp(1.9rem,4.6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bone"
      />
      <span id="intro-title" className="sr-only">Introduction</span>

      <div className="mt-12 flex flex-wrap gap-3">
        {chips.map((c, i) => (
          <Reveal key={c} delay={i * 0.06} as="div">
            <span className="inline-block rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
              {c}
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-10">
        <Link href="/about" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-signal">
          The longer version
          <span className="h-px w-10 bg-signal transition-all duration-500 group-hover:w-16" />
        </Link>
      </Reveal>
    </section>
  );
}
