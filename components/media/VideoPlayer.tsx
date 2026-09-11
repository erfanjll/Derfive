"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
   * Default = inline player with a custom overlay (play/pause, mute, progress, fullscreen).
   */
  ambient?: boolean;
  className?: string;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * The one video component used everywhere. Loads nothing until it's near the
 * viewport, shows a designed placeholder when there's no file yet, and degrades
 * gracefully if the file is missing or broken.
 *
 * Non-ambient players get an in-line custom overlay: click-to-play, mute toggle,
 * a seekable progress bar, and a native Fullscreen API button. Going fullscreen
 * and back never unmounts or reloads the <video> — playback resumes exactly
 * where it was.
 */
export function VideoPlayer({ src, poster, title, aspect = "16/9", label, index, ambient, className }: VideoPlayerProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

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

  useEffect(() => {
    const onFsChange = () => {
      const active = document.fullscreenElement === wrapRef.current;
      setIsFullscreen(active);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, []);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement === el) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  }, []);

  const seek = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = e.currentTarget;
    if (!v || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
  }, [duration]);

  if (!src) {
    return <MediaPlaceholder kind="video" label={label} caption={title} index={index} aspect={aspect} className={className} />;
  }
  if (status === "error") {
    return (
      <MediaPlaceholder kind="video" label="not found" caption={`Check the file path: ${src}`} index={index} aspect={aspect} className={className} />
    );
  }

  return (
    <figure
      ref={wrapRef}
      className={cn(
        "group relative overflow-hidden rounded-sm border border-line bg-graphite",
        aspectClass[aspect],
        isFullscreen && "!aspect-auto flex items-center justify-center bg-black",
        className,
      )}
      data-cursor={ambient ? undefined : "view"}
      onMouseEnter={() => !ambient && setShowOverlay(true)}
      onMouseLeave={() => !ambient && playing && setShowOverlay(false)}
    >
      {!poster && <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />}
      {near && (
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          title={title}
          muted={ambient ? true : muted}
          loop={ambient}
          autoPlay={ambient && !reduce}
          playsInline
          preload={ambient ? "metadata" : "none"}
          onClick={() => !ambient && togglePlay()}
          onLoadStart={() => setStatus("loading")}
          onWaiting={() => setStatus("loading")}
          onCanPlay={() => setStatus("ready")}
          onPlaying={() => setStatus("ready")}
          onError={() => setStatus("error")}
          onPlay={() => setPlaying(true)}
          onPause={() => {
            setPlaying(false);
            setShowOverlay(true);
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            setCurrent(v.currentTime);
            setProgress(v.duration ? v.currentTime / v.duration : 0);
          }}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          className={cn("h-full w-full object-cover", isFullscreen ? "max-h-screen w-auto object-contain" : "absolute inset-0")}
        />
      )}

      {status === "loading" && (
        <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-4 w-4 rounded-full border border-line border-t-signal spin-slow" />
      )}

      {label && (
        <figcaption
          data-discipline={label.toLowerCase().includes("game") ? "game" : "motion"}
          className="pointer-events-none absolute left-4 top-4 rounded-sm border border-white/10 bg-ink/70 px-2 py-1 text-[10px] uppercase text-bone backdrop-blur-sm"
        >
          {label}
        </figcaption>
      )}

      {/* Custom inline controls — never shown on ambient background clips. */}
      {!ambient && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-ink/70 via-transparent to-transparent transition-opacity duration-300",
            showOverlay || !playing ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          {/* Center play/pause button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={playing ? "Pause video" : "Play video"}
            className="m-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink/70 text-bone backdrop-blur-md transition-transform duration-300 hover:scale-105"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          {/* Bottom bar: progress, time, mute, fullscreen */}
          <div className="flex flex-col gap-2 p-3 md:p-4" onClick={(e) => e.stopPropagation()}>
            <div
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              onPointerDown={seek}
              className="group/bar relative h-1.5 w-full cursor-pointer rounded-full bg-bone/20"
            >
              <div className="absolute inset-y-0 left-0 rounded-full bg-signal" style={{ width: `${progress * 100}%` }} />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-signal opacity-0 transition-opacity group-hover/bar:opacity-100"
                style={{ left: `${progress * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-bone">
              <span className="tabular-nums">{formatTime(current)} / {formatTime(duration)}</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="hover:text-signal">
                  {muted ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0014 8v2.2l2.45 2.45c.03-.2.05-.43.05-.65zM19 12c0 .94-.2 1.82-.54 2.63l1.51 1.51A8.9 8.9 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L18.73 21 20 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8v8a4.5 4.5 0 002.5-4zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                  )}
                </button>
                <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"} className="hover:text-signal">
                  {isFullscreen ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
