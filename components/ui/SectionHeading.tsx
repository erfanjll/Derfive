import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";
import { TText } from "./TText";
import type { Bilingual } from "@/content/i18n";

interface SectionHeadingProps {
  index: string; // "01"
  eyebrow: string; // small mono label — ALWAYS English
  title: string; // ALWAYS English
  /** Long-form intro copy — translated in FA mode via <TText>. */
  description?: Bilingual;
  as?: "h1" | "h2";
  align?: "left" | "split";
  className?: string;
  /** Thematic font hooks (see .font-game / .font-motion in globals.css). */
  eyebrowClassName?: string;
  titleClassName?: string;
}

/** Numbered section heading used across pages for rhythm and consistency. */
export function SectionHeading({ index, eyebrow, title, description, as: Tag = "h2", align = "split", className, eyebrowClassName, titleClassName }: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:gap-8", className)}>
      <Reveal className="md:col-span-3">
        <p className={cn("label-mono flex items-center gap-3", eyebrowClassName)}>
          <span className="text-signal">{index}</span>
          <span className="h-px w-8 bg-[linear-gradient(90deg,var(--color-line),var(--color-signal))]" />
          {eyebrow}
        </p>
      </Reveal>
      <div className={cn(align === "split" ? "md:col-span-9" : "md:col-span-12")}>
        <Reveal delay={0.05}>
          <Tag className={cn("font-body text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-bone", titleClassName)}>
            {title}
          </Tag>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <TText
              en={description.en}
              fa={description.fa}
              className="mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg"
            />
          </Reveal>
        )}
      </div>
    </div>
  );
}
