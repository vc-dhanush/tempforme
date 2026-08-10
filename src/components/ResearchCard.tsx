import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { ResearchPaper } from "@/data/types";

export function ResearchCard({ paper }: { paper: ResearchPaper }) {
  return (
    <article className="card-surface p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag">{paper.venue}</span>
        <span className="tag">{paper.year}</span>
        {paper.award && (
          <span className="inline-flex items-center gap-1 rounded-lg border border-copper/30 bg-copper/10 px-2.5 py-1 text-xs font-medium text-copper-soft">
            <Award size={12} /> {paper.award}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-white">{paper.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm prose-muted">{paper.abstract}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/research/${paper.slug}`} className="btn-primary !py-2">
          Read paper page <ArrowUpRight size={14} />
        </Link>
        {paper.relatedProjectSlug && (
          <Link href={`/projects/${paper.relatedProjectSlug}`} className="btn-secondary !py-2">
            Related project
          </Link>
        )}
      </div>
    </article>
  );
}
