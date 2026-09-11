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
            {/* Brand wordmark — pure vector SVG geometry, NOT CSS -webkit-text-stroke.
                Same viewBox as a golden-era arcade cabinet: 700x120. Every letter is
                one continuous monoline <path>, so there are no glyph outlines to
                self-intersect. The R's leg springs from the bowl's outer wall and
                angles away down-right — it can never overlap or clip through the
                loop at any resolution. vector-effect keeps the stroke width crisp
                while the viewBox scales, and stroke-linejoin rounds every weld. */}
            <svg
              viewBox="0 0 700 120"
              role="img"
              aria-label={site.brand.toUpperCase()}
              className="block h-auto w-full select-none text-mist"
              fill="none"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinejoin="round"
              strokeLinecap="round"
              paintOrder="stroke fill"
              vectorEffect="non-scaling-stroke"
            >
              {/* D — stem + top bar + rounded bowl + bottom bar */}
              <path d="M 35.5 108 L 35.5 30 L 52.5 30 Q 98 30 98 54 Q 98 108 52 108 L 35.5 108 Z" />
              {/* E — stem doubling as the left edge, with top / mid / bottom bars */}
              <path d="M 196.5 30 L 149.5 30 L 149.5 108 L 196.5 108 M 149.5 69 L 188.5 69" />
              {/* R — stem + bowl, then the leg leaves the bowl outward */}
              <path d="M 247.5 108 L 247.5 30 L 264.5 30 Q 310 30 310 55 Q 310 108 264.5 108 L 247.5 108 M 304 90 L 316 108" />
              {/* F — stem with top / mid bars */}
              <path d="M 361.5 108 L 361.5 30 L 408.5 30 M 361.5 69 L 401.5 69" />
              {/* I — stem */}
              <path d="M 458 30 L 458 108" />
              {/* V — apex */}
              <path d="M 502 30 L 547 108 L 592 30" />
              {/* E — stem doubling as the left edge, with top / mid / bottom bars */}
              <path d="M 684.5 30 L 637.5 30 L 637.5 108 L 684.5 108 M 637.5 69 L 676.5 69" />
            </svg>
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
    </footer>
  );
}
