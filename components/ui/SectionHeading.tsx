import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string; // "01"
  eyebrow: string; // small mono label
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "split";
  className?: string;
}

/** Numbered section heading used across pages for rhythm and consistency. */
export function SectionHeading({ index, eyebrow, title, description, as: Tag = "h2", align = "split", className }: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:gap-8", className)}>
      <Reveal className="md:col-span-3">
        <p className="label-mono flex items-center gap-3">
          <span className="text-signal">{index}</span>
          <span className="h-px w-8 bg-line" />
          {eyebrow}
        </p>
      </Reveal>
      <div className={cn(align === "split" ? "md:col-span-9" : "md:col-span-12")}>
        <Reveal delay={0.05}>
          <Tag className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-bone">
            {title}
          </Tag>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg">{description}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
