"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, ProjectCategory } from "@/content/types";
import { categoryLabels } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = "all" | ProjectCategory;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const filters: Filter[] = ["all", ...(Object.keys(categoryLabels) as ProjectCategory[])];

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f === filter;
          const count = f === "all" ? projects.length : projects.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                active ? "border-signal text-ink" : "border-line text-mist hover:border-mist hover:text-bone",
              )}
            >
              {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-signal" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">
                {f === "all" ? "All" : categoryLabels[f]} <span className="opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-8 md:grid-cols-6 md:gap-x-8 md:gap-y-20">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => {
            const large = !!p.featured;
            return (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className={cn(large ? "md:col-span-4" : "md:col-span-2", i % 3 === 1 && "md:mt-16")}
              >
                <ProjectCard project={p} index={i} size={large ? "large" : "regular"} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.14em] text-mist">Nothing here yet.</p>
      )}
    </div>
  );
}
