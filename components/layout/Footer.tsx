import Link from "next/link";
import { site } from "@/content/site";
import { motto } from "@/content/i18n";

export function Footer() {

  return (
    <footer className="relative border-t border-line bg-coal">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="label-mono mb-4">Erfan Jalali · {site.role}</p>
            <p className="mt-4 font-mono text-xs text-mist tracking-widest uppercase">{motto}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label-mono mb-4">Pages</p>
            <ul className="space-y-2">
              {[{ label: "Home", href: "/" }, ...site.nav, { label: "Contact", href: "/contact" }].map((l) => {
                return (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-fog transition-colors hover:text-signal">
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label-mono mb-4">Elsewhere</p>
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
                    {s.label} <span className="font-mono text-[10px] uppercase tracking-widest text-line">soon</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mist md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. Built, not templated.</span>
          <span>{site.facts.studio} · {site.facts.university}</span>
          <a href="#top" className="hover:text-signal">
            Back to top ↑
          </a>
        </div>
      </div>

      {/* Monumental hollow wordmark — edge-to-edge vector outline. The only fill
          is `fill="none"`: every letter is pure stroke, so the text is 100%
          hollow and reads as a gigantic architectural plate across the footer. */}
      <div aria-hidden className="px-2 pb-4 sm:px-4">
        <svg
          viewBox="0 0 1200 220"
          role="img"
          aria-label={site.brand.toUpperCase()}
          className="w-full h-auto select-none pointer-events-none overflow-visible text-white/20 hover:text-signal/40 transition-colors"
        >
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="font-extrabold tracking-tighter"
            style={{ fontFamily: 'var(--font-syne-src), sans-serif', fontSize: '180px', letterSpacing: '0.08em' }}
          >
            DERFIVE
          </text>
        </svg>
      </div>
    </footer>
  );
}
