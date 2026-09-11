"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { useLanguage } from "@/context/LanguageContext";
import { motto, nav as navDict, footer as footerDict } from "@/content/i18n";

const navKeyByHref: Record<string, keyof typeof navDict> = {
  "/": "Home",
  "/about": "About",
  "/game-development": "Games",
  "/editing-animation": "Motion",
  "/projects": "Projects",
  "/journey": "Journey",
  "/contact": "Contact",
};

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-line bg-coal">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="label-mono mb-4">Erfan Jalali · {site.role}</p>
            <p className="font-display text-[clamp(3.5rem,10vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] outline-text select-none" data-latin>
              {site.brand.toUpperCase()}
            </p>
            <p className="mt-4 font-mono text-xs text-mist tracking-widest uppercase">{t(motto)}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label-mono mb-4">{t(footerDict.pages)}</p>
            <ul className="space-y-2">
              {[{ label: "Home", href: "/" }, ...site.nav, { label: "Contact", href: "/contact" }].map((l) => {
                const key = navKeyByHref[l.href];
                const label = key ? t(navDict[key]) : l.label;
                return (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-fog transition-colors hover:text-signal">
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label-mono mb-4">{t(footerDict.elsewhere)}</p>
            <ul className="space-y-2">
              {site.socials.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-sm text-fog transition-colors hover:text-signal">
                      {s.label} ↗
                    </a>
                  </li>
                ) : (
                  <li key={s.label} className="flex items-center gap-2 text-sm text-mist">
                    {s.label} <span className="font-mono text-[10px] uppercase tracking-widest text-line">{t(footerDict.soon)}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mist md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. {t(footerDict.builtNote)}</span>
          <span>{site.facts.studio} · {site.facts.university}</span>
          <a href="#top" className="hover:text-signal">
            {t(footerDict.backToTop)}
          </a>
        </div>
      </div>
    </footer>
  );
}
