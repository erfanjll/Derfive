"use client";

import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { gamesSectionDescription } from "@/content/i18n";

/** Featured Games — the two game-development project cards, full stop. */
export function GameSection() {
  const games = getProjectsByCategory("game");

  return (
    <section className="ambient-glow relative border-y border-line bg-coal py-24 md:py-36" aria-labelledby="home-games">
      {/* Borderless circular accent glow, lower-left — no hard rectangular edges. */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-lime-400/10 blur-[140px] opacity-20" />

      <div className="wrap">
        <SectionHeading
          index="01"
          eyebrow="Game development"
          title="Featured games."
          description={gamesSectionDescription}
        />
        <span id="home-games" className="sr-only">Game development</span>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8">
          {games.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProjectCard project={p} index={i} size="large" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/game-development" magnetic>Game development</Button>
          <Button href="/projects" variant="ghost">All Projects</Button>
        </Reveal>
      </div>
    </section>
  );
}
