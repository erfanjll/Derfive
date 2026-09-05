import { cn } from "@/lib/cn";
import { aspectClass, type Aspect } from "@/lib/media";

interface MediaPlaceholderProps {
  kind: "video" | "image";
  label?: string; // e.g. "GAME", "ANIMATION"
  caption?: string; // e.g. "Media coming soon"
  index?: string; // small number in the corner
  aspect?: Aspect;
  className?: string;
  /** Renders without its own aspect box (used as a fill layer). */
  fill?: boolean;
}

/**
 * Designed empty state for media that hasn't been added yet.
 * Replaces itself automatically once a real file path exists in /content.
 */
export function MediaPlaceholder({ kind, label, caption = "Media coming soon", index, aspect = "16/9", className, fill }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${kind} placeholder${label ? ` — ${label}` : ""}: ${caption}`}
      className={cn(
        "dot-grid relative overflow-hidden rounded-sm border border-line bg-graphite",
        fill ? "absolute inset-0" : aspectClass[aspect],
        className,
      )}
    >
      <div className="scan-line" />
      <Corner className="left-3 top-3" />
      <Corner className="right-3 top-3 rotate-90" />
      <Corner className="bottom-3 right-3 rotate-180" />
      <Corner className="bottom-3 left-3 -rotate-90" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist">
          {kind === "video" ? (
            <svg viewBox="0 0 16 16" className="ml-0.5 h-4 w-4 fill-current"><path d="M4 2.5v11l9-5.5z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.2"><rect x="2" y="3" width="12" height="10" rx="1" /><path d="M2 11l4-4 3 3 2-2 3 3" /><circle cx="11" cy="6" r="1" /></svg>
          )}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone">
          {kind}
          {label ? <span className="text-mist"> / {label}</span> : null}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{caption}</span>
      </div>

      <span className="absolute bottom-3 left-8 font-mono text-[10px] uppercase tracking-[0.2em] text-line">Derfive</span>
      {index && <span className="absolute bottom-3 right-8 font-mono text-[10px] text-line">{index}</span>}
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("absolute h-3 w-3 border-l border-t border-mist/60", className)} />
  );
}
