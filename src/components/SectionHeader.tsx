import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View More →",
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${
        align === "center" ? "text-center md:flex-col md:items-center" : ""
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-3 prose-muted">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="link-arrow shrink-0">
          {linkLabel}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
