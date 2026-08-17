import type { Metadata } from "next";
import Link from "next/link";
import { certificates, person } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { CertificateCard } from "@/components/CertificateCard";

export const metadata: Metadata = {
  title: "Certifications",
  description: `Certificates and award documents for ${person.name}.`,
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications"
        title="Certificate gallery"
        description="Only verified certificates from provided records are listed. Additional credential images can be added when available."
      />
      <section className="section-pad">
        <div className="container-page">
          <div className="mb-6 flex flex-wrap gap-3 text-sm">
            <Link href="/achievements" className="link-arrow">
              Related achievements →
            </Link>
            <Link href="/research" className="link-arrow">
              Related research →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => (
              <CertificateCard key={c.id} certificate={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
