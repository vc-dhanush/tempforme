import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 max-w-md prose-muted">
        That route does not exist. Head back to the portfolio home or browse projects.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/projects" className="btn-secondary">
          Projects
        </Link>
      </div>
    </section>
  );
}
