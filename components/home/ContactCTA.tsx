"use client";

import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { buttons } from "@/content/i18n";

export function ContactCTA() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden border-t border-line py-32 md:py-48" aria-labelledby="home-contact">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,245,66,0.09),transparent_60%)]" />
      <div className="wrap relative text-center">
        <p className="label-mono mb-8"><span className="text-signal">05</span> — Contact</p>
        <TextReveal as="h2" text="Let's make something." className="font-display text-[clamp(3rem,10vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-bone" />
        <span id="home-contact" className="sr-only">Contact</span>
        <Reveal delay={0.2} className="mx-auto mt-8 max-w-md">
          <p className="text-fog">{site.contact.availability}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button href="/contact" size="lg" magnetic>{t(buttons.sayHi)}</Button>
        </Reveal>
      </div>
    </section>
  );
}
