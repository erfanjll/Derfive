"use client";

import { useState } from "react";
import { getProjectsByCategory } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** Unity-inspired inspector tags painted under each workspace card. */
const INSPECTOR_TAGS = ["Transform", "BoxCollider2D", "CustomPostProcess", "Rigidbody2D", "PixelPerfectCamera"];

/**
 * Unity / Game Engine Workspace tab: the two primary game projects sit as
 * cinematic cards in a clean, symmetrical 2-column grid (with video preview
 * support built into <ProjectCard/>). The old in-grid HUD box is gone — engine
 * telemetry now lives in the fixed <EngineTelemetryPill/> pinned to the
 * bottom-right of the viewport, which also toggles the 1px dashed grid
 * wireframe overlay layered above the cards.
 */
export function EngineWorkspace() {
  const games = getProjectsByCategory("game");
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="mt-14 relative">
      {/* Project cards + wireframe overlay — clean symmetrical 2-column layout */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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

      {/* Floating Engine Telemetry Pill — pinned to the viewport, replaces the old in-grid HUD box */}
      <EngineTelemetryPill wireframe={wireframe} onToggleWireframe={() => setWireframe((v) => !v)} />
    </div>
  );
}

interface TelemetryPillProps {
  wireframe: boolean;
  onToggleWireframe: () => void;
}

function EngineTelemetryPill({ wireframe, onToggleWireframe }: TelemetryPillProps) {
  return (
    <button
      type="button"
      onClick={onToggleWireframe}
      aria-pressed={wireframe}
      title="Toggle wireframe / grid preview"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-xl bg-ink/80 border border-white/10 shadow-2xl font-mono text-[11px] tracking-wider text-muted hover:border-signal/50 transition-all cursor-default"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
      </span>
      <span className="uppercase">UNITY 2026 // C#</span>
      <span aria-hidden className="text-line">|</span>
      <span className="tabular-nums uppercase">60 FPS</span>
      <span aria-hidden className="text-line">|</span>
      <span className="uppercase hidden sm:inline">HLSL/URP</span>
      <span
        className={cn(
          "ml-1 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] transition-colors",
          wireframe ? "border-signal bg-signal text-ink" : "border-line text-mist",
        )}
      >
        Wireframe {wireframe ? "ON" : "OFF"}
      </span>
    </button>
  );
}