"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/content/types";
import { categoryLabels } from "@/content/projects";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { MediaImage } from "@/components/media/MediaImage";
import { useLanguage } from "@/context/LanguageContext";
import { projectTranslations } from "@/content/i18n";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "large" | "regular";
}

export function ProjectCard({ project, index, size = "regular" }: ProjectCardProps) {
  const { t } = useLanguage();
  const aspect = size === "large" ? "16/10" : "4/5";
  const label = categoryLabels[project.category];
  const num = String(index + 1).padStart(2, "0");
  const translation = projectTranslations[project.slug];
  const title = translation ? t(translation.title) : project.title;
  const description = translation?.description ? t(translation.description) : project.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group [transform:translate3d(0,0,0)] [will-change:transform]"
    >
      <Link href={`/projects/${project.slug}`} className="block" data-cursor="view" aria-label={`${title} — ${label}`}>
        <div className="glow-border relative overflow-hidden rounded-sm border border-transparent">
          {project.video ? (
            <VideoPlayer src={project.video} poster={project.poster} title={title} aspect={aspect} ambient />
          ) : (
            <MediaImage src={project.thumbnail ?? ""} alt={title} aspect={aspect} label={label} index={num} hoverZoom sizes={size === "large" ? "(max-width:768px) 100vw, 60vw" : "(max-width:768px) 100vw, 40vw"} />
          )}
          {project.status === "placeholder" && (
            <span className="pulse-glow absolute right-3 top-3 rounded-sm border border-signal/50 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              placeholder
            </span>
          )}
          <span aria-hidden className="pointer-events-none absolute inset-0 border border-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <h3 className={cn("font-body font-black tracking-tight text-bone transition-colors group-hover:text-signal", size === "large" ? "text-2xl md:text-4xl" : "text-xl md:text-2xl")}>
              {title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{description}</p>
          </div>
          <div className="shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
            <p>{label}</p>
            <p>{project.subCategory ?? project.role ?? "—"}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
