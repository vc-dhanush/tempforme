"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
}

export function Lightbox({ open, onClose, src, alt, title }: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title || alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2 text-white"
        aria-label="Close preview"
        onClick={onClose}
      >
        <X size={18} />
      </button>
      <div
        className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
          <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
        </div>
        {title && (
          <div className="border-t border-white/10 px-4 py-3 text-sm text-mist-200">{title}</div>
        )}
      </div>
    </div>,
    document.body
  );
}
