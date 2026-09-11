/**
 * ============================================================
 *  I18N — English / Persian (scoped translation layer)
 *
 *  RULES (enforced by <TText>, components/ui/TText.tsx):
 *   1. Navbar, section headers, project titles, buttons and UI
 *      chrome are ALWAYS English — they never appear in this file.
 *   2. ONLY long-form descriptions/paragraphs are translated.
 *      Every entry is an { en, fa } pair; <TText> renders the
 *      Persian variant as a self-contained RTL island (dir + lang
 *      + Vazirmatn on the paragraph element only), so the document
 *      stays lang="en" dir="ltr" and the custom cursor / layout
 *      math are never affected.
 * ============================================================
 */

export type Lang = "en" | "fa";

export interface Bilingual {
  en: string;
  fa: string;
}

/** Brand tagline — Latin chrome, never translated. */
export const motto = "Built with bugs, fixed with love.";

/* ---------- Home: hero ---------- */
export const heroBio: Bilingual = {
  en: "Technical Artist & Game Developer studying Computer Engineering at Shahid Beheshti University — fusing systems programming with cinematic motion design and real-time graphics.",
  fa: "توسعه‌دهنده بازی و آرتیست فنی، دانشجوی مهندسی کامپیوتر دانشگاه شهید بهشتی — ترکیب برنامه‌نویسی سیستمی با طراحی موشن سینمایی و گرافیک بلادرنگ.",
};

/* ---------- Home: games section description ---------- */
export const gamesSectionDescription: Bilingual = {
  en: "Built at EMVP Studio, together with Mobin Kohi — and inside Shahid Beheshti University's Computer Engineering coursework. Systems programming meets technical art here.",
  fa: "ساخته‌شده در استودیو EMVP همراه با مبین کوهی — و در قالب دروس مهندسی کامپیوتر دانشگاه شهید بهشتی. اینجا برنامه‌نویسی سیستمی با آرت فنی گره می‌خورد.",
};

/* ---------- Home: motion section description ---------- */
export const motionSectionDescription: Bilingual = {
  en: "Character animation, kinetic typography, cinematic editing, and motion graphics — playable right where they sit.",
  fa: "انیمیشن کاراکتر، تایپوگرافی کینتیک، تدوین سینمایی و موشن گرافیک — همه همین‌جا و بدون خروج از صفحه قابل پخش‌اند.",
};

/* ---------- Home contact CTA + contact page availability ---------- */
export const contactAvailability: Bilingual = {
  en: "Open to collaborations, game jams, and any interesting conversation about games or motion.",
  fa: "برای همکاری، گیم‌جم‌ها و هر گفت‌وگوی جالبی درباره بازی یا موشن در دسترس هستم.",
};

/* ---------- Journey stage bodies (FA, keyed by stage id) ---------- */
export const journeyBodiesFa: Record<string, string> = {
  inception: "شروع برنامه‌نویسی با C#، یادگیری مکانیک‌های اصلی انجین، و هم‌بنیان‌گذاری همکاری EMVP با مبین کوهی.",
  "visual-synthesis": "گسترش به افترافکت، تدوین سینمایی و انیمیشن کی‌فریم برای پل‌زدن میان هنرهای بصری و کد.",
  "engineering-grounding": "پذیرش در دانشگاه شهید بهشتی و تعمیق تسلط فنی بر ساختار داده، برنامه‌نویسی هم‌زمان و معماری شیءگرا.",
  horizon: "توسعه مکانیک‌های تعاملی مقیاس‌پذیر بازی، تولیدات صوتی‌تصویری غنی‌تر و پیشبرد ورک‌فلوهای آرت فنی.",
};

