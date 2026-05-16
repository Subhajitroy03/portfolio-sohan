import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { skillGroups } from "@/data/skills";
import { ProjectCard } from "@/components/project-card";
import { Magnetic } from "@/components/magnetic";
import { MouseSpot } from "@/components/mouse-spot";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <MouseSpot />
      <Hero />
      <Marquee />
      <SelectedWork />
      <SkillsSection />
      <Testimonials />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="grain" aria-hidden />
      <motion.div
        className="absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {profile.available ? "Available for select projects · 2026" : "Currently booked"}
        </motion.div>

        <h1 className="mt-6 font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95] tracking-tight">
          {["Designing", "playful", "digital", "experiences."].map((w, i) => (
            <motion.span
              key={w}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mr-3 inline-block overflow-hidden align-bottom"
            >
              <span className="inline-block">
                {i === 1 ? <span className="text-gradient italic">{w}</span> : w}
              </span>
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-10 flex max-w-3xl flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            I'm <span className="text-foreground">{profile.name}</span> — a {profile.role.toLowerCase()} based in {profile.location}. I make interfaces, identities and the small motion in between.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                View Work
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm hover:border-primary"
              >
                Contact Me
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <ArrowDown size={14} className="animate-bounce" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["UI/UX", "Branding", "Motion", "Editorial", "Prototyping", "Type", "Systems"];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-surface/50 py-8">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
            {words.map((w) => (
              <span key={w + i} className="font-display text-3xl text-muted-foreground md:text-5xl">
                {w} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectedWork() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Sparkles size={12} className="text-primary" /> Selected work
            </p>
            <h2 className="font-display text-4xl md:text-6xl">Recent projects.</h2>
          </div>
          <Link to="/work" className="hidden text-sm text-muted-foreground hover:text-primary md:inline-flex">
            All work →
          </Link>
        </div>
        <div className="space-y-32">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-12 font-display text-4xl md:text-6xl">
          Things I <span className="text-gradient">make</span>.
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {skillGroups.map((g, idx) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-sm transition-all hover:scale-105 hover:border-primary hover:text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-12 font-display text-4xl md:text-6xl">Kind words.</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass relative flex flex-col gap-6 rounded-3xl p-6 transition-all hover:-translate-y-1"
            >
              <span className="font-display text-5xl leading-none text-primary/60">"</span>
              <blockquote className="text-sm leading-relaxed text-foreground/90">{t.quote}</blockquote>
              <figcaption className="mt-auto text-xs text-muted-foreground">
                <span className="text-foreground">{t.name}</span> · {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
