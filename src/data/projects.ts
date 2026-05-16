// Add or edit projects here. Slug must be unique and URL-safe.
export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  tools: string[];
  cover: string; // gradient class or image url
  accent: string; // tailwind gradient stops
  problem: string;
  process: string[];
  outcome: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "lumen-banking",
    title: "Lumen — Calm Banking",
    category: "Mobile · UI/UX",
    year: "2025",
    summary: "Rethinking neobank flows with a calmer, expense-first interface.",
    description:
      "A concept neobank app that reframes balances around what you can actually spend, with soft micro-interactions and a focus on financial calm.",
    cover: "from-amber-200 via-orange-300 to-rose-400",
    accent: "from-amber-300 to-rose-400",
    tools: ["Figma", "Principle", "After Effects"],
    problem:
      "Most banking apps lead with anxiety-inducing balances. We wanted an interface that helps students plan, not panic.",
    process: [
      "User interviews with 12 students about money stress",
      "Information architecture exploring \"safe-to-spend\" first",
      "Lo-fi wireframes, then a high-fidelity Figma prototype",
      "Motion studies for transitions and micro-feedback",
    ],
    outcome:
      "A 24-screen prototype with a calmer visual system and a 38% faster perceived load in user testing.",
    gallery: [
      "from-amber-200 to-rose-400",
      "from-orange-300 to-pink-400",
      "from-yellow-200 to-orange-400",
    ],
  },
  {
    slug: "kintsugi-identity",
    title: "Kintsugi — Studio Identity",
    category: "Branding · Print",
    year: "2025",
    summary: "A visual identity for a ceramics studio rooted in repair and care.",
    description:
      "Identity system, packaging and a small editorial book exploring the philosophy of imperfect beauty.",
    cover: "from-stone-300 via-amber-200 to-emerald-300",
    accent: "from-emerald-300 to-amber-200",
    tools: ["Illustrator", "InDesign", "Photoshop"],
    problem:
      "The studio needed an identity that felt handmade without looking dated, and that translated to both packaging and digital.",
    process: [
      "Mood research across Japanese craft and modern editorial",
      "Custom wordmark with a broken-and-rejoined motif",
      "Packaging system with riso-printed stickers",
      "Editorial layout for the studio book",
    ],
    outcome:
      "Adopted as the full brand system; the studio book was shortlisted at a regional student design award.",
    gallery: [
      "from-emerald-300 to-stone-300",
      "from-amber-200 to-emerald-200",
      "from-stone-200 to-amber-300",
    ],
  },
  {
    slug: "drift-music",
    title: "Drift — Spatial Music Player",
    category: "Web · Concept",
    year: "2024",
    summary: "A music player where tracks live as objects in a soft 2D space.",
    description:
      "An experimental music UI exploring non-linear playlists, where songs are arranged spatially and connected by mood.",
    cover: "from-sky-300 via-violet-300 to-fuchsia-400",
    accent: "from-sky-300 to-fuchsia-400",
    tools: ["Figma", "Framer", "Rive"],
    problem:
      "Linear playlists collapse the texture of how we actually listen. Could a spatial canvas feel more like a real listening session?",
    process: [
      "Sketch explorations of 12 spatial layouts",
      "Prototype in Framer with drag and zoom",
      "Rive animations for the playing state",
      "User test with 8 listeners — measured emotional response",
    ],
    outcome:
      "Concept featured in two student showcases; informed an ongoing research project on ambient interfaces.",
    gallery: [
      "from-sky-300 to-fuchsia-400",
      "from-violet-300 to-sky-300",
      "from-fuchsia-400 to-rose-300",
    ],
  },
  {
    slug: "harvest-poster",
    title: "Harvest — Poster Series",
    category: "Print · Type",
    year: "2024",
    summary: "Typographic posters for a community urban-farming festival.",
    description:
      "A six-poster series mixing photography, modular type and risograph textures.",
    cover: "from-lime-300 via-emerald-300 to-teal-400",
    accent: "from-lime-300 to-teal-400",
    tools: ["Illustrator", "Photoshop", "Risograph"],
    problem:
      "The festival wanted print that felt local and unfussy, with strong wayfinding for a small budget.",
    process: [
      "Modular type system in two weights",
      "Photography sourced from community gardens",
      "Two-color riso prints for posters and zines",
    ],
    outcome:
      "200 posters distributed across the city; the festival reported 30% higher walk-in attendance.",
    gallery: [
      "from-lime-300 to-teal-400",
      "from-emerald-300 to-lime-200",
      "from-teal-400 to-emerald-300",
    ],
  },
];
