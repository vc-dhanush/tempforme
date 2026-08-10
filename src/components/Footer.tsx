import Link from "next/link";
import { Github, Linkedin, Mail, Youtube } from "lucide-react";
import { navItems, person } from "@/data/content";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-ink-900/60">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold">{person.name}</p>
          <p className="mt-2 max-w-sm text-sm prose-muted">{person.title}</p>
          <p className="mt-4 text-sm italic text-mist-400">&ldquo;{person.mantra}&rdquo;</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Navigate</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-mist-300 transition hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Connect</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={person.socials.github}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary !px-3"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={person.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary !px-3"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={person.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary !px-3"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <a href={person.socials.email} className="btn-secondary !px-3" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
          <p className="mt-4 text-sm text-mist-400">{person.email}</p>
          <p className="text-sm text-mist-400">{person.location}</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-mist-500">
        © {new Date().getFullYear()} {person.name}. Built as a personal portfolio.
      </div>
    </footer>
  );
}
