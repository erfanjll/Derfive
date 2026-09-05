"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HeroFallback } from "./HeroFallback";

// Loaded only in the browser, only when the hero mounts. Keeps three.js out of the main bundle.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function detectWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** If anything inside the 3D scene throws, show the 2D fallback instead of a broken page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <HeroFallback showShape /> : this.props.children;
  }
}

export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const lite = useMediaQuery("(max-width: 768px)");

  useEffect(() => setSupported(detectWebGL()), []);

  // Stop rendering frames when the hero is off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <HeroFallback showShape={supported === false} />
      {supported && (
        <SceneBoundary>
          <HeroScene active={active} lite={lite} />
        </SceneBoundary>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
