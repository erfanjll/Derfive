import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { media } from "@/content/media";
import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { MediaImage } from "@/components/media/MediaImage";
import { ExperienceMeter } from "@/components/game/ExperienceMeter";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata = pageMeta({
  title: "Game Development",
  description: `Four years of game development at ${site.facts.studio} together with ${site.facts.partner}. Games, footage and experiments by Erfan Jalali.`,
  path: "/game-development",
});

// Asymmetric layout for the four screenshot slots.
const screenLayout = ["md:col-span-7", "md:col-span-5 md:mt-16", "md:col-span-5", "md:col-span-7 md:-mt-16"];

export default function GameDevelopmentPage() {
  const games = getProjectsByCategory("game");

  return (
    <>
      {/* Header */}
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">02</span> — Game development
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Games are the main quest."
          className="font-body text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-bone"
        />
        <Reveal delay={0.3} className="mt-10 max-w-2xl">
          <p className="text-lg leading-relaxed text-fog md:text-xl">
            {site.facts.years} years at {site.facts.studio}, together with {site.facts.partner}. This page is where the games live —
            titles, roles, tools and footage land here as they become ready to show.
          </p>
        </Reveal>
      </section>

      {/* Experience */}
      <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="exp-title">
        <div className="wrap">
          <SectionHeading index="01" eyebrow="Experience" title="Four years, one studio, one collaborator." />
          <span id="exp-title" className="sr-only">Experience</span>
          <div className="mt-16 grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <ExperienceMeter />
            </Reveal>
            <div className="grid gap-6 md:col-span-7">
              <Reveal delay={0.1} className="glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7 md:p-9">
                <p className="label-mono">The studio</p>
                <h3 className="mt-4 font-body text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">{site.facts.studio}</h3>
                <p className="mt-5 max-w-md text-fog">
                  Where the last {site.facts.years} years of making games happened. Specific titles and responsibilities will be listed
                  here as they're added.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7 md:p-9">
                <p className="label-mono">The collaboration</p>
                <h3 className="mt-4 font-body text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">
                  with <span className="text-signal">{site.facts.partner}</span>
                </h3>
                <p className="mt-5 max-w-md text-fog">
                  Building games together for four years. A long two-person collaboration is its own kind of education — in
                  scope, in disagreement, and in actually finishing.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footage */}
      <section className="wrap py-24 md:py-36" aria-labelledby="footage-title">
        <SectionHeading index="02" eyebrow="Footage" title="Gameplay." description="One clip, full width. Replace it in content/media.ts under videos.gameDemo." />
        <span id="footage-title" className="sr-only">Gameplay footage</span>
        <Reveal className="mt-14">
          <VideoPlayer {...media.videos.gameDemo} aspect="21/9" label="game / demo" index="01" className="max-md:aspect-video" />
        </Reveal>
      </section>

      {/* Screens */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="screens-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="Screens" title="Stills from the work." />
          <span id="screens-title" className="sr-only">Screenshots</span>
          <div className="mt-14 grid gap-6 md:grid-cols-12 md:gap-8">
            {media.images.gameScreens.map((img, i) => (
              <Reveal key={i} delay={i * 0.06} className={screenLayout[i] ?? "md:col-span-6"}>
                <MediaImage {...img} label="game" index={`0${i + 1}`} aspect="16/10" hoverZoom />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Game projects */}
      <section className="wrap py-24 md:py-36" aria-labelledby="games-title">
        <SectionHeading index="04" eyebrow="Game projects" title="The games." description="Every entry here is edited in content/projects.ts. Placeholder slots are marked until a real project replaces them." />
        <span id="games-title" className="sr-only">Game projects</span>
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
          {games.map((p, i) => (
            <div key={p.slug} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-20"}>
              <ProjectCard project={p} index={i} size={i % 2 === 0 ? "large" : "regular"} />
            </div>
          ))}
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-line py-24 md:py-36" aria-labelledby="next-title">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-mono"><span className="text-signal">05</span> — Next</p>
          </div>
          <div className="md:col-span-8">
            <h2 id="next-title" className="font-body text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">Still building.</h2>
            <p className="mt-6 max-w-xl text-fog">
              New games and prototypes get added as they're playable — not before. If you want to talk about any of it, the door is open.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/projects" magnetic>All projects</Button>
              <Button href="/contact" variant="ghost">Get in touch</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
