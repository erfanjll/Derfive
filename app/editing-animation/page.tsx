import { pageMeta } from "@/lib/metadata";
import { media } from "@/content/media";
import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BeforeAfter } from "@/components/media/BeforeAfter";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AeTimelineHeader } from "@/components/motion/AeTimelineHeader";
import { TText } from "@/components/ui/TText";
import { motionPageCopy } from "@/content/i18n";

export const metadata = pageMeta({
  title: "Editing & Animation",
  description: "Beginner-level editing and animation work by Erfan Jalali — shown honestly, improving on purpose.",
  path: "/editing-animation",
});

// Kinetic voice across every title on this tab — font-kinetic · uppercase · wide tracking.
const kinetic = "font-kinetic uppercase tracking-[0.18em]";

const approach = [
  { title: "Study the cut", body: "Watch something good, slow it down, work out why the timing feels right." },
  { title: "Rebuild it small", body: "Recreate one idea at a time instead of chasing a finished piece." },
  { title: "Ship the rough version", body: "Post it, look at it a week later, do it again better." },
];

export default function EditingAnimationPage() {
  const related = getProjectsByCategory("animation", "editing");

  return (
    <>
      {/* Header */}
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8" data-discipline="motion">
          <span className="text-signal">03</span> — Editing & animation
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Side quest. Beginner level."
          className={`${kinetic} text-3xl font-bold leading-tight text-bone sm:text-5xl md:text-6xl lg:text-7xl`}
        />
        <Reveal delay={0.3} className="mt-10 grid gap-8 md:grid-cols-12">
          <TText
            en={motionPageCopy.intro.en}
            fa={motionPageCopy.intro.fa}
            className="text-lg leading-relaxed text-fog md:col-span-7 md:text-xl"
          />
          <div className="md:col-span-4 md:col-start-9">
            <dl className="grid grid-cols-2 gap-4 border-l border-line pl-6">
              <div><dt className="label-mono">Editing</dt><dd className="mt-1 font-body font-black">Beginner</dd></div>
              <div><dt className="label-mono">Animation</dt><dd className="mt-1 font-body font-black">Beginner</dd></div>
              <div className="col-span-2"><dt className="label-mono">Direction</dt><dd className="mt-1 font-body font-black text-signal">Improving</dd></div>
            </dl>
          </div>
        </Reveal>

        {/* After Effects / Editorial timeline header — live TC, ruler ticks, keyframes, NLE tracks. */}
        <AeTimelineHeader />
      </section>

      {/* Before / after */}
      <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="ba-title">
        <div className="wrap">
          <SectionHeading index="01" eyebrow="Editing" title="Before / after." description={motionPageCopy.beforeAfterDescription} eyebrowClassName="font-kinetic" titleClassName={kinetic} />
          <span id="ba-title" className="sr-only">Before and after comparison</span>
          <Reveal className="mt-14">
            <div className="relative">
              {/* Composition aspect-ratio brackets in the frame corners */}
              <span aria-hidden className="pointer-events-none absolute -top-3 left-0 z-10 rounded-sm border border-line/60 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-signal backdrop-blur-sm">
                [ 16:9 FHD ]
              </span>
              <span aria-hidden className="pointer-events-none absolute -bottom-3 right-0 z-10 rounded-sm border border-line/60 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist backdrop-blur-sm">
                [ 2.39:1 ANAMORPHIC ]
              </span>
              <BeforeAfter before={media.images.before} after={media.images.after} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="wrap py-24 md:py-36" aria-labelledby="approach-title">
        <SectionHeading index="02" eyebrow="Process" title="How a beginner gets less beginner." eyebrowClassName="font-kinetic" titleClassName={kinetic} />
        <span id="approach-title" className="sr-only">Approach</span>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {approach.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.08} className="relative glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7">
              <span className="font-mono text-xs text-signal">0{i + 1}</span>
              <h3 className={`${kinetic} mt-6 text-xl font-bold text-bone sm:text-2xl`}>{step.title}</h3>
              <TText
                en={step.body}
                fa={motionPageCopy.approachBodies[step.title] ?? step.body}
                className="mt-3 text-sm leading-relaxed text-fog"
              />
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Related projects + future */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="motion-projects-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="Projects" title="Motion projects." eyebrowClassName="font-kinetic" titleClassName={kinetic} />
          <span id="motion-projects-title" className="sr-only">Motion projects</span>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8">
            {related.map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? "md:mt-20" : undefined}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
          <Reveal className="mt-20 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
            <TText
              en={motionPageCopy.moreBody.en}
              fa={motionPageCopy.moreBody.fa}
              className="max-w-md text-fog"
            />
            <Button href="/projects" variant="ghost" magnetic>All projects</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}