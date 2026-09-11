"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageContext";

export function Nav() {
  const pathname = usePathname();
  // The language state stays here so the ENG/FA indicator can react — but UI
  // chrome itself is ALWAYS English (Rule 1 of the bilingual system).
  const { lang, toggleLang } = useLanguage();
  const [isLight, setIsLight] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Re-sync from localStorage AND the live <html> class (which a
    // pre-hydration bootstrap script may already have set). This keeps the
    // toggle state correct on mobile, where a full page load is common.
    const saved = localStorage.getItem("derfive-theme");
    const isCurrentlyLight = document.documentElement.classList.contains("light");
    const next = saved === "light" || isCurrentlyLight;
    document.documentElement.classList.toggle("light", next);
    setIsLight(next);
  }, []);

  // Lock body scroll and clear the flag if the user resizes past the mobile breakpoint.
  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", drawerOpen);
    return () => document.documentElement.classList.remove("nav-open");
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("derfive-theme", "dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("derfive-theme", "light");
      setIsLight(true);
    }
  };

  const navLinks = site.nav.map((l) => ({ label: l.label.toUpperCase(), href: l.href }));

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-zinc-950/60 border-b border-white/10 flex items-center justify-between">
      {/* لوگو */}
      <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-wider text-sm hover:text-lime-400 transition">
        <span className="w-2.5 h-2.5 bg-lime-400 rotate-45 inline-block" />
        <span>Derfive</span>
      </Link>

      {/* لینک‌های دسکتاپ — رنگ‌ها هرگز روی پس‌زمینه روشن سفید نمی‌شوند */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-widest">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-nav-link
            data-active={pathname === link.href}
            className={`transition-colors ${
              pathname === link.href
                ? "text-lime-600 dark:text-lime-400 font-bold"
                : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* کلید تم، کلید زبان، تماس (دسکتاپ) و همبرگر (موبایل) */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-zinc-300 hover:text-lime-400 hover:border-lime-400 transition"
        >
          {isLight ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>

        <button
          onClick={toggleLang}
          aria-label="Toggle language"
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-mono font-semibold tracking-wide text-zinc-300 hover:text-lime-400 hover:border-lime-400 transition"
        >
          {lang === "en" ? "ENG" : "FA"}
        </button>

        <Link
          href="/contact"
          className="hidden md:inline-flex px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono tracking-widest text-zinc-200 hover:border-lime-400 hover:text-lime-400 transition"
        >
          CONTACT
        </Link>

        <button
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav-drawer"
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full border border-white/20 text-zinc-200"
        >
          <motion.span
            animate={drawerOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-4 bg-current"
          />
          <motion.span
            animate={drawerOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[1.5px] w-4 bg-current"
          />
          <motion.span
            animate={drawerOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-4 bg-current"
          />
        </button>
      </div>

      {/* درور موبایل */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="md:hidden fixed inset-0 top-[64px] z-40 bg-ink/60 backdrop-blur-sm"
              aria-hidden
            />
            <motion.nav
              key="drawer"
              id="mobile-nav-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="md:hidden fixed right-0 top-[64px] z-50 flex h-[calc(100dvh-64px)] w-[min(85vw,340px)] flex-col justify-between overflow-y-auto border-l border-line bg-bg/95 px-6 py-8 text-ink backdrop-blur-2xl"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      data-nav-link
                      data-active={pathname === link.href}
                      className={`block py-3 font-mono text-lg tracking-widest transition-colors ${
                        pathname === link.href
                          ? "font-bold text-signal"
                          : "text-mist hover:text-bone"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between rounded-full border border-line px-4 py-3 text-xs font-mono tracking-widest text-bone transition-colors hover:border-signal hover:text-signal"
                >
                  Theme
                  <span className="text-signal">{isLight ? "Light" : "Dark"}</span>
                </button>
                <button
                  onClick={toggleLang}
                  className="flex items-center justify-between rounded-full border border-line px-4 py-3 text-xs font-mono tracking-widest text-bone transition-colors hover:border-signal hover:text-signal"
                >
                  Language
                  <span className="text-signal">{lang === "en" ? "ENG" : "FA"}</span>
                </button>
                <Link
                  href="/contact"
                  className="rounded-full bg-lime-400 px-4 py-3 text-center text-xs font-mono font-semibold uppercase tracking-widest text-black transition hover:bg-lime-300"
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
