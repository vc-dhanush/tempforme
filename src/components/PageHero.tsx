export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="container-page relative">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-2xl prose-muted text-base sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  );
}
