"use client";

import { useEffect, useState } from "react";
import { getProjectsByCategory } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** Unity-inspired inspector tags painted under each workspace card. */
const INSPECTOR_TAGS = ["Transform", "BoxCollider2D", "CustomPostProcess", "Rigidbody2D", "PixelPerfectCamera"];

/** Simulated engine telemetry (a live-ish readout for the HUD widget). */
const BASE_METRICS = [
  { label: "ENGINE", value: "UNITY 2026 / C#" },
  { label: "FPS", value: "60 [LOCKED]" },
  { label: "DRAW CALLS", value: "142" },
  { label: "VERTICES", value: "128.4K" },
  { label: "SHADERS", value: "HLSL/URP" },
] as const;

function drawCalls() {
  return String(138 + Math.floor(Math.random() * 9));
}
function vertices() {
  return (128.1 + Math.random() * 0.8).toFixed(1) + "K";
}

/**
 * Unity / Game Engine Workspace tab: the two primary game projects are pinned
 * on top as cinematic cards (with video preview support built into
 * <ProjectCard/>), flanked by a floating HUD diagnostic telemetry widget and
 * an interactive [WIREFRAME: OFF/ON] micro-switch that layers a 1px dashed
 * grid over the cards.
 */
export function EngineWorkspace() {
  const games = getProjectsByCategory("game");
  const [wireframe, setWireframe] = useState(false);
  const [draws, setDraws] = useState<string>(BASE_METRICS[2].value);
  const [verts, setVerts] = useState<string>(BASE_METRICS[3].value);

  // "Live" simulated metrics: nudge draw calls / vertices every few seconds.
  useEffect(() => {
    const id = window.setInterval(() => {
      setDraws(drawCalls());
      setVerts(vertices());
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const metrics = BASE_METRICS.map((m) =>
    m.label === "DRAW CALLS" ? { ...m, value: draws } : m.label === "VERTICES" ? { ...m, value: verts } : { ...m },
  );

  return (
    <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      {/* Project cards + wireframe overlay */}
      <div className="relative">
        {wireframe && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-sm border border-dashed border-signal/40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,245,66,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(200,245,66,0.16) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        )}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {games.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} index={i} size="large" />
              {/* Inspector tags — unity-style component chips */}
              <div className="mt-3 flex flex-wrap gap-1.5" aria-label={`${p.title} inspector components`}>
                {INSPECTOR_TAGS.slice(i === 0 ? 0 : 2, i === 0 ? 3 : 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[2px] border border-line bg-ink/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-mist"
                  >
                    ◈ {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* HUD Diagnostic Telemetry Widget */}
      <aside
        aria-label="Engine HUD telemetry"
        className="glow-border pointer-events-auto sticky top-[76px] z-30 rounded-sm border border-line bg-graphite/80 backdrop-blur-md lg:sticky lg:top-24"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line/60 px-4 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">HUD · Engine</p>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-signal">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-signal pulse-glow" />
            Live
          </span>
        </div>

        <dl className="space-y-1.5 px-4 py-3.5">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-baseline justify-between gap-3 font-mono text-[11px]">
              <dt className="text-mist">{m.label}</dt>
              <dd className="tabular-nums text-bone">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-line/60 px-4 py-3">
          <button
            type="button"
            onClick={() => setWireframe((v) => !v)}
            aria-pressed={wireframe}
            className={cn(
              "w-full rounded-sm border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
              wireframe
                ? "border-signal text-ink bg-signal"
                : "border-line text-mist hover:border-signal hover:text-signal",
            )}
          >
            [ WIREFRAME: {wireframe ? "ON" : "OFF"} ]
          </button>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-mist/70">
            Toggle · dashed grid overlay
          </p>
        </div>
      </aside>
    </div>
  );
}