import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { Timeline } from "@/components/journey/Timeline";
import { SpotlightBackdrop } from "@/components/ui/SpotlightBackdrop";

export const metadata = pageMeta({
  title: "Journey",
  description: `From game development at ${site.facts.studio} to Computer Engineering at ${site.facts.university} — the path so far.`,
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
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-bone"
        />
      </section>

      <section className="wrap pb-24 md:pb-36" aria-label="Timeline">
        <div className="relative overflow-visible">
          <SpotlightBackdrop />
          <div className="relative">
            <Timeline />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-coal py-24 md:py-32">
        <div className="wrap flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-body text-xl sm:text-2xl md:text-3xl font-black tracking-tight">The next entry gets written by making something.</p>
          <div className="flex flex-wrap gap-4">
            <Button href="/projects" magnetic>Projects</Button>
            <Button href="/contact" variant="ghost">Contact</Button>
          </div>
        </div>
      </section>
    </>
  );
}
