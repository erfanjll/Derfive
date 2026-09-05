import { getFeaturedProjects, projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3);
  const list = featured.length ? featured : projects.slice(0, 3);

  return (
    <section className="border-y border-line bg-coal py-24 md:py-36" aria-labelledby="home-projects">
      <div className="wrap">
        <SectionHeading index="03" eyebrow="Selected projects" title="Things I've built — and things about to be." />
        <span id="home-projects" className="sr-only">Selected projects</span>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          {list.map((p, i) => (
            <div key={p.slug} className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5 md:mt-24" : "md:col-span-12 md:w-2/3 md:place-self-end"}>
              <ProjectCard project={p} index={i} size={i === 0 ? "large" : "regular"} />
            </div>
          ))}
        </div>

        <Reveal className="mt-16 flex items-center justify-between gap-6">
          <p className="max-w-sm text-sm text-mist">Every project lives in one file. New ones drop in as they become real.</p>
          <Button href="/projects" magnetic>All projects</Button>
        </Reveal>
      </div>
    </section>
  );
}
