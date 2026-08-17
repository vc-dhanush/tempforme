import type { Metadata } from "next";
import Image from "next/image";
import { education, person } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About",
  description: `About ${person.name} — AI/ML engineer and researcher.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Professional profile"
        description="A concise look at background, education, interests, and direction—grounded in verified experience."
      />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <div className="relative aspect-[4/5]">
                <Image
                  src={person.profileImage}
                  alt={`${person.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <p className="eyebrow">Introduction</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white">
                {person.name}
              </h2>
              <p className="mt-2 text-accent">{person.title}</p>
              <div className="mt-6 space-y-4">
                {person.aboutLong.map((p) => (
                  <p key={p} className="prose-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page">
          <p className="eyebrow">Education</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white">Timeline</h2>
          <div className="mt-10 space-y-6">
            {education.map((ed, i) => (
              <Reveal key={ed.institution} delay={i * 0.05}>
                <article className="card-surface relative overflow-hidden p-6">
                  <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {ed.degree}
                    </h3>
                    <span className="text-sm text-mist-400">{ed.duration}</span>
                  </div>
                  <p className="mt-1 text-accent">
                    {ed.institution} · {ed.field}
                  </p>
                  <p className="mt-1 text-sm text-mist-400">{ed.location}</p>
                  <ul className="mt-4 space-y-1.5 text-sm prose-muted">
                    {ed.highlights.map((h) => (
                      <li key={h}>• {h}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full p-6">
              <h3 className="font-display text-xl font-semibold text-white">Career interests</h3>
              <ul className="mt-4 space-y-2 text-sm prose-muted">
                {person.careerInterests.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="card-surface h-full p-6">
              <h3 className="font-display text-xl font-semibold text-white">Technical interests</h3>
              <ul className="mt-4 space-y-2 text-sm prose-muted">
                {person.technicalFocus.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-surface h-full p-6">
              <h3 className="font-display text-xl font-semibold text-white">
                Areas of interest
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {person.interests.map((i) => (
                  <span key={i} className="tag">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card-surface h-full p-6">
              <h3 className="font-display text-xl font-semibold text-white">
                Professional goals
              </h3>
              <ul className="mt-4 space-y-2 text-sm prose-muted">
                {person.goals.map((g) => (
                  <li key={g}>• {g}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm italic text-mist-400">&ldquo;{person.mantra}&rdquo;</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="See the work behind the profile"
        description="Explore projects, research, and experience in detail."
        primaryHref="/projects"
        primaryLabel="View projects"
        secondaryHref="/experience"
        secondaryLabel="View experience"
      />
    </>
  );
}
