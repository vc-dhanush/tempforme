import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Experience } from "@/data/types";
import { Reveal } from "./Reveal";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-white/10 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">
      {items.map((item, index) => {
        const left = index % 2 === 0;
        return (
          <Reveal key={item.id} delay={index * 0.05}>
            <div
              className={`relative grid gap-4 md:grid-cols-2 ${
                left ? "" : "md:[&>*:first-child]:col-start-2"
              }`}
            >
              <span className="absolute left-[7px] top-6 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(62,207,178,0.15)] md:left-1/2 md:-translate-x-1/2" />
              <article
                className={`card-surface ml-8 p-6 md:ml-0 ${
                  left ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag">{item.type}</span>
                  <span className="text-xs text-mist-400">{item.duration}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-accent">
                  {item.organization} · {item.location}
                </p>
                <p className="mt-3 text-sm prose-muted">{item.summary}</p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-mist-400">
                    Responsibilities
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-mist-300">
                    {item.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {item.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {item.contributions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-mist-400">
                      Key contributions
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-mist-300">
                      {item.contributions.map((c) => (
                        <li key={c}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  {item.links?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary !py-2 text-xs"
                    >
                      {link.label} <ExternalLink size={12} />
                    </a>
                  ))}
                  {item.relatedProjectSlugs?.map((slug) => (
                    <Link
                      key={slug}
                      href={`/projects/${slug}`}
                      className="btn-ghost text-xs"
                    >
                      Related project →
                    </Link>
                  ))}
                </div>
              </article>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
