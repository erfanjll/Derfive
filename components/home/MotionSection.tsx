"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { getProjectsByCategory } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { motionSectionDescription } from "@/content/i18n";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Featured Motion — inline-playable previews of the four motion & video showcase pieces. */
export function MotionSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Parallax offsets only run on md+ two-column layouts — on mobile they
  // visually shift cards over each other in single-column flow.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -100]);
  const offsets = [y0, y1, y2, y3];

  const clips = getProjectsByCategory("animation", "editing");

  return (
    <section ref={ref} className="wrap py-24 md:py-36" aria-labelledby="home-motion">
      <SectionHeading
        index="02"
        eyebrow="Editing & animation"
        eyebrowClassName="font-kinetic"
        title="Featured motion."
        titleClassName="font-kinetic"
        description={motionSectionDescription}
      />
      <span id="home-motion" className="sr-only">Editing and animation</span>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 lg:gap-8 w-full">
        {clips.map((clip, i) => (
          <motion.div
            key={clip.slug}
            style={reduce || !isDesktop ? undefined : { y: offsets[i] }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="glow-border relative w-full flex flex-col rounded-sm"
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <VideoPlayer
                src={clip.video ?? ""}
                poster={clip.poster}
                title={clip.title}
                aspect="16/9"
                label={clip.subCategory ?? clip.title}
                index={`0${i + 1}`}
                className="!rounded-none !border-0 h-full"
              />
            </div>
            <p className="mt-3.5 px-3 flex items-center justify-between font-body text-sm font-bold tracking-tight text-bone">{clip.title}</p>
          </motion.div>
        ))}
      </div>

      <Reveal className="mt-16">
        <Button href="/editing-animation" variant="ghost" magnetic><span className="font-kinetic">Editing & animation</span></Button>
      </Reveal>
    </section>
  );
}
