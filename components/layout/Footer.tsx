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
            {/* Brand wordmark as real SVG outline text. The old CSS
                -webkit-text-stroke approach clipped/overlapped the leg of the
                "R"; a stroked <text> with strokeLinejoin="round" renders joins
                cleanly, and textLength + lengthAdjust keep it fluid at every
                viewport width (the SVG scales like a block element). */}
            {/* The wordmark is now pure geometry: every letter is ONE
                continuous monoline <path> — there are no glyph outlines, so
                the R's bowl and leg can never intersect (the old stroked
                <text> rendered Manrope's internal glyph contours, whose
                overlapping outlines glitched the R at any weight/zoom).
                Fully font-independent; viewBox 532x150. */}
            <svg
              viewBox="-4 0 532 150"
              role="img"
              aria-label={site.brand.toUpperCase()}
              className="block h-auto w-full select-none text-line"
              fill="none"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              {/* D — stem + top bar + right bowl + bottom bar, one loop */}
              <path d="M 5 120 V 30 H 45 Q 75 30 75 75 Q 75 120 45 120 H 5 Z" />
              {/* E — stem + top/mid/bottom bars */}
              <path d="M 154 30 H 99 V 120 H 154 M 99 75 H 144" />
              {/* R — stem + bowl + leg: the leg springs from the bowl's
                     underside and angles away, never crossing it */}
              <path d="M 183 120 V 30 M 183 30 H 218 Q 243 30 243 52.5 Q 243 75 218 75 H 183 M 216 75 L 243 120" />
              {/* F */}
              <path d="M 267 120 V 30 H 322 M 267 75 H 312" />
              {/* I */}
              <path d="M 346 30 V 120" />
              {/* V */}
              <path d="M 380 30 L 410 120 L 440 30" />
              {/* E */}
              <path d="M 519 30 H 464 V 120 H 519 M 464 75 H 509" />
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
