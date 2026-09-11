import { pageMeta } from "@/lib/metadata";
import { media } from "@/content/media";
import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { BeforeAfter } from "@/components/media/BeforeAfter";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TText } from "@/components/ui/TText";
import { motionPageCopy } from "@/content/i18n";

export const metadata = pageMeta({
  title: "Editing & Animation",
  description: "Beginner-level editing and animation work by Erfan Jalali — shown honestly, improving on purpose.",
  path: "/editing-animation",
});

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
        <p className="label-mono mb-8">
          <span className="text-signal">03</span> — Editing & animation
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Side quest. Beginner level."
          className="font-body text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-bone"
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
      </section>

      {/* Showcase grid */}
      <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="reel-title">
        <div className="wrap">
          <SectionHeading index="01" eyebrow="Showcase" title="Clips." description={motionPageCopy.showcaseDescription} />
          <span id="reel-title" className="sr-only">Showcase</span>
          <div className="mt-14 grid gap-6 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-8">
              <VideoPlayer {...media.videos.animationDemo} aspect="16/9" label="animation" index="01" />
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-4">
              <VideoPlayer {...media.videos.motionExtra01} aspect="9/16" label="motion" index="02" className="max-md:aspect-video" />
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-4">
              <VideoPlayer {...media.videos.motionExtra02} aspect="9/16" label="motion" index="03" className="max-md:aspect-video" />
            </Reveal>
            <Reveal delay={0.12} className="md:col-span-8">
              <VideoPlayer {...media.videos.editingDemo} aspect="16/9" label="editing" index="04" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="wrap py-24 md:py-36" aria-labelledby="ba-title">
        <SectionHeading index="02" eyebrow="Editing" title="Before / after." description={motionPageCopy.beforeAfterDescription} />
        <span id="ba-title" className="sr-only">Before and after comparison</span>
        <Reveal className="mt-14">
          <BeforeAfter before={media.images.before} after={media.images.after} />
        </Reveal>
      </section>

      {/* Approach */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="approach-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="Process" title="How a beginner gets less beginner." />
          <span id="approach-title" className="sr-only">Approach</span>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {approach.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 0.08} className="relative glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <h3 className="mt-6 font-body text-xl sm:text-2xl font-black tracking-tight">{step.title}</h3>
                <TText
                  en={step.body}
                  fa={motionPageCopy.approachBodies[step.title] ?? step.body}
                  className="mt-3 text-sm leading-relaxed text-fog"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related projects + future */}
      <section className="wrap py-24 md:py-36" aria-labelledby="motion-projects-title">
        <SectionHeading index="04" eyebrow="Projects" title="Motion projects." />
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
      </section>
    </>
  );
}
