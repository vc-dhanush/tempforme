import type { Metadata } from "next";
import { person } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { ProjectFilterGrid } from "@/components/ProjectFilterGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected AI/ML, computer vision, and software projects by ${person.name}.`,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Project discovery"
        description="Filter by domain, then open a dedicated page for problem framing, architecture, and results."
      />
      <section className="section-pad">
        <div className="container-page">
          <ProjectFilterGrid />
        </div>
      </section>
    </>
  );
}
