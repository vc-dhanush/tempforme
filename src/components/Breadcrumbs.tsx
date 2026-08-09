import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-mist-400">
      {items.map((item, idx) => (
        <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1">
          {idx > 0 && <ChevronRight size={14} className="opacity-60" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-mist-200">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
