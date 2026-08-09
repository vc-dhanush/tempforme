"use client";

import Link from "next/link";
import { useState } from "react";
import { Award, X } from "lucide-react";
import { Achievement } from "@/data/types";

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="card-surface w-full p-5 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="tag">{achievement.category}</span>
          <span className="text-xs text-mist-400">{achievement.date}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-white">
          {achievement.title}
        </h3>
        {achievement.event && (
          <p className="mt-1 text-sm text-accent">{achievement.event}</p>
        )}
        <p className="mt-3 line-clamp-3 text-sm prose-muted">{achievement.description}</p>
        <p className="mt-4 text-xs font-semibold text-mist-400">View details →</p>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-auto rounded-2xl border border-white/10 bg-ink-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-copper-soft">
                <Award size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {achievement.category}
                </span>
              </div>
              <button
                type="button"
                className="rounded-lg border border-white/10 p-1.5"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white">
              {achievement.title}
            </h3>
            <p className="mt-2 text-sm text-mist-400">
              {achievement.event ? `${achievement.event} · ` : ""}
              {achievement.date}
            </p>
            <p className="mt-4 text-sm prose-muted">{achievement.description}</p>
            {achievement.details && (
              <ul className="mt-4 space-y-2 text-sm text-mist-300">
                {achievement.details.map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {achievement.relatedResearchSlug && (
                <Link
                  href={`/research/${achievement.relatedResearchSlug}`}
                  className="btn-primary !py-2"
                  onClick={() => setOpen(false)}
                >
                  Related research
                </Link>
              )}
              {achievement.relatedProjectSlug && (
                <Link
                  href={`/projects/${achievement.relatedProjectSlug}`}
                  className="btn-secondary !py-2"
                  onClick={() => setOpen(false)}
                >
                  Related project
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
