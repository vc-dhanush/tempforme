import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award } from "lucide-react";
import { getResearch, researchPapers } from "@/data/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return researchPapers.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const paper = getResearch(slug);
    return {
      title: paper?.title.slice(0, 60) || "Research",
      description: paper?.abstract,
    };
  });
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getResearch(slug);
  if (!paper) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container-page relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "Paper" },
            ]}
          />
          <div className="flex flex-wrap gap-2">
            <span className="tag">{paper.venue}</span>
            <span className="tag">{paper.year}</span>
            <span className="tag">{paper.role}</span>
            {paper.award && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-copper/30 bg-copper/10 px-2.5 py-1 text-xs font-medium text-copper-soft">
                <Award size={12} /> {paper.award}
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold text-white sm:text-4xl">
            {paper.title}
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <Reveal>
              <article className="card-surface p-6">
                <h2 className="font-display text-xl font-semibold text-white">Abstract</h2>
                <p className="mt-3 prose-muted">{paper.abstract}</p>
              </article>
            </Reveal>
            <Reveal>
              <article className="card-surface p-6">
                <h2 className="font-display text-xl font-semibold text-white">Problem</h2>
                <p className="mt-3 prose-muted">{paper.problem}</p>
              </article>
            </Reveal>
            <Reveal>
              <article className="card-surface p-6">
                <h2 className="font-display text-xl font-semibold text-white">Methodology</h2>
                <ul className="mt-3 space-y-2 text-sm text-mist-300">
                  {paper.methodology.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal>
              <article className="card-surface p-6">
                <h2 className="font-display text-xl font-semibold text-white">
                  System architecture
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-mist-300">
                  {paper.systemArchitecture.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal>
              <article className="card-surface p-6">
                <h2 className="font-display text-xl font-semibold text-white">Results</h2>
                <ul className="mt-3 space-y-2 text-sm text-mist-300">
                  {paper.results.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal>
              <article className="card-surface p-6">
                <h2 className="font-display text-xl font-semibold text-white">Limitations</h2>
                <ul className="mt-3 space-y-2 text-sm text-mist-300">
                  {paper.limitations.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal>
              <article className="card-surface p-6">
                <h2 className="font-display text-xl font-semibold text-white">Future work</h2>
                <ul className="mt-3 space-y-2 text-sm text-mist-300">
                  {paper.futureWork.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-mist-400">
                Publication details
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="text-mist-500">Conference</dt>
                  <dd className="text-mist-200">{paper.publicationDetails.conference}</dd>
                </div>
                <div>
                  <dt className="text-mist-500">Publisher</dt>
                  <dd className="text-mist-200">{paper.publicationDetails.publisher}</dd>
                </div>
                <div>
                  <dt className="text-mist-500">Year</dt>
                  <dd className="text-mist-200">{paper.publicationDetails.year}</dd>
                </div>
                <div>
                  <dt className="text-mist-500">Authors</dt>
                  <dd className="text-mist-200">
                    {paper.publicationDetails.authors.join(", ")}
                  </dd>
                </div>
              </dl>
              {paper.publicationDetails.pdfUrl && (
                <a
                  href={paper.publicationDetails.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-4 w-full"
                >
                  Paper PDF
                </a>
              )}
            </div>
            <div className="card-surface p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-mist-400">
                Related
              </h3>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {paper.relatedProjectSlug && (
                  <Link
                    href={`/projects/${paper.relatedProjectSlug}`}
                    className="text-mist-300 hover:text-accent"
                  >
                    Related project →
                  </Link>
                )}
                <Link href="/achievements" className="text-mist-300 hover:text-accent">
                  Achievements →
                </Link>
                <Link href="/research" className="text-mist-300 hover:text-accent">
                  ← All research
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
