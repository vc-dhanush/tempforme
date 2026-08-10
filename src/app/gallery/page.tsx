import type { Metadata } from "next";
import { galleryItems, person } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { ImageGallery } from "@/components/ImageGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Professional gallery for ${person.name}.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Visual archive"
        description="Professional images for conferences, hackathons, demos, and certificates. Currently includes provided profile imagery; more assets can be added without inventing stock photos."
      />
      <section className="section-pad">
        <div className="container-page">
          <ImageGallery items={galleryItems} />
        </div>
      </section>
    </>
  );
}
