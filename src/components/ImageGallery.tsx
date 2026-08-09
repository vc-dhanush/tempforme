"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GalleryItem } from "@/data/types";
import { Lightbox } from "./Lightbox";

const categories = [
  "All",
  "Conferences",
  "Hackathons",
  "Projects",
  "Certificates",
  "Events",
  "Presentations",
  "Other",
] as const;

export function ImageGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [filter, items]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-xl px-3 py-1.5 text-sm transition ${
              filter === c
                ? "bg-accent text-ink-950 font-semibold"
                : "border border-white/10 bg-white/5 text-mist-300 hover:border-accent/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card-surface p-10 text-center">
          <p className="text-mist-300">
            No gallery images in this category yet. Additional conference, hackathon, and
            certificate photos can be added when available.
          </p>
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-ink-850"
              onClick={() => setActive(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-3 text-left">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-mist-400">{item.category}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {active && (
        <Lightbox
          open={Boolean(active)}
          onClose={() => setActive(null)}
          src={active.src}
          alt={active.alt}
          title={active.title}
        />
      )}
    </div>
  );
}
