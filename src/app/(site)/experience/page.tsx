import type { Metadata } from "next";
import { experiences, person } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Experience",
  description: `Work experience and volunteering for ${person.name}.`,
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Professional timeline"
        description="Internships and volunteering with clear responsibilities, technologies, and contributions."
      />
      <section className="section-pad">
        <div className="container-page">
          <ExperienceTimeline items={experiences} />
        </div>
      </section>
      <CTA
        title="Prefer project depth?"
        description="Each related project page expands architecture, methodology, and outcomes."
        primaryHref="/projects"
        primaryLabel="Browse projects"
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />
    </>
  );
}
