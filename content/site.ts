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
