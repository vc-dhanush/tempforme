"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-ink-800 to-copper/20 blur-2xl" />
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-ink-850/80 p-6 shadow-soft">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
        {!reduce && (
          <>
            <motion.div
              className="absolute left-10 top-12 h-24 w-24 rounded-full border border-accent/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-16 right-10 h-16 w-16 rounded-xl border border-copper/40"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
        <div className="relative flex h-full flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-mist-400">Focus</p>
            <p className="mt-2 font-display text-2xl font-semibold text-white">
              AI Systems
              <br />
              <span className="text-accent">+ Research</span>
            </p>
          </div>
          <div className="space-y-2">
            {["Computer Vision", "Healthcare ML", "Robust Detection"].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-mist-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