/* ---------- About page ---------- */
export const aboutParagraphsFa: string[] = [
  "من عرفان جلالی هستم. در EMVP همراه با مبین کوهی بازی می‌سازم؛ جایی که بخش جالب ماجرا به‌ندرت ایده اول است و تقریباً همیشه تکراری است که بعد از آن می‌آید.",
  "در کنار برنامه‌نویسی، در موشن گرافیک و تدوین سینمایی کار می‌کنم. دیدن سیستم‌های انجین و طراحی موشن به‌عنوان یک رشته به‌جای دو رشته، یعنی همان چیزی که من از «آرتیست فنی» می‌فهمم.",
];

/** FA bodies for the principles cards, keyed by the English card title. */
export const aboutPrinciplesFa: Record<string, string> = {
  "Prototype ugly, fast.": "یک آشفتگی قابل‌بازی بیشتر از یک سند زیبا درس می‌دهد.",
  "Finish things.": "کوچک و تمام‌شده از بزرگ و خیالی بهتر است.",
  "Keep the weird parts.": "ایده عجیب معمولاً همان ایده‌ای است که ارزش محافظت دارد.",
};

/* ---------- Game development page ---------- */
export const gamePageCopy = {
  intro: {
    en: "Building at EMVP Studio, together with Mobin Kohi — as a Technical Artist bridging engine systems and motion design. This page is where the games live — titles, roles, tools and footage land here as they become ready to show.",
    fa: "ساخت در استودیو EMVP همراه با مبین کوهی — به‌عنوان آرتیست فنی در نقطه اتصال سیستم‌های انجین و طراحی موشن. این صفحه خانه بازی‌هاست؛ عنوان‌ها، نقش‌ها، ابزارها و ویدیوها به‌محض آماده‌شدن همین‌جا قرار می‌گیرند.",
  },
  studioBody: {
    en: "Where systems programming and technical art come together. Specific titles and responsibilities are listed here as they're added.",
    fa: "جایی که برنامه‌نویسی سیستمی و آرت فنی به هم می‌رسند. عنوان‌های دقیق و مسئولیت‌ها به‌مرور و هم‌زمان با اضافه‌شدن‌شان اینجا فهرست می‌شوند.",
  },
  collaborationBody: {
    en: "A long two-person collaboration is its own kind of education — in scope, in disagreement, and in actually finishing.",
    fa: "یک همکاری بلندمدت دونفره خودش نوعی آموزش است — در تعیین دامنه، در اختلاف نظر، و در واقع تمام‌کردن کار.",
  },
  projectsDescription: {
    en: "Every entry here is edited in content/projects.ts.",
    fa: "هر ورودی این بخش در content/projects.ts ویرایش می‌شود.",
  },
  nextBody: {
    en: "New games and prototypes get added as they're playable — not before. If you want to talk about any of it, the door is open.",
    fa: "بازی‌ها و نمونه‌های اولیه تازه به‌محض قابل‌بازی‌شدن اضافه می‌شوند — نه زودتر. اگر دوست داری درباره هرکدام صحبت کنی، در باز است.",
  },
};

/* ---------- Editing & animation page ---------- */
export const motionPageCopy = {
  intro: {
    en: "I'm early in editing and animation and this page says so on purpose. It's the part of my work that changes fastest — so rather than wait until it's polished, it goes up as it improves.",
    fa: "در تدوین و انیمیشن تازه‌کارم و این صفحه آگاهانه همین را می‌گوید. این بخش از کارم سریع‌ترین تغییر را دارد — پس به‌جای صبر تا رسیدن به نسخه پولیش‌شده، همان‌طور که بهتر می‌شود منتشرش می‌کنم.",
  },
  beforeAfterDescription: {
    en: "Drag the handle. Replace the two images in content/media.ts under images.before and images.after.",
    fa: "دسته را بکشید. دو تصویر را در content/media.ts زیر images.before و images.after جایگزین کنید.",
  },
  /** FA step bodies, keyed by the English step title. */
  approachBodies: {
    "Study the cut": "یک کار خوب تماشا کن، کندش کن، و بفهم چرا تایمینگش درست حس می‌شود.",
    "Rebuild it small": "به‌جای دویدن دنبال یک اثر تمام‌شده، هر بار یک ایده را بازسازی کن.",
    "Ship the rough version": "منتشرش کن، یک هفته بعد نگاهش کن، و بهتر از قبل تکرارش کن.",
  } as Record<string, string>,
  moreBody: {
    en: "More pieces get added here as they're finished. The bar is \"would I show this to someone\" — not perfection.",
    fa: "قطعه‌های بیشتر با تمام‌شدن‌شان همین‌جا اضافه می‌شوند. معیار این است: «آیا حاضرم این را به کسی نشان بدهم؟» — نه کمال.",
  },
};

