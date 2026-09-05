"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { aspectClass, type Aspect } from "@/lib/media";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface VideoPlayerProps {
  /** Path inside /public, e.g. "/videos/game-demo.mp4". Empty string shows a placeholder. */
  src: string;
  poster?: string;
  title: string;
  aspect?: Aspect;
  /** Small mono label in the corner, e.g. "GAME". */
  label?: string;
  index?: string;
  /**
   * ambient = silent looping background clip (autoplays muted while visible, no controls).
   * Default = normal player with controls, never autoplays, never plays sound on its own.
   */
  ambient?: boolean;
  className?: string;
}

/**
 * The one video component used everywhere. Loads nothing until it's near the
 * viewport, shows a designed placeholder when there's no file yet, and degrades
 * gracefully if the file is missing or broken.
 */
export function VideoPlayer({ src, poster, title, aspect = "16/9", label, index, ambient, className }: VideoPlayerProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  // Mount the <video> only when it's close to the viewport; pause ambient clips when hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !src) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        const v = videoRef.current;
        if (ambient && v) {
          if (entry.isIntersecting && !reduce) v.play().catch(() => {});
          else v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, ambient, reduce]);

  if (!src) {
    return <MediaPlaceholder kind="video" label={label} caption={title} index={index} aspect={aspect} className={className} />;
  }
  if (status === "error") {
    return (
      <MediaPlaceholder kind="video" label="not found" caption={`Check the file path: ${src}`} index={index} aspect={aspect} className={className} />
    );
  }

  return (
    <figure ref={wrapRef} className={cn("group relative overflow-hidden rounded-sm border border-line bg-graphite", aspectClass[aspect], className)} data-cursor={ambient ? undefined : "view"}>
      {!poster && <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />}
      {near && (
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          title={title}
          controls={!ambient}
          muted={ambient}
          loop={ambient}
          autoPlay={ambient && !reduce}
          playsInline
          preload={ambient ? "metadata" : "none"}
          onLoadStart={() => setStatus("loading")}
          onWaiting={() => setStatus("loading")}
          onCanPlay={() => setStatus("ready")}
          onPlaying={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {status === "loading" && (
        <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-4 w-4 rounded-full border border-line border-t-signal spin-slow" />
      )}
      {label && (
        <figcaption className="pointer-events-none absolute left-4 top-4 rounded-sm bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone backdrop-blur-sm">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
