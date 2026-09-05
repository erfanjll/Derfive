import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Timeline } from "@/components/journey/Timeline";

export const metadata = pageMeta({
  title: "Journey",
  description: `From four years of games at ${site.facts.studio} to computer science at ${site.facts.university} — the path so far.`,
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <>
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">05</span> — Journey
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Where it started, where it's going."
          className="font-display text-[clamp(2.6rem,8vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-bone"
        />
        <Reveal delay={0.3} className="mt-8 max-w-xl">
          <p className="text-fog md:text-lg">
            No dates yet — on purpose. The order is real; the calendar gets filled in later.
          </p>
        </Reveal>
      </section>

      <section className="wrap pb-24 md:pb-36" aria-label="Timeline">
        <Timeline />
      </section>

      <section className="border-t border-line bg-coal py-24 md:py-32">
        <div className="wrap flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-display text-2xl font-bold tracking-tight md:text-3xl">The next entry gets written by making something.</p>
          <div className="flex flex-wrap gap-4">
            <Button href="/projects" magnetic>Projects</Button>
            <Button href="/contact" variant="ghost">Contact</Button>
          </div>
        </div>
      </section>
    </>
  );
}
