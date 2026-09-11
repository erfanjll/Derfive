import Link from "next/link";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  magnetic?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
}

/** Site button. Pass `href` for a link, or omit it for a real <button>. */
export function Button({ href, children, variant = "primary", size = "md", magnetic, className, type = "button", disabled, external }: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center gap-3 rounded-full font-mono uppercase tracking-[0.14em] transition-colors duration-300",
    "disabled:cursor-not-allowed disabled:opacity-50",
    size === "md" ? "px-5 py-3 text-xs" : "px-7 py-4 text-sm",
    variant === "primary" ? "bg-signal text-ink btn-sheen hover:bg-bone" : "border border-line text-bone hover:border-signal hover:text-signal",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="relative h-3 w-3 overflow-hidden">
        <Arrow className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:-translate-y-4" />
        <Arrow className="absolute inset-0 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  );

  const el = href ? (
    external ? (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>{inner}</a>
    ) : (
      <Link href={href} className={classes}>{inner}</Link>
    )
  ) : (
    <button type={type} disabled={disabled} className={classes}>{inner}</button>
  );

  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el;
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={cn("h-3 w-3", className)}>
      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
