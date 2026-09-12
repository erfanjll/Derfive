import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {

  return (
    <footer className="relative border-t border-line bg-coal">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="label-mono mb-4">Erfan Jalali · {site.role}</p>
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

      {/* Bottom showcase — centered 3-tier lockup: identity line, hollow
          DERFIVE wordmark (pure CSS stroke, no SVG miter artifacts), motto. */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center overflow-hidden">
        <p className="font-mono text-xs sm:text-sm tracking-widest text-muted uppercase mb-2">
          Erfan Jalali · Technical Artist &amp; Game Developer
        </p>
        <h2
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase select-none my-2 hover:[-webkit-text-stroke-color:var(--color-signal)] transition-all duration-300"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.25)",
            color: "transparent",
            fontFamily: "var(--font-syne-src), sans-serif",
          }}
        >
          DERFIVE
        </h2>
        <p className="font-mono text-[11px] sm:text-xs tracking-wider text-muted/70 mt-2">
          Built with bugs, fixed with love.
        </p>
      </div>
    </footer>
  );
}
