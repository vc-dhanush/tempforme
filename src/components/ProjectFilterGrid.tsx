"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { projectCategories, projects } from "@/data/content";

export function ProjectFilterGrid() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category.includes(active as (typeof p.category)[number]));
  }, [active]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {projectCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-xl px-3 py-1.5 text-sm transition ${
              active === c
                ? "bg-accent font-semibold text-ink-950"
                : "border border-white/10 bg-white/5 text-mist-300 hover:border-accent/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-mist-400">No projects in this category yet.</p>
      )}
    </div>
  );
}
