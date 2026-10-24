"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type ContactFormProps = {
  labels: Dictionary["contact"];
  errorLabel: string;
};

export function ContactForm({ labels, errorLabel }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full rounded-2xl border border-line bg-white px-5 py-4 text-base outline-none transition focus:border-burgundy focus:ring-4 focus:ring-burgundy/10";

  if (status === "sent") {
    return <p className="rounded-2xl bg-blush p-6 font-semibold text-burgundy">{labels.sent}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm font-semibold">
        {labels.name}
        <input name="name" required className={field} autoComplete="name" />
      </label>
      <label className="block text-sm font-semibold">
        {labels.email}
        <input name="email" type="email" required className={field} autoComplete="email" />
      </label>
      <label className="block text-sm font-semibold">
        {labels.message}
        <textarea name="message" required rows={5} className={field} />
      </label>
      {status === "error" && <p className="text-sm text-red-700">{errorLabel}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-burgundy px-8 py-4 font-semibold text-white transition hover:bg-burgundy-deep disabled:opacity-60"
      >
        {labels.send}
      </button>
    </form>
  );
}
