"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-12 pt-28 pb-10">
      {/* هاله نوری پس‌زمینه */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[140px]" />
      
      {/* انیمیشن سه‌بعدی */}
      <div className="absolute inset-0 -z-10 opacity-35">
        <HeroCanvas />
      </div>

      {/* نوار اطلاعات بالای هیرو */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] md:text-xs font-mono tracking-wider text-zinc-400 border-b border-white/10 pb-4 gap-2">
        <span className="font-semibold text-white tracking-widest">ERFAN JALALI</span>
        <span className="text-lime-400 font-mono">EMVP • 2 YRS • WITH MOBIN KOHI</span>
        <span className="hidden md:inline text-zinc-500">SHAHID BEHESHTI UNIVERSITY</span>
      </div>

      {/* معرفی */}
      <div className="my-6 max-w-xl">
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed">
          Game developer. Second-semester computer science student. Beginner at making things move — and not shy about it.
        </p>
      </div>

      {/* عنوان اصلی DERFIVE با اندازه اصلاح‌شده */}
      <div className="my-auto py-4 select-none">
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] font-black tracking-tighter leading-none text-white drop-shadow-sm flex flex-col">
          <span>DER</span>
          <span className="-mt-2 sm:-mt-6 md:-mt-8 text-zinc-100">FIVE</span>
        </h1>
      </div>

      {/* کلیدهای اقدام */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-lime-400 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:bg-lime-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          >
            See the work ↗
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:border-lime-400 hover:text-lime-400 hover:scale-105 active:scale-95"
          >
            Who is Erfan ↗
          </Link>
        </div>

        <div className="hidden sm:block text-[11px] font-mono tracking-widest text-zinc-400 animate-pulse">
          SCROLL TO EXPLORE ↓
        </div>
      </div>
    </section>
  );
}