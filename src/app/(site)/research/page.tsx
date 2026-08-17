import type { Metadata } from "next";
import { person, researchInterests, researchPapers, achievements } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { ResearchCard } from "@/components/ResearchCard";
import { Reveal } from "@/components/Reveal";
import { Award } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research",
  description: `Research papers, interests, and awards for ${person.name}.`,
};

export default function ResearchPage() {
  const awards = achievements.filter((a) => a.category === "Research");

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Research & publications"
        description="Peer-reviewed work, conference presentation, and research interests—treated as a first-class part of the portfolio."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="mb-8 rounded-2xl border border-copper/25 bg-copper/10 p-6">
            <div className="flex items-center gap-2 text-copper-soft">
              <Award size={18} />
              <p className="text-sm font-semibold uppercase tracking-wider">Major award</p>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">
              Best Paper Award — ICECIT 2025, IEEE
            </h2>
            <p className="mt-2 max-w-3xl prose-muted">
              Recognized for research on Non-Invasive Continuous Blood Glucose Monitoring Using
              Near-Infrared Spectroscopy and Machine Learning.
            </p>
            <Link href="/achievements" className="link-arrow mt-4">
              View achievements →
            </Link>
          </div>

          <div className="space-y-6">
            {researchPapers.map((paper) => (
              <Reveal key={paper.slug}>
                <ResearchCard paper={paper} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-surface p-6">
              <h2 className="font-display text-xl font-semibold text-white">
                Research interests
              </h2>
              <ul className="mt-4 space-y-2 text-sm prose-muted">
                {researchInterests.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="card-surface p-6">
              <h2 className="font-display text-xl font-semibold text-white">
                Conference & awards
              </h2>
              <ul className="mt-4 space-y-3">
                {awards.map((a) => (
                  <li key={a.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="font-medium text-white">{a.title}</p>
                    <p className="mt-1 text-sm text-mist-400">
                      {a.event} · {a.date}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
