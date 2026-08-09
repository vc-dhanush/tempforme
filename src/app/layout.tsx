import type { Metadata } from "next";
import { Sora, Figtree } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { person } from "@/data/content";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink-950 text-mist-50 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-radial" />
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
