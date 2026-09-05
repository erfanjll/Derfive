import { media } from "@/content/media";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { ExperienceMeter } from "@/components/game/ExperienceMeter";

export function GameSection() {
  return (
    <section className="relative border-y border-line bg-coal py-24 md:py-36" aria-labelledby="home-games">
      <div className="wrap">
        <SectionHeading
          index="01"
          eyebrow="Game development"
          title="Four years of shipping, breaking, and rebuilding."
          description={`At ${site.facts.studio}, together with ${site.facts.partner}. Games are the main quest — everything else on this site orbits it.`}
        />
        <span id="home-games" className="sr-only">Game development</span>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <ExperienceMeter compact />
          </div>
          <Reveal className="md:col-span-8" delay={0.1}>
            <VideoPlayer {...media.videos.gameDemo} label="game / demo" index="01" aspect="16/9" />
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/game-development" magnetic>Game development</Button>
          <Button href="/projects" variant="ghost">All projects</Button>
        </Reveal>
      </div>
    </section>
  );
}
