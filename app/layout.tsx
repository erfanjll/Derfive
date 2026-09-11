import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono, Vazirmatn, Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Providers } from "@/components/layout/Providers";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });
const vazir = Vazirmatn({ subsets: ["arabic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-vazir", display: "swap" });
// The site-wide display voice (Syne — see --font-display in globals.css):
// crisp editorial display headings for Home / About / Journey / Contact.
const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-syne-src", display: "swap" });
// Tech-monospace voice for game engine telemetry / CAD schematics:
// sharp, high-tech, architectural — not chunky 8-bit arcade.
const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});
const kinetic = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-kinetic-src", display: "swap" });

/**
 * Runs BEFORE React hydrates / first paint: restores the persisted theme
 * directly on <html>. Language is deliberately NOT applied here — the
 * document always stays lang="en" dir="ltr" (see TText/LanguageContext);
 * only the theme class may change pre-paint to avoid a flash.
 */
const themeBootstrap = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("derfive-theme");if(t==="light"){d.classList.add("light")}else{d.classList.remove("light")}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} — ${site.name}`, template: `%s — ${site.brand}` },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: ["Erfan Jalali", "Derfive", "game developer", "EMVP", "Shahid Beheshti University", "portfolio"],
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} — ${site.name}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: `${site.brand} — ${site.name}`, description: site.description },
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
    <html lang="en" dir="ltr" suppressHydrationWarning className={cn(manrope.variable, jetbrains.variable, vazir.variable, syne.variable, shareTechMono.variable, kinetic.variable, "grain")}>
      <body id="top" className="bg-ink text-bone antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
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
