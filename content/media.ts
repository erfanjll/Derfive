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
