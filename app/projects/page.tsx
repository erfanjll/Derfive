import { pageMeta } from "@/lib/metadata";
import { projects } from "@/content/projects";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { TText } from "@/components/ui/TText";
import { SpotlightBackdrop } from "@/components/ui/SpotlightBackdrop";
import { projectsPageIntro } from "@/content/i18n";

export const metadata = pageMeta({
  title: "Projects",
  description: "Games, animations, edits and experiments by Erfan Jalali (Derfive).",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="wrap relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-44">
        <SpotlightBackdrop />
        <p className="label-mono mb-8">
          <span className="text-signal">04</span> — Projects · {String(projects.length).padStart(2, "0")}
        </p>
        <TextReveal
          as="h1"
          immediate
          text="Built, breaking, or about to exist."
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-bone"
        />
        <Reveal delay={0.3} className="mt-8 max-w-xl">
          <TText
            en={projectsPageIntro.en}
            fa={projectsPageIntro.fa}
            className="text-fog md:text-lg"
          />
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-40" aria-label="Project archive">
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
