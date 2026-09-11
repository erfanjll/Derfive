/**
 * ============================================================
 *  SITE-WIDE TEXT & SETTINGS
 *  Name, tagline, navigation, contact info and social links.
 * ============================================================
 */

export const site = {
  name: "Erfan Jalali",
  brand: "Derfive",
  role: "Technical Artist & Game Developer",

  // Used in the browser tab and search results.
  description:
    "Derfive is the personal portfolio of Erfan Jalali — a Technical Artist & Game Developer building EMVP with Mobin Kohi, bridging engine systems and cinematic motion design as a Computer Engineering student at Shahid Beheshti University.",

  // Replace via the NEXT_PUBLIC_SITE_URL environment variable after deploying.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://derfive.example.com",

  // Facts that appear across the site. Keep them accurate. No date/year counters —
  // durations age badly, so this site describes scope and craft instead of a clock.
  facts: {
    studio: "EMVP Studio",
    partner: "Mobin Kohi",
    university: "Shahid Beheshti University",
    program: "Computer Engineering",
    identity: "Technical Artist & Game Developer",
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
    email: "Erfanjalaliaghchay@gmail.com",
    availability:
      "Open to collaborations, game jams, and any interesting conversation about games or motion.",
  },

  // ▼ Paste the full link (starting with https://) between the quotes.
  //   Empty links are shown as "coming soon" and are not clickable.
  // Discord was retired — only Telegram (@erfanjll) and Email are active.
  socials: [
    { label: "Telegram", href: "https://t.me/erfanjll" },
    { label: "GitHub", href: "" },
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
  ],
};

export type SiteConfig = typeof site;
