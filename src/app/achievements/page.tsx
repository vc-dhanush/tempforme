import type { Metadata } from "next";
import { achievements, person } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { AchievementCard } from "@/components/AchievementCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Achievements",
  description: `Awards, hackathons, and technical achievements for ${person.name}.`,
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Achievements"
        title="Awards & milestones"
        description="Verified recognitions, research awards, hackathons, and technical participation."
      />
      <section className="section-pad">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </section>
      <CTA
        title="Read the award-winning research"
        description="Open the full research page for abstract, methodology, and publication details."
        primaryHref="/research/nir-glucose-monitoring"
        primaryLabel="Open research"
        secondaryHref="/gallery"
        secondaryLabel="Gallery"
      />
    </>
  );
}
