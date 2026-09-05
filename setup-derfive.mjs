#!/usr/bin/env node
/**
 * setup-derfive.mjs
 * Creates the complete Derfive portfolio project in the current folder.
 *
 *   1. mkdir derfive && cd derfive
 *   2. save this file here
 *   3. node setup-derfive.mjs
 *   4. npm install
 *   5. npm run dev   →  http://localhost:3000
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

// ---------------------------------------------------------------------------
// Every file lives in this one payload. A line starting with "//// FILE: "
// begins a new file. Inside the payload, backticks are written as \` and
// "${" is written as \${ — both are restored when writing.
// ---------------------------------------------------------------------------
const payload = String.raw`
//// FILE: package.json
{
  "name": "derfive",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@react-three/fiber": "^9.1.2",
    "motion": "^12.9.2",
    "next": "^15.3.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "three": "^0.176.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.1",
    "@tailwindcss/postcss": "^4.1.5",
    "@types/node": "^22.15.3",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@types/three": "^0.176.0",
    "eslint": "^9.25.1",
    "eslint-config-next": "^15.3.1",
    "tailwindcss": "^4.1.5",
    "typescript": "^5.8.3"
  }
}
//// FILE: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships modern ESM; this keeps it happy in the Next build.
  transpilePackages: ["three"],
};

export default nextConfig;
//// FILE: tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
//// FILE: postcss.config.mjs
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
//// FILE: eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [...compat.extends("next/core-web-vitals", "next/typescript")];
//// FILE: .env.example
# Public URL of the deployed site (used for SEO / social previews). Replace after deploying.
NEXT_PUBLIC_SITE_URL=https://derfive.example.com

# Optional: a webhook/form service URL (Formspree, Make, n8n, your own API...).
# Leave empty until you have one — the site will tell visitors the form isn't connected yet.
CONTACT_WEBHOOK_URL=
//// FILE: .gitignore
node_modules
.next
out
.env
.env.local
.DS_Store
*.tsbuildinfo
next-env.d.ts
//// FILE: content/types.ts
/**
 * Shared data shapes. You normally don't need to touch this file —
 * it just describes what a project can contain.
 */

export type ProjectCategory = "game" | "animation" | "editing" | "experiment";

export type ProjectStatus =
  | "placeholder" // not a real project yet, just a slot
  | "prototype"
  | "in-progress"
  | "released"
  | "archived";

export interface ProjectLink {
  label: string; // e.g. "Play on itch.io"
  href: string; // full URL
}

export interface Project {
  /** Shown everywhere. Required. */
  title: string;
  /** Used in the URL: /projects/your-slug. Lowercase, dashes, no spaces. Required. */
  slug: string;
  /** Required. */
  category: ProjectCategory;
  /** One or two sentences. Required. */
  description: string;

  /** Everything below is optional. Delete the line or leave it out if you don't have it. */
  longDescription?: string;
  year?: string;
  role?: string;
  technologies?: string[];
  featured?: boolean; // featured projects appear on the homepage and larger in the grid
  thumbnail?: string; // "/images/projects/my-game/cover.jpg"
  gallery?: string[]; // ["/images/projects/my-game/1.jpg", "..."]
  video?: string; // "/videos/my-game.mp4"
  poster?: string; // "/posters/my-game.jpg" (still image shown before the video plays)
  links?: ProjectLink[];
  status?: ProjectStatus;
}
//// FILE: content/site.ts
/**
 * ============================================================
 *  SITE-WIDE TEXT & SETTINGS
 *  Name, tagline, navigation, contact info and social links.
 * ============================================================
 */

export const site = {
  name: "Erfan Jalali",
  brand: "Derfive",
  role: "Game Developer",

  // Used in the browser tab and search results.
  description:
    "Derfive is the personal portfolio of Erfan Jalali — a game developer with four years at EMVP alongside Mobin Kohi, currently studying computer science at Shahid Beheshti University.",

  // Replace via the NEXT_PUBLIC_SITE_URL environment variable after deploying.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://derfive.example.com",

  // Facts that appear across the site. Keep them accurate.
  facts: {
    years: "4",
    studio: "EMVP",
    partner: "Mobin Kohi",
    university: "Shahid Beheshti University",
    program: "Computer Science / Computer Engineering",
    semester: "Semester 2",
  },

  // Main navigation (desktop + mobile). "Contact" is added automatically as the last item.
  nav: [
    { label: "About", href: "/about" },
    { label: "Games", href: "/game-development" },
    { label: "Motion", href: "/editing-animation" },
    { label: "Projects", href: "/projects" },
    { label: "Journey", href: "/journey" },
  ],

  contact: {
    // ▼ Put your real email between the quotes when you're ready, e.g. "hello@derfive.com"
    email: "",
    availability:
      "Open to collaborations, game jams, and any interesting conversation about games or motion.",
  },

  // ▼ Paste the full link (starting with https://) between the quotes.
  //   Empty links are shown as "coming soon" and are not clickable.
  socials: [
    { label: "GitHub", href: "" },
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Discord", href: "" },
  ],
};

export type SiteConfig = typeof site;
//// FILE: content/about.ts
/**
 * ============================================================
 *  ABOUT PAGE TEXT
 * ============================================================
 */

export const about = {
  intro:
    "Game developer, second-semester computer science student, and a beginner at making things move on a timeline.",

  paragraphs: [
    "I'm Erfan Jalali. For the past four years I've been building games at EMVP together with Mobin Kohi — long enough to learn that the interesting part of a game is rarely the first idea, and almost always the fiftieth iteration of it.",
    "Right now I'm also a computer science student at Shahid Beheshti University, in my second semester. Lectures in the morning, engines at night. The two feed each other more than I expected.",
    "On the side I'm learning editing and animation. I'm a beginner at both and I'd rather say that out loud than pretend otherwise — it's the part of my work that's changing the fastest.",
  ],

  facts: [
    { label: "Name", value: "Erfan Jalali" },
    { label: "Brand", value: "Derfive" },
    { label: "Field", value: "Game Development" },
    { label: "Studio", value: "EMVP · with Mobin Kohi" },
    { label: "Experience", value: "4 years" },
    { label: "University", value: "Shahid Beheshti University" },
    { label: "Status", value: "Computer science, semester 2" },
    { label: "Also", value: "Editing & Animation (beginner)" },
  ],

  skills: [
    {
      id: "games",
      title: "Game Development",
      level: "Main focus",
      meter: "04",
      meterLabel: "years",
      detail: "Four years at EMVP with Mobin Kohi. Building, breaking, and rebuilding games.",
    },
    {
      id: "motion",
      title: "Editing & Animation",
      level: "Beginner",
      meter: "LV1",
      meterLabel: "and climbing",
      detail: "Cuts, timing, simple motion. Learning in public and improving steadily.",
    },
    {
      id: "cs",
      title: "Computer Science",
      level: "In progress",
      meter: "S2",
      meterLabel: "semester",
      detail: "Second semester at Shahid Beheshti University.",
    },
  ],

  principles: [
    { title: "Prototype ugly, fast.", body: "A playable mess teaches more than a beautiful document." },
    { title: "Finish things.", body: "Small and done beats big and imaginary." },
    { title: "Keep the weird parts.", body: "The strange idea is usually the one worth protecting." },
  ],
};
//// FILE: content/projects.ts
/**
 * ============================================================
 *  PROJECTS
 *  Every project on the site lives in this one list.
 *
 *  TO ADD A PROJECT: copy one of the blocks below, paste it into
 *  the list, and change the values. The \`slug\` must be unique.
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
//// FILE: content/journey.ts
/**
 * ============================================================
 *  JOURNEY / TIMELINE
 *  Add real dates in \`period\` when you want to — until then the
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
//// FILE: content/media.ts
/**
 * ============================================================
 *  MEDIA REGISTRY
 *  Every video/image slot on the site (outside of projects) is here.
 *
 *  HOW TO ADD A VIDEO:
 *   1. Copy your file into  /public/videos/   (e.g. game-demo.mp4)
 *   2. Write the path below:  src: "/videos/game-demo.mp4"
 *   3. (Optional) add a still image to /public/posters/ and set  poster: "/posters/game-demo.jpg"
 *
 *  An empty  src: ""  shows a designed placeholder instead of a broken player.
 *  Use .mp4 (H.264) for the widest browser support.
 * ============================================================
 */

