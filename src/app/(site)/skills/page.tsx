import type { Metadata } from "next";
import { person, skillCategories } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technical skills of ${person.name} across ML, vision, frameworks, and development.`,
};

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="Skills"
        title="Technical skills"
        description="Organized by category. No fabricated proficiency percentages—only technologies used in projects and experience."
      />
      <section className="section-pad">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.03}>
              <article className="card-surface h-full p-6 transition hover:-translate-y-0.5">
                <h2 className="font-display text-xl font-semibold text-white">{cat.name}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tag !px-3 !py-1.5">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA
        title="See skills applied in context"
        description="Projects and research pages show how these tools were used end-to-end."
        primaryHref="/projects"
        primaryLabel="View projects"
        secondaryHref="/research"
        secondaryLabel="View research"
      />
    </>
  );
}
