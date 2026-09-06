"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { useLanguage } from "@/context/LanguageContext";
import { motto, persona, buttons } from "@/content/i18n";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-center gap-8 overflow-hidden px-4 sm:px-8 md:px-12 pt-28 pb-10">
      {/* هاله نوری پس‌زمینه — بدون لبه‌های چهارگوش */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-lime-400/10 blur-[140px] opacity-70" />

      {/* انیمیشن سه‌بعدی — با محو شدن نرم به‌جای پاپ‌این ناگهانی */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 0.8 }}
      >
        <HeroCanvas />
      </motion.div>

      <div className="flex flex-1 flex-col justify-center gap-8">
        {/* نوار اطلاعات بالای هیرو — دقیقاً سه آیتم با تراز یکسان */}
        <div className="w-full flex flex-row justify-between items-center text-[11px] md:text-xs font-mono tracking-wider border-b border-white/10 pb-4 gap-2">
          <span className="font-semibold text-white tracking-widest whitespace-nowrap">ERFAN JALALI</span>
          <span className="text-lime-400 font-mono tracking-widest whitespace-nowrap">{t(persona.studioBadge)}</span>
          <span className="hidden sm:inline text-zinc-400 whitespace-nowrap">{t(persona.university)}</span>
        </div>

        {/* معرفی + موتو */}
        <div className="max-w-xl space-y-3">
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed">
            {t(persona.bio)}
          </p>
          <p className="font-mono text-xs text-mist tracking-widest uppercase">{t(motto)}</p>
        </div>

        {/* عنوان اصلی DERFIVE — تک‌خط، بدون شکستگی */}
        <div className="select-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black tracking-tighter leading-none whitespace-nowrap text-white drop-shadow-sm">
            {site.brand.toUpperCase()}
          </h1>
        </div>

        {/* کلیدهای اقدام */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full bg-lime-400 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:bg-lime-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              {t(buttons.seeWork)} ↗
            </Link>
            <Link
              href="/journey"
              className="px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:border-lime-400 hover:text-lime-400 hover:scale-105 active:scale-95"
            >
              {t(buttons.myJourney)} ↗
            </Link>
          </div>

          <div className="hidden sm:block text-[11px] font-mono tracking-widest text-zinc-400 animate-pulse">
            {t(buttons.scrollToExplore)}
          </div>
        </div>
      </div>
    </section>
  );
}
