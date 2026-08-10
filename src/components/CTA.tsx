import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTA({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTAProps) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="card-surface relative overflow-hidden px-8 py-12 sm:px-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-copper/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="eyebrow">Next step</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 prose-muted">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
                <ArrowRight size={16} />
              </Link>
              {secondaryHref && secondaryLabel && (
                <Link href={secondaryHref} className="btn-secondary">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
