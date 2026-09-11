"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { motionSectionDescription } from "@/content/i18n";

/** Featured Motion — inline-playable previews of the four motion & video showcase pieces. */
export function MotionSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -100]);
  const offsets = [y0, y1, y2, y3];

  const clips = getProjectsByCategory("animation", "editing");

  return (
    <section ref={ref} className="ambient-glow wrap py-24 md:py-36" aria-labelledby="home-motion">
      <SectionHeading
        index="02"
        eyebrow="Editing & animation"
        title="Featured motion."
        description={motionSectionDescription}
      />
      <span id="home-motion" className="sr-only">Editing and animation</span>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
        {clips.map((clip, i) => (
          <motion.div
            key={clip.slug}
            style={reduce ? undefined : { y: offsets[i] }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="glow-border rounded-sm"
          >
            <VideoPlayer
              src={clip.video ?? ""}
              poster={clip.poster}
              title={clip.title}
              aspect="16/9"
              label={clip.subCategory ?? clip.title}
              index={`0${i + 1}`}
            />
            <p className="mt-3 font-body text-sm font-bold tracking-tight text-bone">{clip.title}</p>
          </motion.div>
        ))}
      </div>

      <Reveal className="mt-16">
        <Button href="/editing-animation" variant="ghost" magnetic>Editing & animation</Button>
      </Reveal>
    </section>
  );
}
