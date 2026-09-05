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
