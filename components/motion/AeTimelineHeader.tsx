"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const FPS = 24;
/** Start the running counter at 01:00:00:00 so the timecode is "inside" a comp. */
const START_FRAMES = 3600 * FPS;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toTimecode(total: number) {
  const f = total % FPS;
  const s = Math.floor(total / FPS) % 60;
  const m = Math.floor(total / (FPS * 60)) % 60;
  const h = Math.floor(total / (FPS * 3600)) % 24;
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

const NLE_TRACKS = [
  { track: "L01", name: "MOTION COMP", active: true },
  { track: "L02", name: "CAMERA RAMP", active: false },
  { track: "L03", name: "KEYFRAME CLEANUP", active: false },
  { track: "DUIK", name: "RIGGED", active: false },
];

/**
 * After Effects / Editorial header strip: a live-running timecode at 24.00 FPS,
 * the ProRes family pipeline readout, a ruler of timeline tick marks and
 * keyframe diamond accents (◇ ─── ◆ ─── ◇) — plus NLE-style layer tracks.
 */
export function AeTimelineHeader() {
  const [frames, setFrames] = useState(START_FRAMES);

  useEffect(() => {
    const id = window.setInterval(() => setFrames((f) => f + 1), 1000 / FPS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-label="After Effects editorial timeline header"
      className="mt-12 overflow-hidden rounded-sm border border-line bg-graphite/60 backdrop-blur-md"
    >
      {/* Telemetry strip */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line/60 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className="flex items-center gap-2 text-mist" aria-hidden>
          <span className="inline-block h-2 w-2 rotate-45 border border-line" />
          TC
        </span>
        <span aria-live="off" className="tabular-nums text-signal">[{toTimecode(frames)}]</span>
        <span className="text-mist">[24.00 FPS]</span>
        <span className="text-mist">[PRORES 4444 XQ]</span>
        <span className="text-mist">
          [RENDER: <span className="text-signal">READY</span>]
        </span>
      </div>

      {/* Timeline ruler ticks */}
      <div aria-hidden className="flex items-end justify-between px-4 pb-1 pt-2">
        {Array.from({ length: 33 }, (_, i) => {
          const major = i % 8 === 0;
          const minor = i % 4 === 0;
          return (
            <span
              key={i}
              className={cn(
                "w-px",
                major ? "h-4 bg-bone/50" : minor ? "h-2.5 bg-line" : "h-1.5 bg-line/50",
              )}
            />
          );
        })}
      </div>

      {/* Keyframe diamonds + NLE layer tracks */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line/60 px-4 pb-3.5 pt-2.5">
        <div aria-hidden className="flex items-center gap-2 font-mono text-[10px] text-mist">
          <span className="text-signal">◇</span>
          <span className="h-px w-8 bg-line" />
          <span className="text-signal">◆</span>
          <span className="h-px w-8 bg-line" />
          <span className="text-signal">◇</span>
          <span className="ml-1 inline-block h-2 w-2 rotate-45 border border-signal/60" />
          <span className="text-signal">KEYFRAME</span>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5" aria-label="NLE layer tracks">
          {NLE_TRACKS.map((t) => (
            <span
              key={t.name}
              className={cn(
                "flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em]",
                t.active ? "text-signal" : "text-mist/80",
              )}
            >
              <span aria-hidden className={cn("inline-block h-1.5 w-1.5 rounded-[1px]", t.active ? "bg-signal" : "bg-line")} />
              <span>{t.track}</span>
              <span className="opacity-70">//</span>
              <span>{t.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}