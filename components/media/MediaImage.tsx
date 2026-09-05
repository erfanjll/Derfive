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
    return <MediaPlaceholder kind="image" label={label} caption={failed ? `Check the file path: ${src}` : alt} index={index} aspect={aspect} className={className} />;
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
