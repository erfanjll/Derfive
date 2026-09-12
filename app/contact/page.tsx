import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactBackdrop } from "@/components/contact/ContactBackdrop";
import { TText } from "@/components/ui/TText";
import { contactAvailability } from "@/content/i18n";

export const metadata = pageMeta({
  title: "Contact",
  description: "Get in touch with Erfan Jalali (Derfive) about games, motion work, or collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  const { email } = site.contact;

  return (
    <section className="relative overflow-hidden pb-28 pt-32 md:pb-40 md:pt-44">
      <ContactBackdrop />

      <div className="w-full max-w-full px-4 sm:px-6 box-border overflow-x-hidden relative">
        <p className="label-mono mb-8">
          <span className="text-signal">06</span> — Contact
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Say hi."
          className="font-display text-[clamp(4rem,16vw,16rem)] font-extrabold leading-[0.82] tracking-[-0.06em] text-bone break-words"
        />

        <div className="mt-16 grid grid-cols-1 gap-16 md:mt-24 md:grid-cols-12">
          {/* Direct channels */}
          <div className="space-y-12 md:col-span-5">
            <Reveal delay={0.2}>
              <TText
                en={contactAvailability.en}
                fa={contactAvailability.fa}
                className="max-w-sm text-lg leading-relaxed text-fog"
              />
            </Reveal>

            <Reveal delay={0.28}>
              <p className="label-mono mb-3">Email</p>
              {email ? (
                <a href={`mailto:${email}`} className="group inline-block font-display text-2xl font-bold tracking-tight text-bone transition-colors hover:text-signal md:text-4xl">
                  {email}
                  <span className="mt-1 block h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
                </a>
              ) : (
                <p className="inline-flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-mist md:text-3xl">
                  Coming soon <span className="blink text-signal">_</span>
                </p>
              )}
            </Reveal>

            <Reveal delay={0.34}>
              <p className="label-mono mb-3">Elsewhere</p>
              <ul className="divide-y divide-line border-y border-line">
                {site.socials.map((s) => (
                  <li key={s.label} className="flex items-center justify-between py-3">
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noreferrer" className="group flex w-full items-center justify-between font-display font-bold tracking-tight text-bone transition-colors hover:text-signal">
                        {s.label}
                        <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                      </a>
                    ) : (
                      <>
                        <span className="font-display font-bold tracking-tight text-mist">{s.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-line">soon</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.3} className="w-full max-w-full box-border min-w-0 md:col-span-6 md:col-start-7">
            <div className="w-full max-w-full box-border overflow-hidden rounded-sm border border-line bg-coal/80 p-4 sm:p-7 backdrop-blur-sm md:p-10">
              <p className="label-mono mb-8">Or write here</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
