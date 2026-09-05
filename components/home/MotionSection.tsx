"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { media } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const clips = [media.videos.animationDemo, media.videos.editingDemo, media.videos.motionExtra01];

/** Three vertical clips drifting at different speeds — a different rhythm from the game section. */
export function MotionSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -20]);
  const offsets = [y0, y1, y2];

  return (
    <section ref={ref} className="ambient-glow wrap py-24 md:py-36" aria-labelledby="home-motion">
      <SectionHeading
        index="02"
        eyebrow="Editing & animation"
        title="A side quest. Beginner level. Improving on purpose."
        description="Cuts, timing, simple motion. This is the part of my work that changes the fastest, and I'd rather show it early than wait until it's perfect."
      />
      <span id="home-motion" className="sr-only">Editing and animation</span>

      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {clips.map((clip, i) => (
          <motion.div
            key={clip.title}
            style={reduce ? undefined : { y: offsets[i] }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn("glow-border rounded-sm", i === 2 ? "col-span-2 md:col-span-1" : undefined)}
          >
            <VideoPlayer {...clip} aspect={i === 2 ? "16/9" : "9/16"} ambient label={i === 0 ? "animation" : i === 1 ? "editing" : "motion"} index={`0${i + 1}`} className={i === 2 ? "md:aspect-[9/16]" : undefined} />
          </motion.div>
        ))}
      </div>

      <Reveal className="mt-16">
        <Button href="/editing-animation" variant="ghost" magnetic>Editing & animation</Button>
      </Reveal>
    </section>
  );
}
