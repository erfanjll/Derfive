/**
 * ============================================================
 *  PROJECTS
 *  Every project on the site lives in this one list.
 *
 *  TO ADD A PROJECT: copy one of the blocks below, paste it into
 *  the list, and change the values. The `slug` must be unique.
 *
 *  TO ADD MEDIA: put the file in /public/videos or /public/images,
 *  then write its path, e.g.  video: "/videos/my-game.mp4"
 *
 *  Projects marked  status: "placeholder"  show a "PLACEHOLDER" tag.
 *  Change the status once the project is real.
 * ============================================================
 */

import type { Project, ProjectCategory } from "./types";

export const categoryLabels: Record<ProjectCategory, string> = {
  game: "Game",
  animation: "Animation",
  editing: "Editing",
  experiment: "Experiment",
};

export const projects: Project[] = [
  {
    title: "Untitled Game Project 01",
    slug: "game-project-01",
    category: "game",
    description: "Placeholder slot for a game built at EMVP. Replace this text with the real project.",
    year: "—",
    role: "Add your role",
    technologies: [],
    featured: true,
    status: "placeholder",
    // video: "/videos/game-project-01.mp4",
    // poster: "/posters/game-project-01.jpg",
    // thumbnail: "/images/projects/game-project-01/cover.jpg",
  },
  {
    title: "Untitled Game Project 02",
    slug: "game-project-02",
    category: "game",
    description: "Placeholder slot for a second game. Title, year, role and media go here.",
    year: "—",
    status: "placeholder",
  },
  {
    title: "Animation Experiment 01",
    slug: "animation-experiment-01",
    category: "animation",
    description: "Placeholder slot for a short animation study. Beginner work, shown honestly.",
    year: "—",
    status: "placeholder",
  },
  {
    title: "Edit Reel 01",
    slug: "edit-reel-01",
    category: "editing",
    description: "Placeholder slot for an editing piece — a cut, a montage, a trailer.",
    year: "—",
    status: "placeholder",
  },
  {
    title: "Prototype 01",
    slug: "prototype-01",
    category: "experiment",
    description: "Placeholder slot for a small experiment that didn't fit anywhere else.",
    year: "—",
    featured: true,
    status: "placeholder",
  },
];

/* ---------- helpers (no need to edit) ---------- */

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectsByCategory = (...categories: ProjectCategory[]) =>
  projects.filter((p) => categories.includes(p.category));

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return projects[(i + 1) % projects.length];
};
