"use client";

import { useState } from "react";
import { Certificate } from "@/data/types";
import { Lightbox } from "./Lightbox";
import { Award } from "lucide-react";

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const [open, setOpen] = useState(false);
  const hasImage = Boolean(certificate.image);

  return (
    <>
      <article className="card-surface overflow-hidden">
        <button
          type="button"
          className="relative flex h-44 w-full items-center justify-center bg-gradient-to-br from-copper/20 via-ink-850 to-ink-900"
          onClick={() => hasImage && setOpen(true)}
          disabled={!hasImage}
          aria-label={hasImage ? `Preview ${certificate.name}` : certificate.name}
        >
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_40%,rgba(212,165,116,0.25)_50%,transparent_60%)]" />
          <Award className="relative text-copper-soft" size={42} />
        </button>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-white">{certificate.name}</h3>
          <p className="mt-1 text-sm text-accent">{certificate.organization}</p>
          <p className="mt-1 text-xs text-mist-400">{certificate.date}</p>
          {certificate.description && (
            <p className="mt-3 text-sm prose-muted">{certificate.description}</p>
          )}
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="link-arrow mt-4"
            >
              Credential link →
            </a>
          )}
        </div>
      </article>
      {hasImage && certificate.image && (
        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          src={certificate.image}
          alt={certificate.name}
          title={certificate.name}
        />
      )}
    </>
  );
}
