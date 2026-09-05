import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/metadata";
import { projects, getProject, getNextProject, categoryLabels } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { MediaImage } from "@/components/media/MediaImage";

type Params = { params: Promise<{ slug: string }> };

const statusLabels: Record<ProjectStatus, string> = {
  placeholder: "Placeholder",
  prototype: "Prototype",
  "in-progress": "In progress",
  released: "Released",
  archived: "Archived",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMeta({ title: project.title, description: project.description, path: `/projects/${project.slug}` });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const label = categoryLabels[project.category];
  const index = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0");

  const details: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Category", value: label },
    { label: "Year", value: project.year && project.year !== "—" ? project.year : "To be added" },
    { label: "Role", value: project.role ?? "To be added" },
    { label: "Status", value: statusLabels[project.status ?? "prototype"] },
    {
      label: "Technologies",
      value: project.technologies?.length ? (
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fog">{t}</li>
          ))}
        </ul>
      ) : (
        "To be added"
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="wrap pb-12 pt-32 md:pb-16 md:pt-44">
        <Reveal>
          <Link href="/projects" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-mist hover:text-signal">
            <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" /> All projects
          </Link>
        </Reveal>
        <p className="label-mono mb-6 mt-12">
          <span className="text-signal">{index}</span> — {label}
          {project.status === "placeholder" && <span className="ml-3 rounded-sm border border-signal/50 px-2 py-0.5 text-signal">placeholder</span>}
        </p>
        <TextReveal
          as="h1"
          immediate
          text={project.title}
          className="font-body text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-bone"
        />
        <Reveal delay={0.3} className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-fog md:text-xl">{project.description}</p>
        </Reveal>
      </section>

      {/* Main media */}
      <section className="wrap" aria-label="Project media">
        <Reveal>
          {project.video ? (
            <VideoPlayer src={project.video} poster={project.poster} title={project.title} aspect="16/9" label={label} index={index} />
          ) : (
            <MediaImage src={project.thumbnail ?? ""} alt={project.title} aspect="21/9" label={label} index={index} priority sizes="100vw" className="max-md:aspect-video" />
          )}
        </Reveal>
      </section>

      {/* Details + description */}
      <section className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-4">
          <dl className="glow-border divide-y divide-line border-y border-line rounded-sm">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-3 gap-4 py-4">
                <dt className="label-mono col-span-1 pt-0.5">{d.label}</dt>
                <dd className="col-span-2 text-sm text-bone">{d.value}</dd>
              </div>
            ))}
          </dl>
          {project.links?.length ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <li key={l.href}><Button href={l.href} external variant="ghost">{l.label}</Button></li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <h2 className="label-mono mb-6">About this project</h2>
          {project.longDescription ? (
            <p className="whitespace-pre-line text-base leading-relaxed text-fog md:text-lg">{project.longDescription}</p>
          ) : (
            <div className="dot-grid rounded-sm border border-dashed border-line p-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-mist">Details coming soon</p>
              <p className="mt-3 max-w-md text-sm text-fog">
                The full write-up for this project hasn't been added yet. It'll cover what it is, how it was made, and what was learned.
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {/* Gallery */}
      {project.gallery?.length ? (
        <section className="wrap pb-20 md:pb-28" aria-label="Gallery">
          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.05} className={i % 3 === 0 ? "md:col-span-2" : undefined}>
                <MediaImage src={src} alt={`${project.title} — image ${i + 1}`} aspect={i % 3 === 0 ? "21/9" : "16/10"} index={String(i + 1).padStart(2, "0")} hoverZoom sizes="(max-width:768px) 100vw, 60vw" />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <section className="border-t border-line bg-coal" aria-label="Next project">
          <Link href={`/projects/${next.slug}`} className="group wrap flex flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-24" data-cursor="view">
            <div>
              <p className="label-mono">Next project</p>
              <p className="mt-4 font-body text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-bone transition-colors group-hover:text-signal">
                {next.title}
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-mist">{categoryLabels[next.category]} →</span>
          </Link>
        </section>
      )}
    </>
  );
}
