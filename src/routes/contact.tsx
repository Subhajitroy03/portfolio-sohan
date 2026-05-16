import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Download, Send } from "lucide-react";
import { z } from "zod";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Tell me a little more").max(1000),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setPending(true);
    // TODO: connect to Formspree / EmailJS — POST parsed.data to your endpoint here.
    setTimeout(() => {
      setPending(false);
      setSent(true);
    }, 800);
  }

  return (
    <div className="relative pt-40 pb-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-display text-5xl md:text-7xl"
        >
          Say <span className="text-gradient italic">hi</span>.
        </motion.h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Briefs, internships, collaborations or just nice notes about typography — my inbox is open.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-5">
          <aside className="md:col-span-2 space-y-6">
            <a
              href={`mailto:${profile.email}`}
              className="block rounded-3xl border border-border p-6 transition-all hover:border-primary"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
              <p className="mt-2 font-display text-2xl">{profile.email}</p>
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="flex items-center justify-between rounded-3xl border border-border p-6 transition-all hover:border-primary"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Resume</p>
                <p className="mt-2 font-display text-2xl">Download (PDF)</p>
              </div>
              <Download size={20} />
            </a>
            <div className="rounded-3xl border border-border p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Elsewhere</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
                  >
                    <s.icon size={14} /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid place-items-center rounded-3xl border border-primary/40 bg-primary/5 p-12 text-center"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check size={28} />
                  </div>
                  <p className="mt-5 font-display text-2xl">Message sent.</p>
                  <p className="mt-2 text-sm text-muted-foreground">I'll reply within a couple of days.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5 rounded-3xl border border-border p-6"
                  noValidate
                >
                  <Field label="Name" name="name" error={errors.name} />
                  <Field label="Email" name="email" type="email" error={errors.email} />
                  <Field label="Message" name="message" textarea error={errors.message} />
                  <button
                    type="submit"
                    disabled={pending}
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
                  >
                    {pending ? "Sending…" : "Send message"}
                    <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", textarea, error,
}: { label: string; name: string; type?: string; textarea?: boolean; error?: string }) {
  const cls =
    "mt-2 w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary";
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} rows={5} className={cls} maxLength={1000} />
      ) : (
        <input name={name} type={type} className={cls} maxLength={255} />
      )}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
