import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { about } from "@/content/about";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TText } from "@/components/ui/TText";
import { aboutIntro, aboutParagraphsFa, aboutPrinciplesFa } from "@/content/i18n";

export const metadata = pageMeta({
  title: "About",
  description: `About ${site.name} — ${site.role}.`,
  path: "/about",
});

const focus = ["Unity Engine", "C#", "Gameplay Systems", "2D Physics", "Motion Graphics", "VFX Compositing"];

export default function AboutPage() {
  return (
    <>
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">00</span> — About
        </p>
        <TextReveal
          as="h1"
          immediate
          text="About"
          className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-bone"
        />
        <TText
          en={about.intro}
          fa={aboutIntro.fa}
          as="div"
          className="font-body text-base sm:text-lg md:text-xl text-bone/90 font-normal leading-relaxed max-w-3xl my-6"
        />
      </section>

      {/* Background */}
      <section className="border-t border-line bg-coal py-20 md:py-28">
        <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="label-mono md:col-span-3">Background</div>
          <div className="space-y-6 text-base leading-relaxed text-fog md:col-span-9 md:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} as="div">
                <TText
                  en={p}
                  fa={aboutParagraphsFa[i] ?? p}
                  className="text-base leading-relaxed text-fog md:text-lg"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core focus */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="label-mono md:col-span-3">Core focus</div>
          <div className="flex flex-wrap gap-2 md:col-span-9">
            {focus.map((skill) => (
              <span key={skill} className="rounded-full border border-line bg-graphite/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-fog">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-t border-line bg-coal py-20 md:py-28">
        <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="label-mono md:col-span-3">Facts</div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:col-span-9">
            {about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <dt className="label-mono">{f.label}</dt>
                <dd className="text-right text-sm font-bold text-bone">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap">
          <p className="label-mono mb-10">Principles</p>
          <ol className="grid gap-6 md:grid-cols-3">
            {about.principles.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.08} className="glow-border rounded-sm border border-line bg-graphite/60 backdrop-blur-md p-7">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <h3 className="mt-6 font-body text-xl sm:text-2xl font-black tracking-tight text-bone">{p.title}</h3>
                <TText
                  en={p.body}
                  fa={aboutPrinciplesFa[p.title] ?? p.body}
                  className="mt-3 text-sm leading-relaxed text-fog"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line py-16 md:py-24">
        <div className="wrap flex flex-wrap gap-4">
          <Button href="/contact" magnetic>Get in touch ↗</Button>
          <Button href="/journey" variant="ghost">My Journey ↗</Button>
        </div>
      </section>
    </>
  );
}
