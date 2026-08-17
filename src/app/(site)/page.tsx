import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, FileDown } from "lucide-react";
import {
  achievements,
  experiences,
  person,
  projects,
  researchPapers,
  skillCategories,
} from "@/data/content";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ResearchCard } from "@/components/ResearchCard";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const topSkills = skillCategories.flatMap((c) => c.skills).slice(0, 12);
  const highlightAchievements = achievements.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-page relative grid items-center gap-12 pb-20 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="eyebrow">Personal Portfolio</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {person.name}
            </h1>
            <p className="mt-4 text-lg text-accent sm:text-xl">{person.title}</p>
            <p className="mt-5 max-w-xl text-base prose-muted sm:text-lg">{person.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn-primary">
                View projects <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact
              </Link>
              <a
                href={person.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <FileDown size={16} /> Resume
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={person.socials.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href={person.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={person.socials.email} className="btn-ghost">
                <Mail size={18} /> Email
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-transparent to-copper/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-850 shadow-soft">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={person.profileImage}
                    alt={`${person.name} profile photo`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 360px"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-accent">Bangalore</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    AI · Vision · Research
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page">
          <SectionHeader
            eyebrow="About"
            title="AI engineer with a research mindset"
            description={person.summary}
            href="/about"
          />
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {person.goals.slice(0, 3).map((goal) => (
                <div key={goal} className="card-surface p-5 text-sm prose-muted">
                  {goal}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page">
          <SectionHeader
            eyebrow="Projects"
            title="Featured work"
            description="Selected systems across healthcare ML, computer vision robustness, and applied software."
            href="/projects"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page">
          <SectionHeader
            eyebrow="Research"
            title="Publication highlight"
            description="Peer-reviewed research at the intersection of biomedical sensing and machine learning."
            href="/research"
          />
          <Reveal>
            <ResearchCard paper={researchPapers[0]} />
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page">
          <SectionHeader
            eyebrow="Achievements"
            title="Key recognitions"
            description="Verified awards, presentations, and technical participation."
            href="/achievements"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {highlightAchievements.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.05}>
                <div className="card-surface p-5">
                  <p className="text-xs text-accent">{a.category}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">{a.title}</h3>
                  <p className="mt-2 text-sm prose-muted">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page">
          <SectionHeader
            eyebrow="Skills"
            title="Technical toolkit"
            description="A structured stack across ML, vision, frameworks, and development—without fake proficiency bars."
            href="/skills"
          />
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <span key={skill} className="tag !px-3 !py-1.5 !text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-white/5">
        <div className="container-page">
          <SectionHeader
            eyebrow="Experience"
            title="Recent roles"
            description="Internships and volunteering across data/ML, GenAI-assisted Android development, and IEEE events."
            href="/experience"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.05}>
                <div className="card-surface p-5">
                  <p className="text-xs text-mist-400">{exp.duration}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">{exp.role}</h3>
                  <p className="mt-1 text-sm text-accent">{exp.organization}</p>
                  <p className="mt-3 line-clamp-3 text-sm prose-muted">{exp.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Let’s build something rigorous."
        description="Open to AI/ML engineering, computer vision, and research-oriented collaboration."
        primaryHref="/contact"
        primaryLabel="Get in touch"
        secondaryHref="/research"
        secondaryLabel="Explore research"
      />
    </>
  );
}
