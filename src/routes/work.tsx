import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/work")({
  component: Work,
});

function Work() {
  return (
    <div className="relative pt-40 pb-24">
      <div className="mx-auto max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          Index · {projects.length} projects
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-5xl md:text-7xl"
        >
          Selected <span className="text-gradient italic">work</span>.
        </motion.h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          A small archive of things I've made — student briefs, concept work and the occasional client project.
        </p>
        <div className="mt-24 space-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
