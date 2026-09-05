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
