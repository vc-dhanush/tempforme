import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, FileText } from "lucide-react";
import { Project } from "@/data/types";

const toneMap = {
  teal: "from-accent/25 via-ink-850 to-ink-900",
  copper: "from-copper/25 via-ink-850 to-ink-900",
  slate: "from-mist-400/20 via-ink-850 to-ink-900",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden">
      <Link href={`/projects/${project.slug}`} className="block">
        <div
          className={`relative h-44 bg-gradient-to-br ${toneMap[project.heroTone]} p-6`}
        >
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(62,207,178,0.2),transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex flex-wrap gap-2">
              {project.category.slice(0, 2).map((c) => (
                <span key={c} className="tag !bg-black/20 !text-white/90">
                  {c}
                </span>
              ))}
            </div>
            <p className="font-display text-lg font-semibold text-white">{project.shortTitle}</p>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/projects/${project.slug}`} className="group/title">
          <h3 className="font-display text-lg font-semibold text-white transition group-hover/title:text-accent">
            {project.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-3 text-sm prose-muted">{project.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link href={`/projects/${project.slug}`} className="btn-secondary !px-3 !py-2 text-xs">
            Details <ArrowUpRight size={14} />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost !px-2"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost !px-2"
              aria-label="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.researchSlug && (
            <Link
              href={`/research/${project.researchSlug}`}
              className="btn-ghost !px-2"
              aria-label="Research"
            >
              <FileText size={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
