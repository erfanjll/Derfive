"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

const field =
  "w-full border border-line/40 bg-transparent px-4 py-3 text-base text-bone placeholder:text-mist/60 transition-colors focus:border-signal focus:ring-0 focus:outline-none";

/**
 * Posts to /api/contact. Until CONTACT_WEBHOOK_URL is set (see .env.example)
 * the API answers "not connected" and the form says so instead of failing silently.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 503) return setStatus("unconfigured");
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const messages: Record<Exclude<Status, "idle" | "sending">, string> = {
    sent: "Sent. I'll get back to you.",
    error: "Something went wrong. Try again in a moment.",
    unconfigured: site.contact.email
      ? `The form isn't connected yet — email me directly at ${site.contact.email}.`
      : "The form isn't connected yet — check back soon or reach me through the links on this page.",
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" aria-describedby="form-status">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-mono relative z-10 mb-3 block">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="label-mono relative z-10 mb-3 block">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label-mono relative z-10 mb-3 block">Message</label>
        <textarea id="message" name="message" required rows={5} placeholder="What are you building?" className={`${field} resize-none`} />
      </div>

      {/* Honeypot: hidden from humans, bots tend to fill it. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={status === "sending"} magnetic>
          {status === "sending" ? "Sending" : "Send message"}
        </Button>
        <div id="form-status" role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
          <AnimatePresence mode="wait">
            {status !== "idle" && status !== "sending" && (
              <motion.p
                key={status}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={status === "sent" ? "text-signal" : "text-fog"}
              >
                {messages[status]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
