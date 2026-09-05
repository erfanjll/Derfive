import { pageMeta } from "@/lib/metadata";
import { projects } from "@/content/projects";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata = pageMeta({
  title: "Projects",
  description: "Games, animations, edits and experiments by Erfan Jalali (Derfive).",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="wrap pb-16 pt-32 md:pb-20 md:pt-44">
        <p className="label-mono mb-8">
          <span className="text-signal">04</span> — Projects · {String(projects.length).padStart(2, "0")}
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Built, breaking, or about to exist."
          className="font-display text-[clamp(2.8rem,8.5vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-bone"
        />
        <Reveal delay={0.3} className="mt-8 max-w-xl">
          <p className="text-fog md:text-lg">
            Everything in one place. Slots marked <span className="font-mono text-xs uppercase tracking-widest text-signal">placeholder</span>{" "}
            are waiting for real work to replace them.
          </p>
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-40" aria-label="Project archive">
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
