"use client";

import { useState } from "react";
import { MediaImage } from "./MediaImage";
import type { ImageAsset } from "@/content/media";

/** Drag (or use arrow keys) to compare two images. Works with placeholders too. */
export function BeforeAfter({ before, after }: { before: ImageAsset; after: ImageAsset }) {
  const [value, setValue] = useState(50);

  return (
    <div className="relative select-none">
      <MediaImage src={after.src} alt={after.alt} label="after" aspect="16/9" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <MediaImage src={before.src} alt={before.alt} label="before" aspect="16/9" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-signal" style={{ left: `${value}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-signal bg-ink font-mono text-[10px] text-signal">
          ⇔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