export interface VideoAsset {
  src: string;
  poster?: string;
  title: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export const media = {
  videos: {
    gameDemo: {
      src: "", // e.g. "/videos/game-demo.mp4"
      poster: "", // e.g. "/posters/game-demo.jpg"
      title: "Game development demo",
    },
    animationDemo: {
      src: "", // e.g. "/videos/animation-demo.mp4"
      poster: "",
      title: "Animation demo",
    },
    editingDemo: {
      src: "", // e.g. "/videos/editing-demo.mp4"
      poster: "",
      title: "Editing demo",
    },
    motionExtra01: { src: "", poster: "", title: "Motion piece 01" },
    motionExtra02: { src: "", poster: "", title: "Motion piece 02" },
  } satisfies Record<string, VideoAsset>,

  images: {
    portrait: { src: "", alt: "Portrait of Erfan Jalali" }, // e.g. "/images/portrait.jpg"
    gameScreens: [
      { src: "", alt: "Game screenshot 1" },
      { src: "", alt: "Game screenshot 2" },
      { src: "", alt: "Game screenshot 3" },
      { src: "", alt: "Game screenshot 4" },
    ] satisfies ImageAsset[],
    before: { src: "", alt: "Before editing" },
    after: { src: "", alt: "After editing" },
  },
};
//// FILE: lib/cn.ts
/** Joins class names and drops falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
//// FILE: lib/metadata.ts
import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // e.g. "/about"
}

/** Builds consistent title / description / canonical / social metadata for a page. */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = \`\${title} — \${site.brand}\`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      siteName: site.brand,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
//// FILE: lib/motion.ts
/** One easing family for the whole site keeps motion feeling consistent. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (delay = 0.08, start = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: start } },
});
//// FILE: lib/media.ts
/** Aspect-ratio presets used by videos, images and placeholders. */
export type Aspect = "16/9" | "16/10" | "21/9" | "4/5" | "9/16" | "1/1";

export const aspectClass: Record<Aspect, string> = {
  "16/9": "aspect-video",
  "16/10": "aspect-[16/10]",
  "21/9": "aspect-[21/9]",
  "4/5": "aspect-[4/5]",
  "9/16": "aspect-[9/16]",
  "1/1": "aspect-square",
};
//// FILE: hooks/useMediaQuery.ts
"use client";

import { useEffect, useState } from "react";

/** Returns true when the CSS media query matches. Always false on the server. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export const useIsFinePointer = () => useMediaQuery("(pointer: fine)");
//// FILE: hooks/useSiteReady.ts
"use client";

import { useEffect, useState } from "react";

export const SITE_READY_EVENT = "derfive:ready";

/**
 * True once the preloader has finished (or was skipped).
 * Lets the hero wait with its entrance animation instead of playing it behind the loader.
 */
export function useSiteReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.ready === "true") {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener(SITE_READY_EVENT, onReady);
    return () => window.removeEventListener(SITE_READY_EVENT, onReady);
  }, []);

  return ready;
}
//// FILE: app/globals.css
@import "tailwindcss";

/* ---------- Design tokens ---------- */
@theme {
  --color-ink: #050505;
  --color-coal: #0b0b0c;
  --color-graphite: #141416;
  --color-ash: #1e1e21;
  --color-line: #2a2a2f;
  --color-mist: #8b8b94;
  --color-fog: #b8b8bf;
  --color-bone: #ecece8;
  --color-signal: #c8f542;
  --color-signal-dim: #86a82a;

  --font-display: var(--font-syne), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, "SF Mono", Menlo, monospace;

  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
}

/* ---------- Base ---------- */
html {
  background: var(--color-ink);
  color: var(--color-bone);
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  min-height: 100dvh;
  overflow-x: clip;
  font-feature-settings: "ss01", "cv11";
}

::selection {
  background: var(--color-signal);
  color: var(--color-ink);
}

:focus-visible {
  outline: 2px solid var(--color-signal);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Custom cursor: only applied by JS on devices with a real mouse. */
html[data-cursor="custom"],
html[data-cursor="custom"] a,
html[data-cursor="custom"] button,
html[data-cursor="custom"] input,
html[data-cursor="custom"] textarea {
  cursor: none;
}

/* Film grain – one fixed layer, very low opacity. */
.grain::before {
  content: "";
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 70;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}

/* ---------- Reusable utilities ---------- */
@utility wrap {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 4vw, 4rem);
}

@utility label-mono {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-mist);
}

@utility dot-grid {
  background-image: radial-gradient(var(--color-line) 1px, transparent 1px);
  background-size: 22px 22px;
}

@utility outline-text {
  color: transparent;
  -webkit-text-stroke: 1px var(--color-line);
}

/* Slow scanning line used inside media placeholders. */
.scan-line {
  position: absolute;
  inset-inline: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-signal), transparent);
  opacity: 0.35;
  animation: scan 7s linear infinite;
}
@keyframes scan {
  from { top: -2%; }
  to { top: 102%; }
}

.blink {
  animation: blink 1.6s steps(2, start) infinite;
}
@keyframes blink {
  to { visibility: hidden; }
}

.spin-slow {
  animation: spin 1.1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .scan-line, .blink { animation: none; }
  .grain::before { display: none; }
}
//// FILE: app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Syne, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Providers } from "@/components/layout/Providers";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const syne = Syne({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-syne", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: \`\${site.brand} — \${site.name}\`, template: \`%s — \${site.brand}\` },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: ["Erfan Jalali", "Derfive", "game developer", "EMVP", "Shahid Beheshti University", "portfolio"],
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: \`\${site.brand} — \${site.name}\`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: \`\${site.brand} — \${site.name}\`, description: site.description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(syne.variable, manrope.variable, jetbrains.variable, "grain")}>
      <body id="top" className="bg-ink text-bone antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink focus:font-mono focus:text-xs"
          >
            Skip to content
          </a>
          <Preloader />
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
//// FILE: app/template.tsx
import { PageTransition } from "@/components/layout/PageTransition";

/** Runs on every navigation — wraps each page in the dark wipe transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
//// FILE: app/page.tsx
import { Hero } from "@/components/home/Hero";
import { IntroStatement } from "@/components/home/IntroStatement";
import { GameSection } from "@/components/home/GameSection";
import { MotionSection } from "@/components/home/MotionSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { JourneyPreview } from "@/components/home/JourneyPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

/** Homepage: intro → curiosity → games → motion → projects → journey → contact. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <GameSection />
      <MotionSection />
      <FeaturedProjects />
      <JourneyPreview />
      <ContactCTA />
    </>
  );
}
//// FILE: app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-center py-32">
      <p className="label-mono mb-6">
        <span className="text-signal">404</span> — Level not found
      </p>
      <h1 className="font-display text-[clamp(3rem,12vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-bone">
        Nothing
        <br />
        <span className="outline-text">here.</span>
      </h1>
      <p className="mt-8 max-w-md text-fog">This page doesn't exist — or hasn't been built yet. Either way, the way back is below.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/" magnetic>Back home</Button>
        <Link href="/projects" className="self-center font-mono text-xs uppercase tracking-[0.16em] text-mist hover:text-signal">
          or see the projects
        </Link>
      </div>
    </section>
  );
}
//// FILE: app/icon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#050505"/>
  <rect x="20" y="20" width="24" height="24" transform="rotate(45 32 32)" fill="#c8f542"/>
  <rect x="27" y="27" width="10" height="10" transform="rotate(45 32 32)" fill="#050505"/>
</svg>
//// FILE: app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = \`\${site.brand} — \${site.name}\`;

/** Social preview card, generated at build time. No image file to maintain. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050505",
          color: "#ecece8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#8b8b94" }}>
          <span>{site.name.toUpperCase()}</span>
          <span>{site.role.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ fontSize: 200, fontWeight: 800, letterSpacing: -12, lineHeight: 0.85 }}>{site.brand.toUpperCase()}</div>
          <div style={{ width: 56, height: 56, background: "#c8f542", transform: "rotate(45deg)", marginBottom: 24 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#8b8b94" }}>
          <span>{site.facts.studio.toUpperCase()} · {site.facts.years} YRS</span>
          <span>{site.facts.university.toUpperCase()}</span>
        </div>
      </div>
    ),
    size,
  );
}
//// FILE: app/sitemap.ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/game-development", "/editing-animation", "/projects", "/journey", "/contact"];
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: \`\${site.url}\${p}\`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: \`\${site.url}/projects/\${p.slug}\`, lastModified: now, priority: 0.5 })),
  ];
}
//// FILE: app/robots.ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: \`\${site.url}/sitemap.xml\`,
  };
}
//// FILE: app/api/contact/route.ts
import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 * Forwards submissions to CONTACT_WEBHOOK_URL (Formspree, Make, n8n, your own server…).
 * If that variable isn't set, it replies 503 so the form can explain itself.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "");

  // Bots fill the hidden field — pretend it worked and drop it.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message || message.length > 5000 || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message, source: "derfive-contact-form" }),
    });
    if (!res.ok) throw new Error(\`Webhook responded \${res.status}\`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] forwarding failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
//// FILE: app/about/page.tsx
import { pageMeta } from "@/lib/metadata";
import { about } from "@/content/about";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaImage } from "@/components/media/MediaImage";
import { Button } from "@/components/ui/Button";

export const metadata = pageMeta({
  title: "About",
  description: \`About Erfan Jalali — game developer at EMVP with Mobin Kohi, computer science student at \${site.facts.university}, and a beginner in editing and animation.\`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Opening statement */}
      <section className="wrap pb-20 pt-32 md:pb-28 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">01</span> — About
        </p>
        <TextReveal
          as="h1"
          immediate
          text={about.intro}
          className="font-display text-[clamp(2.4rem,6.5vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-bone"
        />
      </section>

      {/* Portrait + story */}
      <section className="wrap grid gap-12 pb-24 md:grid-cols-12 md:pb-36" aria-label="Introduction">
        <Reveal className="md:col-span-5">
          <MediaImage {...media.images.portrait} aspect="4/5" label="portrait" priority sizes="(max-width: 768px) 100vw, 40vw" />
        </Reveal>
        <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-8">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} as="p" className={i === 0 ? "text-xl leading-relaxed text-bone md:text-2xl" : "text-base leading-relaxed text-fog md:text-lg"}>
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="border-y border-line bg-coal py-20 md:py-28" aria-labelledby="facts-title">
        <div className="wrap">
          <h2 id="facts-title" className="label-mono mb-10">Spec sheet</h2>
          <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.04} className="bg-coal p-6">
                <dt className="label-mono">{f.label}</dt>
                <dd className="mt-3 font-display text-lg font-bold tracking-tight text-bone">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Skills */}
      <section className="wrap py-24 md:py-36" aria-labelledby="skills-title">
        <SectionHeading index="02" eyebrow="Skills" title="What I actually do — and how far along I am." />
        <span id="skills-title" className="sr-only">Skills</span>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {about.skills.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className="group flex flex-col justify-between rounded-sm border border-line bg-graphite p-7 transition-colors hover:border-mist">
              <div className="flex items-start justify-between gap-4">
                <p className="label-mono">{s.level}</p>
                <span className="h-2 w-2 rotate-45 bg-line transition-colors group-hover:bg-signal" />
              </div>
              <p className="mt-10 font-display text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.05em] text-bone">
                {s.meter}
                <span className="ml-2 align-top font-mono text-xs font-normal tracking-normal text-signal">{s.meterLabel}</span>
              </p>
              <h3 className="mt-8 font-display text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="principles-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="How I work" title="Three rules I keep breaking and coming back to." />
          <span id="principles-title" className="sr-only">Principles</span>
          <ol className="mt-16 divide-y divide-line border-y border-line">
            {about.principles.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.06} className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <span className="font-mono text-xs text-signal md:col-span-1">0{i + 1}</span>
                <h3 className="font-display text-2xl font-bold tracking-tight md:col-span-5 md:text-3xl">{p.title}</h3>
                <p className="text-fog md:col-span-6">{p.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14 flex flex-wrap gap-4">
            <Button href="/game-development" magnetic>See the games</Button>
            <Button href="/journey" variant="ghost">The journey</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
//// FILE: app/game-development/page.tsx
import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { media } from "@/content/media";
import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { MediaImage } from "@/components/media/MediaImage";
import { ExperienceMeter } from "@/components/game/ExperienceMeter";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata = pageMeta({
  title: "Game Development",
  description: \`Four years of game development at \${site.facts.studio} together with \${site.facts.partner}. Games, footage and experiments by Erfan Jalali.\`,
  path: "/game-development",
});

// Asymmetric layout for the four screenshot slots.
const screenLayout = ["md:col-span-7", "md:col-span-5 md:mt-16", "md:col-span-5", "md:col-span-7 md:-mt-16"];

export default function GameDevelopmentPage() {
  const games = getProjectsByCategory("game");

  return (
    <>
      {/* Header */}
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">02</span> — Game development
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Games are the main quest."
          className="font-display text-[clamp(3rem,10vw,10rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-bone"
        />
        <Reveal delay={0.3} className="mt-10 max-w-2xl">
          <p className="text-lg leading-relaxed text-fog md:text-xl">
            {site.facts.years} years at {site.facts.studio}, together with {site.facts.partner}. This page is where the games live —
            titles, roles, tools and footage land here as they become ready to show.
          </p>
        </Reveal>
      </section>

      {/* Experience */}
      <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="exp-title">
        <div className="wrap">
          <SectionHeading index="01" eyebrow="Experience" title="Four years, one studio, one collaborator." />
          <span id="exp-title" className="sr-only">Experience</span>
          <div className="mt-16 grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <ExperienceMeter />
            </Reveal>
            <div className="grid gap-6 md:col-span-7">
              <Reveal delay={0.1} className="rounded-sm border border-line bg-graphite p-7 md:p-9">
                <p className="label-mono">The studio</p>
                <h3 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">{site.facts.studio}</h3>
                <p className="mt-5 max-w-md text-fog">
                  Where the last {site.facts.years} years of making games happened. Specific titles and responsibilities will be listed
                  here as they're added.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="rounded-sm border border-line bg-graphite p-7 md:p-9">
                <p className="label-mono">The collaboration</p>
                <h3 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
                  with <span className="text-signal">{site.facts.partner}</span>
                </h3>
                <p className="mt-5 max-w-md text-fog">
                  Building games together for four years. A long two-person collaboration is its own kind of education — in
                  scope, in disagreement, and in actually finishing.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footage */}
      <section className="wrap py-24 md:py-36" aria-labelledby="footage-title">
        <SectionHeading index="02" eyebrow="Footage" title="Gameplay." description="One clip, full width. Replace it in content/media.ts under videos.gameDemo." />
        <span id="footage-title" className="sr-only">Gameplay footage</span>
        <Reveal className="mt-14">
          <VideoPlayer {...media.videos.gameDemo} aspect="21/9" label="game / demo" index="01" className="max-md:aspect-video" />
        </Reveal>
      </section>

      {/* Screens */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="screens-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="Screens" title="Stills from the work." />
          <span id="screens-title" className="sr-only">Screenshots</span>
          <div className="mt-14 grid gap-6 md:grid-cols-12 md:gap-8">
            {media.images.gameScreens.map((img, i) => (
              <Reveal key={i} delay={i * 0.06} className={screenLayout[i] ?? "md:col-span-6"}>
                <MediaImage {...img} label="game" index={\`0\${i + 1}\`} aspect="16/10" hoverZoom />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Game projects */}
      <section className="wrap py-24 md:py-36" aria-labelledby="games-title">
        <SectionHeading index="04" eyebrow="Game projects" title="The games." description="Every entry here is edited in content/projects.ts. Placeholder slots are marked until a real project replaces them." />
        <span id="games-title" className="sr-only">Game projects</span>
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
          {games.map((p, i) => (
            <div key={p.slug} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-20"}>
              <ProjectCard project={p} index={i} size={i % 2 === 0 ? "large" : "regular"} />
            </div>
          ))}
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-line py-24 md:py-36" aria-labelledby="next-title">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-mono"><span className="text-signal">05</span> — Next</p>
          </div>
          <div className="md:col-span-8">
            <h2 id="next-title" className="font-display text-3xl font-bold tracking-tight md:text-5xl">Still building.</h2>
            <p className="mt-6 max-w-xl text-fog">
              New games and prototypes get added as they're playable — not before. If you want to talk about any of it, the door is open.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/projects" magnetic>All projects</Button>
              <Button href="/contact" variant="ghost">Get in touch</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
//// FILE: app/editing-animation/page.tsx
import { pageMeta } from "@/lib/metadata";
import { media } from "@/content/media";
import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { BeforeAfter } from "@/components/media/BeforeAfter";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata = pageMeta({
  title: "Editing & Animation",
  description: "Beginner-level editing and animation work by Erfan Jalali — shown honestly, improving on purpose.",
  path: "/editing-animation",
});

const approach = [
  { title: "Study the cut", body: "Watch something good, slow it down, work out why the timing feels right." },
  { title: "Rebuild it small", body: "Recreate one idea at a time instead of chasing a finished piece." },
  { title: "Ship the rough version", body: "Post it, look at it a week later, do it again better." },
];

export default function EditingAnimationPage() {
  const related = getProjectsByCategory("animation", "editing");

  return (
    <>
      {/* Header */}
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">03</span> — Editing & animation
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Side quest. Beginner level."
          className="font-display text-[clamp(2.8rem,9vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-bone"
        />
        <Reveal delay={0.3} className="mt-10 grid gap-8 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-fog md:col-span-7 md:text-xl">
            I'm early in editing and animation and this page says so on purpose. It's the part of my work that changes fastest —
            so rather than wait until it's polished, it goes up as it improves.
          </p>
          <div className="md:col-span-4 md:col-start-9">
            <dl className="grid grid-cols-2 gap-4 border-l border-line pl-6">
              <div><dt className="label-mono">Editing</dt><dd className="mt-1 font-display font-bold">Beginner</dd></div>
              <div><dt className="label-mono">Animation</dt><dd className="mt-1 font-display font-bold">Beginner</dd></div>
              <div className="col-span-2"><dt className="label-mono">Direction</dt><dd className="mt-1 font-display font-bold text-signal">Improving</dd></div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* Showcase grid */}
      <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="reel-title">
        <div className="wrap">
          <SectionHeading index="01" eyebrow="Showcase" title="Clips." description="Four slots, two formats. Swap the files in content/media.ts — the layout stays the same." />
          <span id="reel-title" className="sr-only">Showcase</span>
          <div className="mt-14 grid gap-6 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-8">
              <VideoPlayer {...media.videos.animationDemo} aspect="16/9" label="animation" index="01" />
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-4">
              <VideoPlayer {...media.videos.motionExtra01} aspect="9/16" label="motion" index="02" className="max-md:aspect-video" />
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-4">
              <VideoPlayer {...media.videos.motionExtra02} aspect="9/16" label="motion" index="03" className="max-md:aspect-video" />
            </Reveal>
            <Reveal delay={0.12} className="md:col-span-8">
              <VideoPlayer {...media.videos.editingDemo} aspect="16/9" label="editing" index="04" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="wrap py-24 md:py-36" aria-labelledby="ba-title">
        <SectionHeading index="02" eyebrow="Editing" title="Before / after." description="Drag the handle. Replace the two images in content/media.ts under images.before and images.after." />
        <span id="ba-title" className="sr-only">Before and after comparison</span>
        <Reveal className="mt-14">
          <BeforeAfter before={media.images.before} after={media.images.after} />
        </Reveal>
      </section>

      {/* Approach */}
      <section className="border-t border-line bg-coal py-24 md:py-36" aria-labelledby="approach-title">
        <div className="wrap">
          <SectionHeading index="03" eyebrow="Process" title="How a beginner gets less beginner." />
          <span id="approach-title" className="sr-only">Approach</span>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {approach.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 0.08} className="relative rounded-sm border border-line bg-graphite p-7">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related projects + future */}
      <section className="wrap py-24 md:py-36" aria-labelledby="motion-projects-title">
        <SectionHeading index="04" eyebrow="Projects" title="Motion projects." />
        <span id="motion-projects-title" className="sr-only">Motion projects</span>
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8">
          {related.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "md:mt-20" : undefined}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
        <Reveal className="mt-20 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-fog">More pieces get added here as they're finished. The bar is "would I show this to someone" — not perfection.</p>
          <Button href="/projects" variant="ghost" magnetic>All projects</Button>
        </Reveal>
      </section>
    </>
  );
}
//// FILE: app/projects/page.tsx
import { pageMeta } from "@/lib/metadata";
import { projects } from "@/content/projects";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata = pageMeta({
  title: "Projects",
  description: "Games, animations, edits and experiments by Erfan Jalali (Derfive).",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="wrap pb-16 pt-32 md:pb-20 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">04</span> — Projects · {String(projects.length).padStart(2, "0")}
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Built, breaking, or about to exist."
          className="font-display text-[clamp(2.8rem,8.5vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-bone"
        />
        <Reveal delay={0.3} className="mt-8 max-w-xl">
          <p className="text-fog md:text-lg">
            Everything in one place. Slots marked <span className="font-mono text-xs uppercase tracking-widest text-signal">placeholder</span>{" "}
            are waiting for real work to replace them.
          </p>
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-40" aria-label="Project archive">
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
//// FILE: app/projects/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/metadata";
import { projects, getProject, getNextProject, categoryLabels } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { MediaImage } from "@/components/media/MediaImage";

type Params = { params: Promise<{ slug: string }> };

const statusLabels: Record<ProjectStatus, string> = {
  placeholder: "Placeholder",
  prototype: "Prototype",
  "in-progress": "In progress",
  released: "Released",
  archived: "Archived",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMeta({ title: project.title, description: project.description, path: \`/projects/\${project.slug}\` });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const label = categoryLabels[project.category];
  const index = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0");

  const details: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Category", value: label },
    { label: "Year", value: project.year && project.year !== "—" ? project.year : "To be added" },
    { label: "Role", value: project.role ?? "To be added" },
    { label: "Status", value: statusLabels[project.status ?? "prototype"] },
    {
      label: "Technologies",
      value: project.technologies?.length ? (
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fog">{t}</li>
          ))}
        </ul>
      ) : (
        "To be added"
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="wrap pb-12 pt-32 md:pb-16 md:pt-44">
        <Reveal>
          <Link href="/projects" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-mist hover:text-signal">
            <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" /> All projects
          </Link>
        </Reveal>
        <p className="label-mono mb-6 mt-12">
          <span className="text-signal">{index}</span> — {label}
          {project.status === "placeholder" && <span className="ml-3 rounded-sm border border-signal/50 px-2 py-0.5 text-signal">placeholder</span>}
        </p>
        <TextReveal
          as="h1"
          immediate
          text={project.title}
          className="font-display text-[clamp(2.5rem,7.5vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-bone"
        />
        <Reveal delay={0.3} className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-fog md:text-xl">{project.description}</p>
        </Reveal>
      </section>

      {/* Main media */}
      <section className="wrap" aria-label="Project media">
        <Reveal>
          {project.video ? (
            <VideoPlayer src={project.video} poster={project.poster} title={project.title} aspect="16/9" label={label} index={index} />
          ) : (
            <MediaImage src={project.thumbnail ?? ""} alt={project.title} aspect="21/9" label={label} index={index} priority sizes="100vw" className="max-md:aspect-video" />
          )}
        </Reveal>
      </section>

      {/* Details + description */}
      <section className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-4">
          <dl className="divide-y divide-line border-y border-line">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-3 gap-4 py-4">
                <dt className="label-mono col-span-1 pt-0.5">{d.label}</dt>
                <dd className="col-span-2 text-sm text-bone">{d.value}</dd>
              </div>
            ))}
          </dl>
          {project.links?.length ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <li key={l.href}><Button href={l.href} external variant="ghost">{l.label}</Button></li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <h2 className="label-mono mb-6">About this project</h2>
          {project.longDescription ? (
            <p className="whitespace-pre-line text-base leading-relaxed text-fog md:text-lg">{project.longDescription}</p>
          ) : (
            <div className="dot-grid rounded-sm border border-dashed border-line p-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-mist">Details coming soon</p>
              <p className="mt-3 max-w-md text-sm text-fog">
                The full write-up for this project hasn't been added yet. It'll cover what it is, how it was made, and what was learned.
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {/* Gallery */}
      {project.gallery?.length ? (
        <section className="wrap pb-20 md:pb-28" aria-label="Gallery">
          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.05} className={i % 3 === 0 ? "md:col-span-2" : undefined}>
                <MediaImage src={src} alt={\`\${project.title} — image \${i + 1}\`} aspect={i % 3 === 0 ? "21/9" : "16/10"} index={String(i + 1).padStart(2, "0")} hoverZoom sizes="(max-width:768px) 100vw, 60vw" />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <section className="border-t border-line bg-coal" aria-label="Next project">
          <Link href={\`/projects/\${next.slug}\`} className="group wrap flex flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-24" data-cursor="view">
            <div>
              <p className="label-mono">Next project</p>
              <p className="mt-4 font-display text-[clamp(2rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-bone transition-colors group-hover:text-signal">
                {next.title}
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-mist">{categoryLabels[next.category]} →</span>
          </Link>
        </section>
      )}
    </>
  );
}
//// FILE: app/journey/page.tsx
import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Timeline } from "@/components/journey/Timeline";

export const metadata = pageMeta({
  title: "Journey",
  description: \`From four years of games at \${site.facts.studio} to computer science at \${site.facts.university} — the path so far.\`,
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <>
      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">05</span> — Journey
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Where it started, where it's going."
          className="font-display text-[clamp(2.6rem,8vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-bone"
        />
        <Reveal delay={0.3} className="mt-8 max-w-xl">
          <p className="text-fog md:text-lg">
            No dates yet — on purpose. The order is real; the calendar gets filled in later.
          </p>
        </Reveal>
      </section>

      <section className="wrap pb-24 md:pb-36" aria-label="Timeline">
        <Timeline />
      </section>

      <section className="border-t border-line bg-coal py-24 md:py-32">
        <div className="wrap flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-display text-2xl font-bold tracking-tight md:text-3xl">The next entry gets written by making something.</p>
          <div className="flex flex-wrap gap-4">
            <Button href="/projects" magnetic>Projects</Button>
            <Button href="/contact" variant="ghost">Contact</Button>
          </div>
        </div>
      </section>
    </>
  );
}
//// FILE: app/contact/page.tsx
import { pageMeta } from "@/lib/metadata";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactBackdrop } from "@/components/contact/ContactBackdrop";

export const metadata = pageMeta({
  title: "Contact",
  description: "Get in touch with Erfan Jalali (Derfive) about games, motion work, or collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, availability } = site.contact;

  return (
    <section className="relative overflow-hidden pb-28 pt-32 md:pb-40 md:pt-44">
      <ContactBackdrop />

      <div className="wrap relative">
        <p className="label-mono mb-8">
          <span className="text-signal">06</span> — Contact
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Say hi."
          className="font-display text-[clamp(4rem,16vw,16rem)] font-extrabold leading-[0.82] tracking-[-0.06em] text-bone"
        />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          {/* Direct channels */}
          <div className="space-y-12 md:col-span-5">
            <Reveal delay={0.2}>
              <p className="max-w-sm text-lg leading-relaxed text-fog">{availability}</p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="label-mono mb-3">Email</p>
              {email ? (
                <a href={\`mailto:\${email}\`} className="group inline-block font-display text-2xl font-bold tracking-tight text-bone transition-colors hover:text-signal md:text-4xl">
                  {email}
                  <span className="mt-1 block h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
                </a>
              ) : (
                <p className="inline-flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-mist md:text-3xl">
                  Coming soon <span className="blink text-signal">_</span>
                </p>
              )}
            </Reveal>

            <Reveal delay={0.34}>
              <p className="label-mono mb-3">Elsewhere</p>
              <ul className="divide-y divide-line border-y border-line">
                {site.socials.map((s) => (
                  <li key={s.label} className="flex items-center justify-between py-3">
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noreferrer" className="group flex w-full items-center justify-between font-display font-bold tracking-tight text-bone transition-colors hover:text-signal">
                        {s.label}
                        <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                      </a>
                    ) : (
                      <>
                        <span className="font-display font-bold tracking-tight text-mist">{s.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-line">soon</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.3} className="md:col-span-6 md:col-start-7">
            <div className="rounded-sm border border-line bg-coal/80 p-7 backdrop-blur-sm md:p-10">
              <p className="label-mono mb-8">Or write here</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
//// FILE: components/layout/Providers.tsx
"use client";

import { MotionConfig } from "motion/react";

/** Global motion settings: honours the user's "reduce motion" system preference. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
//// FILE: components/layout/PageTransition.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      {/* Dark panel that peels upward to reveal the new page. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-coal"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[81] h-px bg-signal"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: "left" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
//// FILE: components/layout/Preloader.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { SITE_READY_EVENT } from "@/hooks/useSiteReady";
import { EASE } from "@/lib/motion";

const MAX_WAIT_MS = 2000; // never hold the visitor longer than this
const SESSION_KEY = "derfive-visited";

function markReady() {
  document.documentElement.dataset.ready = "true";
  window.dispatchEvent(new Event(SITE_READY_EVENT));
}

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Returning visitors in the same session skip the loader entirely.
    if (sessionStorage.getItem(SESSION_KEY) || reduce) {
      setVisible(false);
      markReady();
      return;
    }

    let target = 0;
    let shown = 0;
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      sessionStorage.setItem(SESSION_KEY, "1");
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        markReady();
      }, 250);
    };

    // Real signals: fonts + full page load. Progress eases toward them.
    document.fonts.ready.then(() => (target = Math.max(target, 60)));
    if (document.readyState === "complete") target = 100;
    else window.addEventListener("load", () => (target = 100), { once: true });

    const tick = () => {
      shown += (Math.max(target, shown + 0.4) - shown) * 0.12;
      setProgress(Math.min(99, Math.round(shown)));
      if (target >= 100 && shown > 96) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const cap = setTimeout(finish, MAX_WAIT_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-6 md:px-12 md:py-10"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE } }}
        >
          <div className="flex items-center justify-between">
            <span className="label-mono">{site.brand} / loading</span>
            <span className="label-mono">{site.name}</span>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-display text-[clamp(3rem,12vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-bone">
              {site.brand.toUpperCase()}
            </span>
            <span className="font-mono text-2xl tabular-nums text-signal md:text-4xl">{progress}</span>
          </div>

          <div className="h-px w-full bg-line">
            <motion.div className="h-full bg-signal" style={{ width: \`\${progress}%\` }} transition={{ duration: 0.1 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
//// FILE: components/layout/Cursor.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useIsFinePointer } from "@/hooks/useMediaQuery";

type CursorState = "default" | "link" | "view" | "hidden";

/**
 * Custom cursor for mouse users. Elements can request a state with:
 *   data-cursor="view"  → large ring with "VIEW" label (media, project cards)
 *   data-cursor="link"  → medium ring (default for links/buttons)
 */
export function Cursor() {
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });
  const [state, setState] = useState<CursorState>("hidden");

  useEffect(() => {
    if (!enabled) {
      delete document.documentElement.dataset.cursor;
      return;
    }
    document.documentElement.dataset.cursor = "custom";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setState((s) => (s === "hidden" ? "default" : s));
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button, [role='button'], input, textarea, label");
      if (!el) return setState("default");
      if (el.matches("input, textarea")) return setState("hidden");
      setState((el.dataset.cursor as CursorState) || "link");
    };
    const onLeave = () => setState("hidden");
    const onEnter = () => setState("default");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      delete document.documentElement.dataset.cursor;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = { default: 34, link: 48, view: 84, hidden: 0 }[state];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-signal"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: state === "hidden" ? 0 : 1 }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-bone/70 font-mono text-[10px] tracking-widest text-bone"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ring,
          height: ring,
          opacity: state === "hidden" ? 0 : 1,
          backgroundColor: state === "view" ? "rgba(5,5,5,0.55)" : "rgba(5,5,5,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {state === "view" && "VIEW"}
      </motion.div>
    </div>
  );
}
//// FILE: components/layout/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

const contactLink = { label: "Contact", href: "/contact" };

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock body scroll while it's open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div
        className={cn(
          "absolute inset-0 border-b transition-[opacity,background-color] duration-500",
          scrolled && !open ? "border-line/60 bg-ink/75 opacity-100 backdrop-blur-md" : "border-transparent opacity-0",
        )}
      />
      <nav aria-label="Main" className="wrap relative flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={\`\${site.brand} — home\`}>
          <span className="h-2 w-2 rotate-45 bg-signal transition-transform duration-500 group-hover:rotate-[135deg]" />
          <span className="font-display text-lg font-bold tracking-tight">{site.brand}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-bone",
                  isActive(item.href) ? "text-bone" : "text-mist",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 h-px w-full bg-signal"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
            </li>
          ))}
          <li>
            <Link
              href={contactLink.href}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                isActive(contactLink.href)
                  ? "border-signal bg-signal text-ink"
                  : "border-line text-bone hover:border-signal hover:text-signal",
              )}
            >
              {contactLink.label}
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-[62] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span className="block h-px w-6 bg-bone" animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} />
          <motion.span className="block h-px w-6 bg-bone" animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[61] flex flex-col bg-ink px-6 pb-8 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <ul className="flex flex-col gap-2">
              {[{ label: "Home", href: "/" }, ...site.nav, contactLink].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE } }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-bold tracking-tight",
                      isActive(item.href) ? "text-signal" : "text-bone",
                    )}
                  >
                    <span className="font-mono text-xs text-mist">0{i}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex items-end justify-between">
              <p className="label-mono">
                {site.facts.studio} · {site.facts.years} yrs
                <br />
                {site.facts.university}
              </p>
              <span className="font-display text-sm font-bold">{site.brand}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
//// FILE: components/layout/Footer.tsx
import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-coal">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="label-mono mb-4">Erfan Jalali · {site.role}</p>
            <p className="font-display text-[clamp(3.5rem,10vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] outline-text select-none">
              {site.brand.toUpperCase()}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label-mono mb-4">Pages</p>
            <ul className="space-y-2">
              {[{ label: "Home", href: "/" }, ...site.nav, { label: "Contact", href: "/contact" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-fog transition-colors hover:text-signal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label-mono mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {site.socials.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-sm text-fog transition-colors hover:text-signal">
                      {s.label} ↗
                    </a>
                  </li>
                ) : (
                  <li key={s.label} className="flex items-center gap-2 text-sm text-mist">
                    {s.label} <span className="font-mono text-[10px] uppercase tracking-widest text-line">soon</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mist md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. Built, not templated.</span>
          <span>{site.facts.studio} · {site.facts.university}</span>
          <a href="#top" className="hover:text-signal">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
//// FILE: components/ui/Magnetic.tsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useIsFinePointer } from "@/hooks/useMediaQuery";

/** Gently pulls its child toward the cursor. Automatically off on touch / reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const active = fine && !reduce;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
//// FILE: components/ui/Button.tsx
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  magnetic?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
}

/** Site button. Pass \`href\` for a link, or omit it for a real <button>. */
export function Button({ href, children, variant = "primary", size = "md", magnetic, className, type = "button", disabled, external }: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center gap-3 rounded-full font-mono uppercase tracking-[0.14em] transition-colors duration-300",
    "disabled:cursor-not-allowed disabled:opacity-50",
    size === "md" ? "px-5 py-3 text-xs" : "px-7 py-4 text-sm",
    variant === "primary" ? "bg-signal text-ink hover:bg-bone" : "border border-line text-bone hover:border-signal hover:text-signal",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="relative h-3 w-3 overflow-hidden">
        <Arrow className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:-translate-y-4" />
        <Arrow className="absolute inset-0 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  );

  const el = href ? (
    external ? (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>{inner}</a>
    ) : (
      <Link href={href} className={classes}>{inner}</Link>
    )
  ) : (
    <button type={type} disabled={disabled} className={classes}>{inner}</button>
  );

  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el;
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={cn("h-3 w-3", className)}>
      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
//// FILE: components/ui/Reveal.tsx
"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p";
  y?: number;
}

/** Fades + lifts content in the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className, as = "div", y = 28 }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
//// FILE: components/ui/TextReveal.tsx
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  /** Animate immediately (hero) instead of when scrolled into view. */
  immediate?: boolean;
  /** For the hero: wait for this to become true before animating. */
  ready?: boolean;
}

/** Word-by-word masked reveal. Screen readers get the plain sentence. */
export function TextReveal({ text, className, as: Tag = "p", delay = 0, stagger = 0.04, immediate, ready = true }: TextRevealProps) {
  const words = text.split(" ");
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <Tag className={cn("inline", className)} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={container}
        initial="hidden"
        {...(immediate
          ? { animate: ready ? "show" : "hidden" }
          : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } })}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span className="inline-block" variants={word}>
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
//// FILE: components/ui/SectionHeading.tsx
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string; // "01"
  eyebrow: string; // small mono label
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "split";
  className?: string;
}

/** Numbered section heading used across pages for rhythm and consistency. */
export function SectionHeading({ index, eyebrow, title, description, as: Tag = "h2", align = "split", className }: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:gap-8", className)}>
      <Reveal className="md:col-span-3">
        <p className="label-mono flex items-center gap-3">
          <span className="text-signal">{index}</span>
          <span className="h-px w-8 bg-line" />
          {eyebrow}
        </p>
      </Reveal>
      <div className={cn(align === "split" ? "md:col-span-9" : "md:col-span-12")}>
        <Reveal delay={0.05}>
          <Tag className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-bone">
            {title}
          </Tag>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg">{description}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
//// FILE: components/media/MediaPlaceholder.tsx
import { cn } from "@/lib/cn";
import { aspectClass, type Aspect } from "@/lib/media";

interface MediaPlaceholderProps {
  kind: "video" | "image";
  label?: string; // e.g. "GAME", "ANIMATION"
  caption?: string; // e.g. "Media coming soon"
  index?: string; // small number in the corner
  aspect?: Aspect;
  className?: string;
  /** Renders without its own aspect box (used as a fill layer). */
  fill?: boolean;
}

/**
 * Designed empty state for media that hasn't been added yet.
 * Replaces itself automatically once a real file path exists in /content.
 */
export function MediaPlaceholder({ kind, label, caption = "Media coming soon", index, aspect = "16/9", className, fill }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={\`\${kind} placeholder\${label ? \` — \${label}\` : ""}: \${caption}\`}
      className={cn(
        "dot-grid relative overflow-hidden rounded-sm border border-line bg-graphite",
        fill ? "absolute inset-0" : aspectClass[aspect],
        className,
      )}
    >
      <div className="scan-line" />
      <Corner className="left-3 top-3" />
      <Corner className="right-3 top-3 rotate-90" />
      <Corner className="bottom-3 right-3 rotate-180" />
      <Corner className="bottom-3 left-3 -rotate-90" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist">
          {kind === "video" ? (
            <svg viewBox="0 0 16 16" className="ml-0.5 h-4 w-4 fill-current"><path d="M4 2.5v11l9-5.5z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.2"><rect x="2" y="3" width="12" height="10" rx="1" /><path d="M2 11l4-4 3 3 2-2 3 3" /><circle cx="11" cy="6" r="1" /></svg>
          )}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone">
          {kind}
          {label ? <span className="text-mist"> / {label}</span> : null}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{caption}</span>
      </div>

      <span className="absolute bottom-3 left-8 font-mono text-[10px] uppercase tracking-[0.2em] text-line">Derfive</span>
      {index && <span className="absolute bottom-3 right-8 font-mono text-[10px] text-line">{index}</span>}
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("absolute h-3 w-3 border-l border-t border-mist/60", className)} />
  );
}
//// FILE: components/media/VideoPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { aspectClass, type Aspect } from "@/lib/media";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface VideoPlayerProps {
  /** Path inside /public, e.g. "/videos/game-demo.mp4". Empty string shows a placeholder. */
  src: string;
  poster?: string;
  title: string;
  aspect?: Aspect;
  /** Small mono label in the corner, e.g. "GAME". */
  label?: string;
  index?: string;
  /**
   * ambient = silent looping background clip (autoplays muted while visible, no controls).
   * Default = normal player with controls, never autoplays, never plays sound on its own.
   */
  ambient?: boolean;
  className?: string;
}

/**
 * The one video component used everywhere. Loads nothing until it's near the
 * viewport, shows a designed placeholder when there's no file yet, and degrades
 * gracefully if the file is missing or broken.
 */
export function VideoPlayer({ src, poster, title, aspect = "16/9", label, index, ambient, className }: VideoPlayerProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  // Mount the <video> only when it's close to the viewport; pause ambient clips when hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !src) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        const v = videoRef.current;
        if (ambient && v) {
          if (entry.isIntersecting && !reduce) v.play().catch(() => {});
          else v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, ambient, reduce]);

  if (!src) {
    return <MediaPlaceholder kind="video" label={label} caption={title} index={index} aspect={aspect} className={className} />;
  }
  if (status === "error") {
    return (
      <MediaPlaceholder kind="video" label="not found" caption={\`Check the file path: \${src}\`} index={index} aspect={aspect} className={className} />
    );
  }

  return (
    <figure ref={wrapRef} className={cn("group relative overflow-hidden rounded-sm border border-line bg-graphite", aspectClass[aspect], className)} data-cursor={ambient ? undefined : "view"}>
      {!poster && <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />}
      {near && (
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          title={title}
          controls={!ambient}
          muted={ambient}
          loop={ambient}
          autoPlay={ambient && !reduce}
          playsInline
          preload={ambient ? "metadata" : "none"}
          onLoadStart={() => setStatus("loading")}
          onWaiting={() => setStatus("loading")}
          onCanPlay={() => setStatus("ready")}
          onPlaying={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {status === "loading" && (
        <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-4 w-4 rounded-full border border-line border-t-signal spin-slow" />
      )}
      {label && (
        <figcaption className="pointer-events-none absolute left-4 top-4 rounded-sm bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone backdrop-blur-sm">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
//// FILE: components/media/MediaImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { aspectClass, type Aspect } from "@/lib/media";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface MediaImageProps {
  /** Path inside /public, e.g. "/images/portrait.jpg". Empty string shows a placeholder. */
  src: string;
  alt: string;
  aspect?: Aspect;
  label?: string;
  index?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  hoverZoom?: boolean;
}

/** Responsive image with a designed placeholder when the file is missing or fails. */
export function MediaImage({ src, alt, aspect = "16/9", label, index, sizes = "(max-width: 768px) 100vw, 50vw", priority, className, hoverZoom }: MediaImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <MediaPlaceholder kind="image" label={label} caption={failed ? \`Check the file path: \${src}\` : alt} index={index} aspect={aspect} className={className} />;
  }

  return (
    <figure className={cn("group relative overflow-hidden rounded-sm border border-line bg-graphite", aspectClass[aspect], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className={cn("object-cover", hoverZoom && "transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]")}
      />
      {label && (
        <figcaption className="pointer-events-none absolute left-4 top-4 rounded-sm bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone backdrop-blur-sm">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
//// FILE: components/media/BeforeAfter.tsx
"use client";

import { useState } from "react";
import { MediaImage } from "./MediaImage";
import type { ImageAsset } from "@/content/media";

/** Drag (or use arrow keys) to compare two images. Works with placeholders too. */
export function BeforeAfter({ before, after }: { before: ImageAsset; after: ImageAsset }) {
  const [value, setValue] = useState(50);

  return (
    <div className="relative select-none">
      <MediaImage src={after.src} alt={after.alt} label="after" aspect="16/9" />
      <div className="absolute inset-0" style={{ clipPath: \`inset(0 \${100 - value}% 0 0)\` }}>
        <MediaImage src={before.src} alt={before.alt} label="before" aspect="16/9" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-signal" style={{ left: \`\${value}%\` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-signal bg-ink font-mono text-[10px] text-signal">
          ⇔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
//// FILE: components/three/HeroFallback.tsx
/** 2D atmosphere used under the WebGL scene, and alone when WebGL is unavailable. */
export function HeroFallback({ showShape }: { showShape?: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[45%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,245,66,0.10)_0%,rgba(200,245,66,0)_60%)] md:left-[68%]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,black,transparent)]">
        <div className="dot-grid h-full w-full opacity-70 [background-size:44px_44px]" />
      </div>
      {showShape && (
        <svg viewBox="0 0 200 200" className="absolute left-1/2 top-[45%] w-[46vmin] -translate-x-1/2 -translate-y-1/2 md:left-[68%]" fill="none" stroke="#c8f542" strokeWidth="0.8" strokeOpacity="0.5">
          <polygon points="100,12 178,68 148,164 52,164 22,68" />
          <polygon points="100,52 142,82 126,132 74,132 58,82" />
          <path d="M100 12v40M178 68l-36 14M148 164l-22-32M52 164l22-32M22 68l36 14" />
        </svg>
      )}
    </div>
  );
}
//// FILE: components/three/HeroScene.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

interface HeroSceneProps {
  active: boolean; // false when the hero is scrolled out of view → rendering pauses
  lite: boolean; // true on small screens → fewer objects, lower pixel ratio
}

const pointer = { x: 0, y: 0 };

/** The Derfive artifact: dark faceted shell, lime wireframe core, orbiting debris. */
function Artifact({ lite, reduce }: { lite: boolean; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.PointLight>(null);
  const debris = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();

  const shellGeo = useMemo(() => new THREE.DodecahedronGeometry(1.35, 0), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(shellGeo), [shellGeo]);
  useEffect(() => () => { shellGeo.dispose(); edgesGeo.dispose(); }, [shellGeo, edgesGeo]);

  const count = lite ? 14 : 28;
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2.2 + (i % 5) * 0.35 + Math.random() * 0.4,
        speed: 0.12 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 1.2,
        size: 0.5 + Math.random(),
      })),
    [count],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const baseX = lite ? 0 : 1.7;

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    const g = group.current;
    if (!g) return;

    const px = reduce ? 0 : pointer.x;
    const py = reduce ? 0 : pointer.y;

    g.rotation.y += dt * (reduce ? 0.02 : 0.12);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.25 + scroll * 0.9 - py * 0.25, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, px * 0.15, 0.05);
    g.position.y = (reduce ? 0 : Math.sin(t * 0.8) * 0.12) - scroll * 3;
    g.position.x = THREE.MathUtils.lerp(g.position.x, baseX + px * 0.25, 0.05);

    if (core.current) core.current.rotation.y -= dt * (reduce ? 0.03 : 0.35);
    if (glow.current) glow.current.intensity = reduce ? 2.2 : 2.2 + Math.sin(t * 1.6) * 0.8;

    if (debris.current) {
      seeds.forEach((s, i) => {
        const a = s.phase + t * (reduce ? 0.02 : s.speed);
        dummy.position.set(Math.cos(a) * s.radius, Math.sin(a * 1.3) * 0.5 * s.tilt, Math.sin(a) * s.radius);
        dummy.rotation.set(a, a * 0.7, 0);
        dummy.scale.setScalar(s.size);
        dummy.updateMatrix();
        debris.current!.setMatrixAt(i, dummy.matrix);
      });
      debris.current.instanceMatrix.needsUpdate = true;
    }

    // Camera: subtle parallax with the mouse, pulls back as the page scrolls.
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px * 0.35, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.6 + py * 0.2, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6 + scroll * 1.5, 0.05);
    camera.lookAt(baseX * 0.6, -scroll * 1.5, 0);
  });

  return (
    <group ref={group} position={[baseX, 0, 0]}>
      <mesh geometry={shellGeo}>
        <meshStandardMaterial color="#141416" roughness={0.38} metalness={0.55} flatShading />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#c8f542" transparent opacity={0.35} />
      </lineSegments>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color="#c8f542" wireframe transparent opacity={0.9} />
      </mesh>
      <pointLight ref={glow} color="#c8f542" intensity={2.5} distance={5} decay={2} />

      <instancedMesh ref={debris} args={[undefined, undefined, count]} frustumCulled={false}>
        <tetrahedronGeometry args={[0.07, 0]} />
        <meshStandardMaterial color="#8b8b94" roughness={0.6} metalness={0.3} flatShading />
      </instancedMesh>
    </group>
  );
}

function Environment() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 20]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 7, 3]} intensity={2.6} />
      <pointLight position={[-5, -2, 3]} intensity={14} color="#c8f542" distance={14} decay={2} />
      <gridHelper args={[70, 70, "#1e1e21", "#121214"]} position={[0, -2.4, 0]} />
    </>
  );
}

export default function HeroScene({ active, lite }: HeroSceneProps) {
  // Read the preference HERE (outside the canvas) — React context doesn't cross into the R3F root.
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lite ? 1 : [1, 1.6]}
      camera={{ position: [0, 0.6, 6], fov: 42, near: 0.1, far: 40 }}
      gl={{ antialias: !lite, alpha: false, powerPreference: "high-performance" }}
      className="absolute! inset-0"
      aria-hidden
    >
      <Environment />
      <Artifact lite={lite} reduce={reduce} />
    </Canvas>
  );
}
//// FILE: components/three/HeroCanvas.tsx
"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HeroFallback } from "./HeroFallback";

// Loaded only in the browser, only when the hero mounts. Keeps three.js out of the main bundle.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function detectWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** If anything inside the 3D scene throws, show the 2D fallback instead of a broken page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <HeroFallback showShape /> : this.props.children;
  }
}

export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const lite = useMediaQuery("(max-width: 768px)");

  useEffect(() => setSupported(detectWebGL()), []);

  // Stop rendering frames when the hero is off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <HeroFallback showShape={supported === false} />
      {supported && (
        <SceneBoundary>
          <HeroScene active={active} lite={lite} />
        </SceneBoundary>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
//// FILE: components/home/Hero.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { useSiteReady } from "@/hooks/useSiteReady";
import { EASE } from "@/lib/motion";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Button } from "@/components/ui/Button";

const letters = site.brand.toUpperCase().split("");

export function Hero() {
  const ready = useSiteReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const show = ready ? "show" : "hidden";

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden" aria-labelledby="hero-title">
      <HeroCanvas />

      <div className="wrap relative flex min-h-[100svh] flex-col justify-between pb-10 pt-28 md:pb-14 md:pt-36">
        {/* Top meta row — viewport-style labels */}
        <motion.div
          className="label-mono flex flex-wrap items-center justify-between gap-y-2"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9, duration: 0.8 } } }}
          initial="hidden"
          animate={show}
          style={{ opacity: fade }}
        >
          <span>{site.name}</span>
          <span className="hidden md:inline">{site.facts.studio} · {site.facts.years} yrs · with {site.facts.partner}</span>
          <span>{site.facts.university} · {site.facts.semester}</span>
        </motion.div>

        <div className="mt-auto">
          <motion.p
            className="mb-6 max-w-md text-base leading-relaxed text-fog md:text-lg"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.8, ease: EASE } } }}
            initial="hidden"
            animate={show}
          >
            Game developer. Second-semester computer science student. Beginner at making things move — and not shy about it.
          </motion.p>

          <motion.h1
            id="hero-title"
            aria-label={site.brand}
            className="font-display text-[clamp(4.25rem,17.5vw,19rem)] font-extrabold leading-[0.82] tracking-[-0.05em] text-bone"
            style={{ y: wordY }}
          >
            {letters.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  aria-hidden
                  className="inline-block"
                  variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { delay: 0.1 + i * 0.05, duration: 0.9, ease: EASE } } }}
                  initial="hidden"
                  animate={show}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, ease: EASE } } }}
            initial="hidden"
            animate={show}
          >
            <Button href="/projects" magnetic>See the work</Button>
            <Button href="/about" variant="ghost" magnetic>Who is Erfan</Button>
            <span aria-hidden className="ml-auto hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist md:flex">
              scroll <span className="h-8 w-px overflow-hidden bg-line"><motion.span className="block h-full w-full bg-signal" animate={reduce ? undefined : { y: ["-100%", "100%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} /></span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
//// FILE: components/home/IntroStatement.tsx
import Link from "next/link";
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";

const chips = [
  \`\${site.facts.years} years of game development\`,
  \`\${site.facts.studio} · with \${site.facts.partner}\`,
  \`\${site.facts.university} · \${site.facts.semester}\`,
  "Editing & animation · beginner",
];

export function IntroStatement() {
  return (
    <section className="wrap py-28 md:py-44" aria-labelledby="intro-title">
      <p className="label-mono mb-10">
        <span className="text-signal">00</span> — Who is behind Derfive
      </p>
      <TextReveal
        as="h2"
        text="I build games. Four years of it at EMVP with Mobin Kohi, a computer science degree in progress, and a growing habit of making things move on a timeline."
        className="font-display text-[clamp(1.9rem,4.6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bone"
      />
      <span id="intro-title" className="sr-only">Introduction</span>

      <div className="mt-12 flex flex-wrap gap-3">
        {chips.map((c, i) => (
          <Reveal key={c} delay={i * 0.06} as="div">
            <span className="inline-block rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
              {c}
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-10">
        <Link href="/about" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-signal">
          The longer version
          <span className="h-px w-10 bg-signal transition-all duration-500 group-hover:w-16" />
        </Link>
      </Reveal>
    </section>
  );
}
//// FILE: components/home/GameSection.tsx
import { media } from "@/content/media";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { ExperienceMeter } from "@/components/game/ExperienceMeter";

export function GameSection() {
  return (
    <section className="relative border-y border-line bg-coal py-24 md:py-36" aria-labelledby="home-games">
      <div className="wrap">
        <SectionHeading
          index="01"
          eyebrow="Game development"
          title="Four years of shipping, breaking, and rebuilding."
          description={\`At \${site.facts.studio}, together with \${site.facts.partner}. Games are the main quest — everything else on this site orbits it.\`}
        />
        <span id="home-games" className="sr-only">Game development</span>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <ExperienceMeter compact />
          </div>
          <Reveal className="md:col-span-8" delay={0.1}>
            <VideoPlayer {...media.videos.gameDemo} label="game / demo" index="01" aspect="16/9" />
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/game-development" magnetic>Game development</Button>
          <Button href="/projects" variant="ghost">All projects</Button>
        </Reveal>
      </div>
    </section>
  );
}
//// FILE: components/home/MotionSection.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { media } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const clips = [media.videos.animationDemo, media.videos.editingDemo, media.videos.motionExtra01];

/** Three vertical clips drifting at different speeds — a different rhythm from the game section. */
export function MotionSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -20]);
  const offsets = [y0, y1, y2];

  return (
    <section ref={ref} className="wrap py-24 md:py-36" aria-labelledby="home-motion">
      <SectionHeading
        index="02"
        eyebrow="Editing & animation"
        title="A side quest. Beginner level. Improving on purpose."
        description="Cuts, timing, simple motion. This is the part of my work that changes the fastest, and I'd rather show it early than wait until it's perfect."
      />
      <span id="home-motion" className="sr-only">Editing and animation</span>

      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {clips.map((clip, i) => (
          <motion.div key={clip.title} style={reduce ? undefined : { y: offsets[i] }} className={i === 2 ? "col-span-2 md:col-span-1" : undefined}>
            <VideoPlayer {...clip} aspect={i === 2 ? "16/9" : "9/16"} ambient label={i === 0 ? "animation" : i === 1 ? "editing" : "motion"} index={\`0\${i + 1}\`} className={i === 2 ? "md:aspect-[9/16]" : undefined} />
          </motion.div>
        ))}
      </div>

      <Reveal className="mt-16">
        <Button href="/editing-animation" variant="ghost" magnetic>Editing & animation</Button>
      </Reveal>
    </section>
  );
}
//// FILE: components/home/FeaturedProjects.tsx
import { getFeaturedProjects, projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3);
  const list = featured.length ? featured : projects.slice(0, 3);

  return (
    <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="home-projects">
      <div className="wrap">
        <SectionHeading index="03" eyebrow="Selected projects" title="Things I've built — and things about to be." />
        <span id="home-projects" className="sr-only">Selected projects</span>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          {list.map((p, i) => (
            <div key={p.slug} className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5 md:mt-24" : "md:col-span-12 md:w-2/3 md:place-self-end"}>
              <ProjectCard project={p} index={i} size={i === 0 ? "large" : "regular"} />
            </div>
          ))}
        </div>

        <Reveal className="mt-16 flex items-center justify-between gap-6">
          <p className="max-w-sm text-sm text-mist">Every project lives in one file. New ones drop in as they become real.</p>
          <Button href="/projects" magnetic>All projects</Button>
        </Reveal>
      </div>
    </section>
  );
}
//// FILE: components/home/JourneyPreview.tsx
import Link from "next/link";
import { journey } from "@/content/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function JourneyPreview() {
  return (
    <section className="wrap py-24 md:py-36" aria-labelledby="home-journey">
      <SectionHeading index="04" eyebrow="Journey" title="Where this is going." />
      <span id="home-journey" className="sr-only">Journey</span>

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
        <span aria-hidden className="absolute left-0 top-3 hidden h-px w-full bg-line md:block" />
        {journey.map((s, i) => (
          <Reveal key={s.id} as="li" delay={i * 0.08} className="relative md:pt-8">
            <span aria-hidden className="absolute left-0 top-1.5 hidden h-3 w-3 rotate-45 border border-signal bg-ink md:block" />
            <p className="font-mono text-xs text-signal">{s.index}</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{s.title}</h3>
            <p className="label-mono mt-1 normal-case tracking-normal">{s.period}</p>
            <p className="mt-4 text-sm leading-relaxed text-fog">{s.body}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-12">
        <Link href="/journey" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-signal">
          Full timeline <span className="h-px w-10 bg-signal transition-all duration-500 group-hover:w-16" />
        </Link>
      </Reveal>
    </section>
  );
}
//// FILE: components/home/ContactCTA.tsx
import { site } from "@/content/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line py-32 md:py-48" aria-labelledby="home-contact">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,245,66,0.09),transparent_60%)]" />
      <div className="wrap relative text-center">
        <p className="label-mono mb-8"><span className="text-signal">05</span> — Contact</p>
        <TextReveal as="h2" text="Let's make something." className="font-display text-[clamp(3rem,10vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-bone" />
        <span id="home-contact" className="sr-only">Contact</span>
        <Reveal delay={0.2} className="mx-auto mt-8 max-w-md">
          <p className="text-fog">{site.contact.availability}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button href="/contact" size="lg" magnetic>Say hi</Button>
        </Reveal>
      </div>
    </section>
  );
}
//// FILE: components/game/ExperienceMeter.tsx
"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";

const years = ["01", "02", "03", "04"];

/** Four bars, one per year at EMVP. No dates until Erfan adds them. */
export function ExperienceMeter({ compact }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-sm border border-line bg-graphite p-6 md:p-8">
      <div>
        <p className="label-mono">Experience</p>
        <p className="mt-2 font-display text-[clamp(4rem,9vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em] text-bone">
          {site.facts.years.padStart(2, "0")}
          <span className="ml-2 align-top font-mono text-sm font-normal tracking-normal text-signal">yrs</span>
        </p>
        <p className="mt-2 text-sm text-fog">
          {site.facts.studio} · with {site.facts.partner}
        </p>
      </div>

      <div className={compact ? "mt-10" : "mt-16"}>
        <div className="flex items-end gap-2" style={{ height: compact ? 96 : 160 }}>
          {years.map((y, i) => (
            <div key={y} className="flex h-full flex-1 flex-col justify-end gap-2">
              <motion.div
                className="w-full origin-bottom bg-signal"
                style={{ height: \`\${40 + i * 20}%\` }}
                initial={{ scaleY: 0, opacity: 0.4 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
              />
              <span className="font-mono text-[10px] text-mist">Y{y}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Year markers · dates to be added</p>
      </div>
    </div>
  );
}
//// FILE: components/projects/ProjectCard.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/content/types";
import { categoryLabels } from "@/content/projects";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { MediaImage } from "@/components/media/MediaImage";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "large" | "regular";
}

export function ProjectCard({ project, index, size = "regular" }: ProjectCardProps) {
  const aspect = size === "large" ? "16/10" : "4/5";
  const label = categoryLabels[project.category];
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="group"
    >
      <Link href={\`/projects/\${project.slug}\`} className="block" data-cursor="view" aria-label={\`\${project.title} — \${label}\`}>
        <div className="relative">
          {project.video ? (
            <VideoPlayer src={project.video} poster={project.poster} title={project.title} aspect={aspect} ambient />
          ) : (
            <MediaImage src={project.thumbnail ?? ""} alt={project.title} aspect={aspect} label={label} index={num} hoverZoom sizes={size === "large" ? "(max-width:768px) 100vw, 60vw" : "(max-width:768px) 100vw, 40vw"} />
          )}
          {project.status === "placeholder" && (
            <span className="absolute right-3 top-3 rounded-sm border border-signal/50 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              placeholder
            </span>
          )}
          <span aria-hidden className="pointer-events-none absolute inset-0 border border-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <h3 className={cn("font-display font-bold tracking-tight text-bone transition-colors group-hover:text-signal", size === "large" ? "text-2xl md:text-4xl" : "text-xl md:text-2xl")}>
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{project.description}</p>
          </div>
          <div className="shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
            <p>{label}</p>
            <p>{project.year ?? "—"}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
//// FILE: components/projects/ProjectGrid.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, ProjectCategory } from "@/content/types";
import { categoryLabels } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = "all" | ProjectCategory;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const filters: Filter[] = ["all", ...(Object.keys(categoryLabels) as ProjectCategory[])];

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f === filter;
          const count = f === "all" ? projects.length : projects.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                active ? "border-signal text-ink" : "border-line text-mist hover:border-mist hover:text-bone",
              )}
            >
              {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-signal" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">
                {f === "all" ? "All" : categoryLabels[f]} <span className="opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-8 md:grid-cols-6 md:gap-x-8 md:gap-y-20">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => {
            const large = !!p.featured;
            return (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className={cn(large ? "md:col-span-4" : "md:col-span-2", i % 3 === 1 && "md:mt-16")}
              >
                <ProjectCard project={p} index={i} size={large ? "large" : "regular"} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.14em] text-mist">Nothing here yet.</p>
      )}
    </div>
  );
}
//// FILE: components/journey/Timeline.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { journey } from "@/content/journey";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scroll-driven timeline. A lime line fills as you scroll; each stage sits on
 * alternating sides on desktop and stacks in a single column on mobile.
 */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      {/* Track + animated fill */}
      <span aria-hidden className="absolute left-[7px] top-0 h-full w-px bg-line md:left-1/2" />
      <motion.span
        aria-hidden
        className="absolute left-[7px] top-0 h-full w-px origin-top bg-signal md:left-1/2"
        style={{ scaleY: reduce ? 1 : progress }}
      />

      {journey.map((stage, i) => {
        const left = i % 2 === 0;
        return (
          <li key={stage.id} className="relative grid gap-4 py-14 pl-10 md:grid-cols-2 md:gap-x-24 md:py-24 md:pl-0">
            {/* Node */}
            <motion.span
              aria-hidden
              className="absolute left-0 top-[3.6rem] h-[15px] w-[15px] rotate-45 border border-line bg-ink md:left-1/2 md:top-[6.2rem] md:-translate-x-1/2"
              initial={false}
              whileInView={reduce ? undefined : { borderColor: "#c8f542", backgroundColor: "#c8f542" }}
              viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
              transition={{ duration: 0.4 }}
            />

            {/* Content */}
            <Reveal className={cn("md:row-start-1", left ? "md:col-start-1 md:text-right" : "md:col-start-2")}>
              <p className="font-mono text-xs text-signal">{stage.index}</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{stage.title}</h2>
              <p className="label-mono mt-3 normal-case tracking-normal">
                {stage.period}
                {stage.org ? \` · \${stage.org}\` : ""}
              </p>
              <p className={cn("mt-6 max-w-md text-base leading-relaxed text-fog", left && "md:ml-auto")}>{stage.body}</p>
            </Reveal>

            {/* Giant outlined index on the opposite side (desktop only) */}
            <div aria-hidden className={cn("hidden select-none md:row-start-1 md:block", left ? "md:col-start-2" : "md:col-start-1 md:text-right")}>
              <span className="outline-text font-display text-[clamp(7rem,14vw,14rem)] font-extrabold leading-none tracking-[-0.06em]">
                {stage.index}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
//// FILE: components/contact/ContactBackdrop.tsx
"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useIsFinePointer } from "@/hooks/useMediaQuery";

/** Soft lime glow that follows the pointer over a fading dot grid. Static on touch devices. */
export function ContactBackdrop() {
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();
  const active = fine && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!active) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, x, y]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,245,66,0.13),transparent_60%)]"
        style={active ? { x: sx, y: sy } : undefined}
      />
    </div>
  );
}
//// FILE: components/contact/ContactForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

const field =
  "w-full border-b border-line bg-transparent py-3 text-base text-bone placeholder:text-mist/60 transition-colors focus:border-signal focus:outline-none";

/**
 * Posts to /api/contact. Until CONTACT_WEBHOOK_URL is set (see .env.example)
 * the API answers "not connected" and the form says so instead of failing silently.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 503) return setStatus("unconfigured");
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const messages: Record<Exclude<Status, "idle" | "sending">, string> = {
    sent: "Sent. I'll get back to you.",
    error: "Something went wrong. Try again in a moment.",
    unconfigured: site.contact.email
      ? \`The form isn't connected yet — email me directly at \${site.contact.email}.\`
      : "The form isn't connected yet — check back soon or reach me through the links on this page.",
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" aria-describedby="form-status">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-mono block">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="label-mono block">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label-mono block">Message</label>
        <textarea id="message" name="message" required rows={5} placeholder="What are you building?" className={\`\${field} resize-none\`} />
      </div>

      {/* Honeypot: hidden from humans, bots tend to fill it. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={status === "sending"} magnetic>
          {status === "sending" ? "Sending" : "Send message"}
        </Button>
        <div id="form-status" role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
          <AnimatePresence mode="wait">
            {status !== "idle" && status !== "sending" && (
              <motion.p
                key={status}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={status === "sent" ? "text-signal" : "text-fog"}
              >
                {messages[status]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
//// FILE: public/WHERE-FILES-GO.txt
VIDEOS  → public/videos/    (use .mp4)            then write "/videos/name.mp4"  in content/media.ts or content/projects.ts
IMAGES  → public/images/    (.jpg / .png / .webp) then write "/images/name.jpg"  in the same files
POSTERS → public/posters/   (a still frame)       then write "/posters/name.jpg"

The path you type always starts with "/" and does NOT include the word "public".
Keep filenames lowercase, no spaces:  my-game-trailer.mp4   not   My Game Trailer.mp4
//// FILE: README.md
# Derfive — Erfan Jalali's portfolio

This is your website. You don't need to understand the code to keep it updated.
Almost everything you'll ever want to change lives in **one folder: \`content/\`**.

---

## 1. Running the site on your computer

You only do the first two steps once.

1. Install **Node.js** (the "LTS" version) from https://nodejs.org
2. Open a terminal in this folder and run:

       npm install

3. Start the site:

       npm run dev

4. Open http://localhost:3000 in your browser.

While \`npm run dev\` is running, every time you save a file the page updates by itself.
To stop it, press \`Ctrl + C\` in the terminal.

---

## 2. Where the text is

| What you want to change | Open this file |
|---|---|
| Your name, tagline, navigation, email, social links | \`content/site.ts\` |
| The About page (bio paragraphs, facts, skills, principles) | \`content/about.ts\` |
| Projects (titles, descriptions, images, videos) | \`content/projects.ts\` |
| The Journey timeline | \`content/journey.ts\` |
| Standalone videos & images (game demo, portrait, screenshots…) | \`content/media.ts\` |

Rules of thumb when editing:
- Only change the text **between the quotes**: \`"like this"\`.
- Don't delete commas, brackets or quotes.
- Save the file. If the page goes blank, undo your last change (Ctrl + Z) and save again.

---

## 3. Where to put images

Drop them into \`public/images/\`. For project images, make a sub-folder per project:

    public/images/projects/my-game/cover.jpg

Then in the content file, write the path **starting with \`/\` and without the word \`public\`**:

    thumbnail: "/images/projects/my-game/cover.jpg",

Use \`.jpg\`, \`.png\` or \`.webp\`. Lowercase names, no spaces.

---

## 4. Where to put videos

Drop them into \`public/videos/\`. Use **.mp4** — it works everywhere.
If you want a still image to show before the video plays, put it in \`public/posters/\`.

---

## 5. How to replace a video

Example: the gameplay video on the homepage and the Game Development page.

1. Copy your file to \`public/videos/game-demo.mp4\`
2. Open \`content/media.ts\`
3. Find \`gameDemo\` and change it to:

       gameDemo: {
         src: "/videos/game-demo.mp4",
         poster: "",                    // or "/posters/game-demo.jpg"
         title: "Game development demo",
       },

That's it. Every video on the site works the same way. While \`src\` is empty (\`""\`), the site shows a designed
"coming soon" box instead of a broken player.

---

## 6. How to replace a placeholder project

Open \`content/projects.ts\`. Each project is a block between \`{\` and \`},\`. Change the values:

    {
      title: "My Actual Game",
      slug: "my-actual-game",           // becomes the web address: /projects/my-actual-game
      category: "game",                 // game | animation | editing | experiment
      description: "One or two sentences.",
      year: "2024",
      role: "Programmer & designer",
      technologies: ["Unity", "C#"],    // whatever you actually used
      featured: true,                   // true = shows on the homepage
      status: "released",               // placeholder | prototype | in-progress | released | archived
      thumbnail: "/images/projects/my-actual-game/cover.jpg",
      video: "/videos/my-actual-game.mp4",
      gallery: ["/images/projects/my-actual-game/1.jpg", "/images/projects/my-actual-game/2.jpg"],
      links: [{ label: "Play it", href: "https://..." }],
      longDescription: "A longer write-up. Press Enter twice for a new paragraph.",
    },

Remove any line you don't need (except \`title\`, \`slug\`, \`category\`, \`description\`).
Change \`status\` from \`"placeholder"\` to something else and the yellow PLACEHOLDER tag disappears.

---

## 7. How to add a new project

1. In \`content/projects.ts\`, copy an existing block from \`{\` to \`},\`
2. Paste it right after another block, inside the big list
3. Change the values — make sure the \`slug\` is different from every other project
4. Save. The project appears on the Projects page, in the sitemap, and (if \`featured: true\`) on the homepage.

---

## 8. How to change your email and social links

Open \`content/site.ts\`:

    contact: {
      email: "hello@yourdomain.com",
      ...
    },
    socials: [
      { label: "GitHub",    href: "https://github.com/yourname" },
      { label: "Instagram", href: "" },     // empty = shown as "soon", not clickable
      ...
    ],

To connect the contact form so messages actually reach you, sign up for a free form service
(for example Formspree), copy the URL it gives you, and set it as \`CONTACT_WEBHOOK_URL\`
(see section 10). Until then the form politely tells visitors it isn't connected yet.

---

## 9. Building the production version

    npm run build

If this finishes without red errors, the site is ready to go live. You can preview the built version with:

    npm run start

---

## 10. Putting it online

The easiest way is **Vercel** (made by the people who make Next.js, free for personal sites).

1. Put this folder on GitHub (create a repository and upload the folder — GitHub Desktop makes this easy).
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, pick the repository, click **Deploy**.
3. After the first deploy, open the project's **Settings → Environment Variables** and add:
   - \`NEXT_PUBLIC_SITE_URL\` = your real address, e.g. \`https://derfive.com\`
   - \`CONTACT_WEBHOOK_URL\` = your form service URL (optional, see section 8)
4. Click **Redeploy**.

From now on, every time you push a change to GitHub, the site updates by itself in about a minute.

---

## If something breaks

- Page is blank after an edit → you probably removed a quote, comma or bracket. Undo and save.
- Image/video shows "Check the file path" → the path in the content file doesn't match the file name in \`public/\`.
  Paths are case-sensitive: \`Cover.jpg\` and \`cover.jpg\` are different.
- Anything else → run \`npm run build\` and read the first error message; it says which file and line.
`;

// ---------------------------------------------------------------------------
// Write everything
// ---------------------------------------------------------------------------
const parts = payload.split(/^\/\/\/\/ FILE: (.+)$/m);
let written = 0;

for (let i = 1; i < parts.length; i += 2) {
  const path = parts[i].trim();
  const content =
    parts[i + 1]
      .replace(/^\n/, "")
      .replace(/\s+$/, "")
      .replace(/\\`/g, "`")
      .replace(/\\\$\{/g, "${") + "\n";

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
  written++;
}

// Empty media folders (kept in git via .gitkeep)
for (const dir of ["public/images/projects", "public/videos", "public/posters"]) {
  mkdirSync(dir, { recursive: true });
  const keep = join(dir, ".gitkeep");
  if (!existsSync(keep)) writeFileSync(keep, "");
}

console.log(`
✔ Derfive created — ${written} files written.

Next steps:
  1. npm install
  2. npm run dev
  3. open http://localhost:3000

Everything you'll want to edit is in the  content/  folder. See README.md.
`);