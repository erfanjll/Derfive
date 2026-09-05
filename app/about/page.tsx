import { pageMeta } from "@/lib/metadata";
import { about } from "@/content/about";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaImage } from "@/components/media/MediaImage";
import { Button } from "@/components/ui/Button";

export const metadata = pageMeta({
  title: "About",
  description: `About Erfan Jalali — game developer at EMVP with Mobin Kohi, computer science student at ${site.facts.university}, and a beginner in editing and animation.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Opening statement */}
      <section className="wrap pb-20 pt-32 md:pb-28 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">01</span> — About
        </p>
        <TextReveal
          as="h1"
          immediate
          text={about.intro}
          className="font-display text-[clamp(2.4rem,6.5vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-bone"
        />
      </section>

      {/* Portrait + story */}
      <section className="wrap grid gap-12 pb-24 md:grid-cols-12 md:pb-36" aria-label="Introduction">
        <Reveal className="md:col-span-5">
          <MediaImage {...media.images.portrait} aspect="4/5" label="portrait" priority sizes="(max-width: 768px) 100vw, 40vw" />
        </Reveal>
        <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-8">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} as="p" className={i === 0 ? "text-xl leading-relaxed text-bone md:text-2xl" : "text-base leading-relaxed text-fog md:text-lg"}>
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="border-y border-line bg-coal py-20 md:py-28" aria-labelledby="facts-title">
        <div className="wrap">
          <h2 id="facts-title" className="label-mono mb-10">Spec sheet</h2>
          <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.04} className="bg-coal p-6">
                <dt className="label-mono">{f.label}</dt>
                <dd className="mt-3 font-display text-lg font-bold tracking-tight text-bone">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Skills */}
      <section className="wrap py-24 md:py-36" aria-labelledby="skills-title">
        <SectionHeading index="02" eyebrow="Skills" title="What I actually do — and how far along I am." />
        <span id="skills-title" className="sr-only">Skills</span>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {about.skills.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className="group flex flex-col justify-between rounded-sm border border-line bg-graphite p-7 transition-colors hover:border-mist">
              <div className="flex items-start justify-between gap-4">
                <p className="label-mono">{s.level}</p>
                <span className="h-2 w-2 rotate-45 bg-line transition-colors group-hover:bg-signal" />
              </div>
              <p className="mt-10 font-display text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.05em] text-bone">
                {s.meter}
                <span className="ml-2 align-top font-mono text-xs font-normal tracking-normal text-signal">{s.meterLabel}</span>
              </p>
              <h3 className="mt-8 font-display text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="principles-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="How I work" title="Three rules I keep breaking and coming back to." />
          <span id="principles-title" className="sr-only">Principles</span>
          <ol className="mt-16 divide-y divide-line border-y border-line">
            {about.principles.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.06} className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <span className="font-mono text-xs text-signal md:col-span-1">0{i + 1}</span>
                <h3 className="font-display text-2xl font-bold tracking-tight md:col-span-5 md:text-3xl">{p.title}</h3>
                <p className="text-fog md:col-span-6">{p.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14 flex flex-wrap gap-4">
            <Button href="/game-development" magnetic>See the games</Button>
            <Button href="/journey" variant="ghost">The journey</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
