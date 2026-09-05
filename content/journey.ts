/**
 * ============================================================
 *  JOURNEY / TIMELINE
 *  Add real dates in `period` when you want to — until then the
 *  timeline stays relative on purpose.
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
    id: "games",
    index: "01",
    title: "Game Development",
    period: "4 years — ongoing",
    org: "EMVP · with Mobin Kohi",
    body: "The main quest. Four years of building games at EMVP together with Mobin Kohi — learning engines, scope, and how to actually finish things.",
  },
  {
    id: "creative",
    index: "02",
    title: "Creative Exploration",
    period: "Beginner — learning",
    body: "Editing and animation entered the picture as a side quest. Still early, still clumsy in places, and moving fast.",
  },
  {
    id: "study",
    index: "03",
    title: "Computer Science",
    period: "Semester 2 — current",
    org: "Shahid Beheshti University",
    body: "Formal ground under the practical work. Algorithms and theory during the day; the games benefit at night.",
  },
  {
    id: "next",
    index: "04",
    title: "Next",
    period: "Open",
    body: "More games, better tools, sharper motion. Details land here as they happen — nothing announced before it's real.",
  },
];
