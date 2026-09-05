"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Nav() {
  const pathname = usePathname();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("derfive-theme");
    if (saved === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light");
    }
  }, []);

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

  const navLinks = [
    { label: "ABOUT", href: "/about" },
    { label: "GAMES", href: "/game-development" },
    { label: "MOTION", href: "/editing-animation" },
    { label: "PROJECTS", href: "/projects" },
    { label: "JOURNEY", href: "/journey" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-zinc-950/60 border-b border-white/10 flex items-center justify-between">
      {/* لوگو */}
      <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-wider text-sm hover:text-lime-400 transition">
        <span className="w-2.5 h-2.5 bg-lime-400 rotate-45 inline-block" />
        <span>Derfive</span>
      </Link>

      {/* لینک‌ها */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-widest text-zinc-400">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition hover:text-white ${pathname === link.href ? "text-lime-400 font-bold" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* کلید تم و تماس */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
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

        <Link
          href="/contact"
          className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono tracking-widest text-zinc-200 hover:border-lime-400 hover:text-lime-400 transition"
        >
          CONTACT
        </Link>
      </div>
    </header>
  );
}