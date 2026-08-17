import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { person } from "@/data/content";

export const metadata: Metadata = {
  title: {
    default: `${person.name} | AI/ML Engineer & Researcher`,
    template: `%s | ${person.name}`,
  },
  description: person.tagline,
  metadataBase: new URL("https://vc-dhanush.github.io"),
  openGraph: {
    title: `${person.name} | AI/ML Engineer & Researcher`,
    description: person.tagline,
    type: "website",
    images: [person.profileImage],
  },
  twitter: {
    card: "summary",
    title: `${person.name} | AI/ML Engineer & Researcher`,
    description: person.tagline,
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-radial" />
      <div className="min-h-screen bg-ink-950 text-mist-50">
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </div>
    </>
  );
}
