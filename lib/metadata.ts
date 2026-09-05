import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // e.g. "/about"
}

/** Builds consistent title / description / canonical / social metadata for a page. */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = `${title} — ${site.brand}`;
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
