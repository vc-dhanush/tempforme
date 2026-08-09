import type { Metadata } from "next";
import { Github, Linkedin, Mail, Youtube, ExternalLink } from "lucide-react";
import { person } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${person.name} via email, LinkedIn, or GitHub.`,
};

const profiles = [
  { label: "Email", href: person.socials.email, value: person.email, icon: Mail },
  { label: "LinkedIn", href: person.socials.linkedin, value: "linkedin.com/in/DhanushVC", icon: Linkedin },
  { label: "GitHub", href: person.socials.github, value: "github.com/vc-dhanush", icon: Github },
  { label: "YouTube", href: person.socials.youtube, value: "youtube.com/@DhanushVC", icon: Youtube },
  {
    label: "Quora",
    href: person.socials.quora,
    value: "quora.com/profile/Vc-Dhanush",
    icon: ExternalLink,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s connect"
        description="Reach out for AI/ML engineering, computer vision, research collaboration, or software opportunities."
      />
      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-4">
              {profiles.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target={p.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={p.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="card-surface flex items-center gap-4 p-4"
                >
                  <span className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-accent">
                    <p.icon size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">{p.label}</span>
                    <span className="text-sm text-mist-400">{p.value}</span>
                  </span>
                </a>
              ))}
              <a href={person.resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary mt-2">
                Download resume
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="card-surface overflow-hidden px-8 py-12 text-center">
            <p className="eyebrow">Final CTA</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white">
              Ready to collaborate on rigorous AI work?
            </h2>
            <p className="mx-auto mt-3 max-w-xl prose-muted">
              {person.mantra} — based in {person.location}.
            </p>
            <a href={person.socials.email} className="btn-primary mt-8">
              Email {person.shortName}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