/* ---------- Projects index page ---------- */
export const projectsPageIntro: Bilingual = {
  en: "Everything in one place. Slots marked \"placeholder\" are waiting for real work to replace them.",
  fa: "همه‌چیز یک‌جا. جایگاه‌های علامت‌خورده با «placeholder» منتظر کار واقعی هستند تا جای آن‌ها را بگیرند.",
};

/* ---------- 404 + project-detail fallback copy ---------- */
export const notFoundCopy: Bilingual = {
  en: "This page doesn't exist — or hasn't been built yet. Either way, the way back is below.",
  fa: "این صفحه وجود ندارد — یا هنوز ساخته نشده است. در هر صورت، راه بازگشت پایین است.",
};

export const detailComingSoon: Bilingual = {
  en: "The full write-up for this project hasn't been added yet. It'll cover what it is, how it was made, and what was learned.",
  fa: "متن کامل این پروژه هنوز اضافه نشده است. این متن به چیستی پروژه، نحوه ساخت آن و درس‌هایی که از آن گرفتیم خواهد پرداخت.",
};

/* ---------- Project detail descriptions (keyed by slug; en matches content/projects.ts) ---------- */
export const projectDescriptions: Record<string, Bilingual> = {
  "emvp-core-project": {
    en: "Collaborative indie game focused on expressive movement mechanics, tight input response, and custom real-time physics interactions.",
    fa: "بازی ایندی مشترک با تمرکز بر مکانیک‌های حرکتی بیانگر، پاسخ‌دهی دقیق به ورودی و تعاملات فیزیک بلادرنگ اختصاصی (همکاری با مبین کوهی).",
  },
  "sbu-ap-architecture-engine": {
    en: "Robust academic software engine implementing strict design patterns, concurrent state loops, and responsive UI components.",
    fa: "انجین نرم‌افزاری دانشگاهی مستحکم با پیاده‌سازی الگوهای طراحی دقیق، حلقه‌های وضعیت هم‌زمان و رابط کاربری واکنش‌گرا.",
  },
  "micro-narrative-15s-short": {
    en: "Stylized keyframe character animation focusing on comedic staging, secondary motion, and expressive timing.",
    fa: "انیمیشن کاراکتر کی‌فریم استایلایز‌شده با تمرکز بر صحنه‌آرایی طنز، حرکت ثانویه و تایمینگ بیانگر.",
  },
  "sonic-resonance-equalizer-kinetic-type": {
    en: "Dynamic music spectrum visualizer synchronized with high-energy typography and bass-reactive visual pulses.",
    fa: "ویژوالایزر پویای طیف موسیقی هماهنگ با تایپوگرافی پرانرژی و پالس‌های بصری واکنش‌پذیر به باس.",
  },
  "rhythm-cut-cinematic-edit": {
    en: "High-tempo montage showcasing match cuts, pace control, immersive sound design, and atmospheric grading.",
    fa: "مونتاژ پرتمپو با نمایش کات‌های منطبق، کنترل ریتم، طراحی صدای فراگیر و گریدینگ اتمسفریک.",
  },
  "identity-reveal-logo-motion": {
    en: "Futuristic brand sting integrating volumetric glow, holographic UI overlays, and particle disintegration.",
    fa: "استینگ برند آینده‌نگر با درهم‌آمیختن درخشش حجمی، لایه‌های رابط هولوگرافیک و فروپاشی ذرات.",
  },
};
