import { ArrowUp } from "lucide-react";
import { socials } from "@/data/socials";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-3xl tracking-tight md:text-5xl">
              Let's make <span className="text-gradient">something</span>.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:scale-110 hover:border-primary hover:text-primary"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {profile.name}. Crafted with care.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 hover:border-primary hover:text-primary"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
