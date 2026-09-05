"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

const contactLink = { label: "Contact", href: "/contact" };

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock body scroll while it's open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div
        className={cn(
          "absolute inset-0 border-b transition-[opacity,background-color] duration-500",
          scrolled && !open ? "border-line/60 bg-ink/75 opacity-100 backdrop-blur-md" : "border-transparent opacity-0",
        )}
      />
      <nav aria-label="Main" className="wrap relative flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.brand} — home`}>
          <span className="h-2 w-2 rotate-45 bg-signal transition-transform duration-500 group-hover:rotate-[135deg]" />
          <span className="font-display text-lg font-bold tracking-tight">{site.brand}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-bone",
                  isActive(item.href) ? "text-bone" : "text-mist",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 h-px w-full bg-signal"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
            </li>
          ))}
          <li>
            <Link
              href={contactLink.href}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                isActive(contactLink.href)
                  ? "border-signal bg-signal text-ink"
                  : "border-line text-bone hover:border-signal hover:text-signal",
              )}
            >
              {contactLink.label}
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-[62] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span className="block h-px w-6 bg-bone" animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} />
          <motion.span className="block h-px w-6 bg-bone" animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[61] flex flex-col bg-ink px-6 pb-8 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <ul className="flex flex-col gap-2">
              {[{ label: "Home", href: "/" }, ...site.nav, contactLink].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE } }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-bold tracking-tight",
                      isActive(item.href) ? "text-signal" : "text-bone",
                    )}
                  >
                    <span className="font-mono text-xs text-mist">0{i}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex items-end justify-between">
              <p className="label-mono">
                {site.facts.studio} · {site.facts.years} yrs
                <br />
                {site.facts.university}
              </p>
              <span className="font-display text-sm font-bold">{site.brand}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
