import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Erfan Jalali — Game Developer & CS Student",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-16 pt-32 pb-24 max-w-5xl mx-auto">
      {/* برچسب بخش */}
      <div className="text-xs font-mono text-lime-400 tracking-widest mb-6">
        01 — ABOUT
      </div>

      {/* عنوان خوانا و استاندارد */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-12">
        Game developer, second-semester computer science student, and a beginner at making things move.
      </h1>

      {/* بیوگرافی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 pt-10">
        <div className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
          Background
        </div>
        <div className="md:col-span-2 space-y-6 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
          <p>
            I focus on game development with Unity and C#, crafting responsive mechanics, clean game loops, and visual effects that bring virtual environments to life.
          </p>
          <p>
            Currently in my second semester of Computer Science at Shahid Beheshti University, balancing systems architecture, algorithmic problem solving, and interactive graphics.
          </p>
        </div>
      </div>

      {/* مهارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 mt-14 pt-10">
        <div className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
          Core Focus
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-2">
          {["Unity Engine", "C#", "Gameplay Systems", "2D Physics", "Motion Graphics", "VFX Compositing"].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* دکمه ارتباط */}
      <div className="mt-16 pt-8 border-t border-white/10 flex gap-4">
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-lime-400 text-black font-semibold text-xs tracking-wider uppercase transition hover:bg-lime-300"
        >
          Get in Touch ↗
        </Link>
      </div>
    </main>
  );
}