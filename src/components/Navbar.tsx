"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, person } from "@/data/content";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-18">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          <span className="text-white">{person.shortName}</span>
          <span className="text-accent"> V C</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-lg px-3 py-2 text-sm transition ${
                isActive(item.href)
                  ? "text-white"
                  : "text-mist-300 hover:text-white"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={person.resumeUrl} className="btn-secondary" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-mist-100 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-3 text-sm ${
                  isActive(item.href)
                    ? "bg-accent/10 text-accent"
                    : "text-mist-200 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={person.resumeUrl}
              className="btn-primary mt-2"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
