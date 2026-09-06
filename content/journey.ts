/**
 * ============================================================
 *  JOURNEY / TIMELINE
 *  Real dates, in order. No arbitrary "years of experience"
 *  counters — just what happened and when.
 * ============================================================
 */

export interface JourneyStage {
  id: string;
  index: string;
  title: string;
  period: string;
  org?: string;
  body: string;
}

export const journey: JourneyStage[] = [
  {
    id: "inception",
    index: "01",
    title: "Game Development Foundations",
    period: "2021 — Grade 9 · Inception",
    org: "EMVP · with Mobin Kohi",
    body: "Began programming in C#, learned core engine mechanics, and co-founded the EMVP collaboration with Mobin Kohi.",
  },
  {
    id: "visual-synthesis",
    index: "02",
    title: "Motion Graphics & Digital Video",
    period: "2022 — Grade 10 · Visual Synthesis",
    body: "Expanded into After Effects, cinematic editing, and keyframe animation to bridge visual arts with code.",
  },
  {
    id: "engineering-grounding",
    index: "03",
    title: "Computer Engineering Grounding",
    period: "2025 — Freshman Year",
    org: "Shahid Beheshti University",
    body: "Admitted to SBU. Deepened technical mastery in data structures, concurrent programming, and object-oriented architecture.",
  },
  {
    id: "horizon",
    index: "04",
    title: "Production-Grade Synthesis",
    period: "Horizon — Present & Forward",
    body: "Developing scalable interactive game mechanics, richer audiovisual productions, and advancing technical art workflows.",
  },
];
