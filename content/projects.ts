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
  // ---------- Game development (strictly 2 slots) ----------
  {
    title: "EMVP Core Project",
    slug: "emvp-core-project",
    category: "game",
    subCategory: "Co-op Indie Game",
    description:
      "Collaborative indie game focused on expressive movement mechanics, tight input response, and custom real-time physics interactions.",
    team: "Developed with Mobin Kohi (EMVP Team)",
    role: "Gameplay Programmer & Technical Artist",
    technologies: ["Unity", "C#", "2D Physics Systems"],
    featured: true,
    status: "in-progress",
    // video: "/videos/emvp-core-project.mp4",
    // poster: "/posters/emvp-core-project.jpg",
    // thumbnail: "/images/projects/emvp-core-project/cover.jpg",
  },
  {
    title: "SBU AP Architecture & Engine",
    slug: "sbu-ap-architecture-engine",
    category: "game",
    subCategory: "Advanced Programming (AP) Project",
    description:
      "Robust academic software engine implementing strict design patterns, concurrent state loops, and responsive UI components.",
    team: "Shahid Beheshti University (Computer Engineering)",
    role: "Lead Systems Architect & Logic Programmer",
    technologies: ["Java / C#", "OOP Architecture", "Multithreaded State Loops", "Custom UI"],
    featured: true,
    status: "in-progress",
    // video: "/videos/sbu-ap-architecture-engine.mp4",
    // poster: "/posters/sbu-ap-architecture-engine.jpg",
    // thumbnail: "/images/projects/sbu-ap-architecture-engine/cover.jpg",
  },

  // ---------- Motion & video showcase (strictly 4 slots) ----------
  {
    title: "2D Animation",
    slug: "micro-narrative-15s-short",
    category: "animation",
    subCategory: "2D Character Animation",
    description:
      "Stylized keyframe character animation focusing on comedic staging, secondary motion, and expressive timing.",
    featured: true,
    status: "placeholder",
    // video: "/videos/micro-narrative-15s-short.mp4",
    // poster: "/posters/micro-narrative-15s-short.jpg",
  },
  {
    title: "Music Equalizer",
    slug: "sonic-resonance-equalizer-kinetic-type",
    category: "animation",
    subCategory: "Audio Reactive & Kinetic Typography",
    description:
      "Dynamic music spectrum visualizer synchronized with high-energy typography and bass-reactive visual pulses.",
    featured: true,
    status: "placeholder",
    // video: "/videos/sonic-resonance-equalizer-kinetic-type.mp4",
    // poster: "/posters/sonic-resonance-equalizer-kinetic-type.jpg",
  },
  {
    title: "Rhythm Cut (Cinematic Edit)",
    slug: "rhythm-cut-cinematic-edit",
    category: "editing",
    subCategory: "Film Editing & Foley Sound",
    description:
      "High-tempo montage showcasing match cuts, pace control, immersive sound design, and atmospheric grading.",
    status: "placeholder",
    // video: "/videos/rhythm-cut-cinematic-edit.mp4",
    // poster: "/posters/rhythm-cut-cinematic-edit.jpg",
  },
  {
    title: "Identity Reveal (Logo Motion)",
    slug: "identity-reveal-logo-motion",
    category: "animation",
    subCategory: "3D & HUD Motion Graphics",
    description:
      "Futuristic brand sting integrating volumetric glow, holographic UI overlays, and particle disintegration.",
    status: "placeholder",
    // video: "/videos/identity-reveal-logo-motion.mp4",
    // poster: "/posters/identity-reveal-logo-motion.jpg",
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
