import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, FileText } from "lucide-react";
import { getProject, projects } from "@/data/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    return {
      title: project?.shortTitle || "Project",
      description: project?.shortDescription,
    };
  });
}

const toneMap = {
  teal: "from-accent/30 via-ink-900 to-ink-950",
  copper: "from-copper/30 via-ink-900 to-ink-950",
  slate: "from-mist-400/25 via-ink-900 to-ink-950",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections: { title: string; body?: string; list?: string[] }[] = [
    { title: "Problem statement", body: project.problem },
    { title: "Motivation", body: project.motivation },
    { title: "Proposed solution", body: project.solution },
    { title: "Architecture", list: project.architecture },
    { title: "Methodology", list: project.methodology },
    { title: "Features", list: project.features },
    { title: "Results", list: project.results },
    { title: "Challenges", list: project.challenges },
    { title: "Future improvements", list: project.futureImprovements },
  ];

  return (
    <>
      <section className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${toneMap[project.heroTone]} pt-28 pb-16`}>
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_35%)]" />
        <div className="container-page relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.shortTitle },
            ]}
          />
          <div className="flex flex-wrap gap-2">
            {project.category.map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
            <span className="tag">{project.status}</span>
            <span className="tag">{project.duration}</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-mist-200">{project.subtitle}</p>
          <p className="mt-4 max-w-3xl prose-muted">{project.shortDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <ExternalLink size={16} /> Live demo
              </a>
            )}
            {project.researchSlug && (
              <Link href={`/research/${project.researchSlug}`} className="btn-secondary">
                <FileText size={16} /> Research paper
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.03}>
                <article className="card-surface p-6">
                  <h2 className="font-display text-xl font-semibold text-white">
                    {section.title}
                  </h2>
                  {section.body && <p className="mt-3 prose-muted">{section.body}</p>}
                  {section.list && (
                    <ul className="mt-3 space-y-2 text-sm text-mist-300">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-mist-400">
                Technologies
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-surface p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-mist-400">
                Navigate
              </h3>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/projects" className="text-mist-300 hover:text-accent">
                  ← All projects
                </Link>
                {project.researchSlug && (
                  <Link
                    href={`/research/${project.researchSlug}`}
                    className="text-mist-300 hover:text-accent"
                  >
                    Related research →
                  </Link>
                )}
                <Link href="/contact" className="text-mist-300 hover:text-accent">
                  Contact →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
