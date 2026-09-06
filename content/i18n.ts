/**
 * ============================================================
 *  I18N DICTIONARY (English / Persian)
 *  Central place for every bilingual string on the site.
 * ============================================================
 */

export type Lang = "en" | "fa";

export const motto = {
  en: "Built with bugs, fixed with love.",
  fa: "ساخته‌شده با باگ، اصلاح‌شده با عشق.",
};

export const nav = {
  About: { en: "About", fa: "درباره من" },
  Games: { en: "Games", fa: "بازی‌ها" },
  Motion: { en: "Motion", fa: "موشن و ویدیو" },
  Projects: { en: "Projects", fa: "پروژه‌ها" },
  Journey: { en: "Journey", fa: "مسیر من" },
  Contact: { en: "Contact", fa: "تماس" },
  Home: { en: "Home", fa: "خانه" },
} as const;

export const persona = {
  identity: {
    en: "Technical Artist & Game Developer",
    fa: "توسعه‌دهنده بازی و آرتیست فنی",
  },
  university: {
    en: "SHAHID BEHESHTI UNIVERSITY",
    fa: "دانشگاه شهید بهشتی",
  },
  bio: {
    en: "Technical Artist & Game Developer studying Computer Engineering at Shahid Beheshti University — fusing systems programming with cinematic motion design and real-time graphics.",
    fa: "توسعه‌دهنده بازی و آرتیست فنی، دانشجوی مهندسی کامپیوتر در دانشگاه شهید بهشتی — ترکیب برنامه‌نویسی سیستمی با طراحی موشن سینمایی و گرافیک بلادرنگ.",
  },
  studioBadge: {
    en: "EMVP Studio",
    fa: "استودیو EMVP",
  },
};

export const buttons = {
  seeWork: { en: "See the work", fa: "مشاهده آثار" },
  myJourney: { en: "My Journey", fa: "مسیر من" },
  allProjects: { en: "All Projects", fa: "همه پروژه‌ها" },
  gameDevelopment: { en: "Game development", fa: "توسعه بازی" },
  editingAnimation: { en: "Editing & animation", fa: "تدوین و انیمیشن" },
  sayHi: { en: "Say hi", fa: "سلام کن" },
  scrollToExplore: { en: "SCROLL TO EXPLORE ↓", fa: "برای کاوش اسکرول کنید ↓" },
};

/** Project title / description overrides, keyed by the project's `slug`. */
export const projectTranslations: Record<string, { title: { en: string; fa: string }; description?: { en: string; fa: string } }> = {
  "emvp-core-project": {
    title: { en: "EMVP Core Project", fa: "پروژه اصلی EMVP" },
    description: {
      en: "Collaborative indie game focused on expressive movement mechanics, tight input response, and custom real-time physics interactions.",
      fa: "بازی ایندی مشترک با تمرکز بر مکانیک‌های حرکتی بیانگر، پاسخ‌دهی دقیق به ورودی و تعاملات فیزیک بلادرنگ اختصاصی (همکاری با مبین کوهی).",
    },
  },
  "sbu-ap-architecture-engine": {
    title: { en: "SBU AP Architecture & Engine", fa: "معماری و انجین پیشرفته بهشتی" },
    description: {
      en: "Robust academic software engine implementing strict design patterns, concurrent state loops, and responsive UI components.",
      fa: "انجین نرم‌افزاری دانشگاهی مستحکم با پیاده‌سازی الگوهای طراحی دقیق، حلقه‌های وضعیت هم‌زمان و رابط کاربری واکنش‌گرا.",
    },
  },
  "micro-narrative-15s-short": {
    title: { en: "2D Animation", fa: "انیمیشن دو بعدی" },
    description: {
      en: "Stylized keyframe character animation focusing on comedic staging, secondary motion, and expressive timing.",
      fa: "انیمیشن کاراکتر کی‌فریم استایلایز‌شده با تمرکز بر صحنه‌آرایی طنز، حرکت ثانویه و تایمینگ بیانگر.",
    },
  },
  "sonic-resonance-equalizer-kinetic-type": {
    title: { en: "Music Equalizer", fa: "موزیک اکولایزر" },
    description: {
      en: "Dynamic music spectrum visualizer synchronized with high-energy typography and bass-reactive visual pulses.",
      fa: "ویژوالایزر پویای طیف موسیقی هماهنگ با تایپوگرافی پرانرژی و پالس‌های بصری واکنش‌پذیر به باس.",
    },
  },
  "rhythm-cut-cinematic-edit": {
    title: { en: "Rhythm Cut (Cinematic Edit)", fa: "تدوین سینمایی و ادیت فیلم" },
  },
  "identity-reveal-logo-motion": {
    title: { en: "Identity Reveal (Logo Motion)", fa: "لوگو موشن و جلوه‌های بصری" },
  },
};
