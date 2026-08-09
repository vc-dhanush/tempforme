"use client";

import { FormEvent, useState } from "react";
import { person } from "@/data/content";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  };

  return (
    <form onSubmit={onSubmit} className="card-surface space-y-4 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-mist-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-white/10 bg-ink-900 px-3 py-2.5 text-sm text-white outline-none ring-accent focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-mist-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-white/10 bg-ink-900 px-3 py-2.5 text-sm text-white outline-none ring-accent focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-mist-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-ink-900 px-3 py-2.5 text-sm text-white outline-none ring-accent focus:ring-2"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send message
      </button>
      {status === "ready" && (
        <p className="text-sm text-mist-400">
          Opening your email client to reach {person.email}…
        </p>
      )}
    </form>
  );
}
