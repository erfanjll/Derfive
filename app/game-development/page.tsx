import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { media } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { EngineWorkspace } from "@/components/game/EngineWorkspace";
import { TText } from "@/components/ui/TText";
import { gamePageCopy } from "@/content/i18n";

export const metadata = pageMeta({
  title: "Game Development",
  description: `Technical Art & Game Development at ${site.facts.studio} together with ${site.facts.partner}. Games, footage and experiments by Erfan Jalali.`,
  path: "/game-development",
});

const stack = ["Unity", "C#", "2D Physics Systems", "Java / C#", "OOP Architecture", "Multithreaded State Loops"];

export default function GameDevelopmentPage() {
  return (
    <>
      {/* Header */}
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8" data-discipline="game">
          <span className="text-signal">02</span> — Game development
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Games are the main quest."
          className="font-pixel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-bone"
        />
        <Reveal delay={0.3} className="mt-10 max-w-2xl">
          <TText
            en={gamePageCopy.intro.en}
            fa={gamePageCopy.intro.fa}
            className="text-lg leading-relaxed text-fog md:text-xl"
          />
        </Reveal>
      </section>

      {/* Unity / Game Engine Workspace — primary cinematic cards + HUD telemetry */}
      <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="engine-title">
        <div className="wrap">
          <SectionHeading index="01" eyebrow="Unity / Game Engine Workspace" title="The games." description={gamePageCopy.projectsDescription} eyebrowClassName="font-pixel" titleClassName="font-pixel" />
          <span id="engine-title" className="sr-only">Unity game engine workspace</span>
          <EngineWorkspace />
        </div>
      </section>

      {/* Studio & stack */}
      <section className="wrap py-24 md:py-36" aria-labelledby="stack-title">
        <SectionHeading index="02" eyebrow="Studio & stack" title="One studio, one collaborator, a growing stack." eyebrowClassName="font-pixel" titleClassName="font-pixel" />
        <span id="stack-title" className="sr-only">Studio and stack</span>
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal className="glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7 md:col-span-6 md:p-9">
            <p className="label-mono">The studio</p>
            <h3 className="mt-4 font-pixel text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">{site.facts.studio}</h3>
            <TText
              en={gamePageCopy.studioBody.en}
              fa={gamePageCopy.studioBody.fa}
              className="mt-5 max-w-md text-fog"
            />
          </Reveal>
          <Reveal delay={0.08} className="glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7 md:col-span-6 md:p-9">
            <p className="label-mono">The collaboration</p>
            <h3 className="mt-4 font-pixel text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">
              with <span className="text-signal">{site.facts.partner}</span>
            </h3>
            <TText
              en={gamePageCopy.collaborationBody.en}
              fa={gamePageCopy.collaborationBody.fa}
              className="mt-5 max-w-md text-fog"
            />
          </Reveal>
          <Reveal delay={0.16} className="glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7 md:col-span-12 md:p-9">
            <p className="label-mono mb-5">Tech stack</p>
            <div className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fog">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footage */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="footage-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="Footage" title="Gameplay." eyebrowClassName="font-pixel" titleClassName="font-pixel" />
          <span id="footage-title" className="sr-only">Gameplay footage</span>
          <Reveal className="mt-14">
            <VideoPlayer {...media.videos.gameDemo} aspect="21/9" label="game / demo" index="03" className="max-md:aspect-video" />
          </Reveal>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-line py-24 md:py-36" aria-labelledby="next-title">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-mono"><span className="text-signal">04</span> — Next</p>
          </div>
          <div className="md:col-span-8">
            <h2 id="next-title" className="font-pixel text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">Still building.</h2>
            <TText
              en={gamePageCopy.nextBody.en}
              fa={gamePageCopy.nextBody.fa}
              className="mt-6 max-w-xl text-fog"
            />
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