import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },

  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center pt-32 text-center">
      <div>
        <p className="font-display text-4xl">Project not found.</p>
        <Link to="/work" className="mt-4 inline-block text-primary">← Back to work</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="grid min-h-[60vh] place-items-center pt-32 text-center">
      <div>
        <p className="font-display text-3xl">Something went sideways.</p>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-4 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">Try again</button>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: (typeof projects)[number] };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="relative pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> All work
        </Link>
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-12 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gradient-to-br ${project.cover}`}
        />

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          <Section label="Problem" body={project.problem} />
          <Section
            label="Process"
            body={
              <ol className="space-y-3">
                {project.process.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-primary">0{i + 1}</span>
                    <span className="text-foreground/90">{p}</span>
                  </li>
                ))}
              </ol>
            }
          />
          <Section label="Outcome" body={project.outcome} />
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {project.gallery.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${g} ${
                i === 0 ? "md:col-span-2 md:aspect-[16/8]" : ""
              }`}
            />
          ))}
        </div>

        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group mt-24 flex items-center justify-between rounded-3xl border border-border p-8 transition-all hover:border-primary"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Next project</p>
            <p className="mt-2 font-display text-3xl group-hover:text-primary">{next.title}</p>
          </div>
          <ArrowUpRight size={28} className="transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </article>
  );
}

function Section({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
      <div className="text-foreground/90">{body}</div>
    </div>
  );
}
