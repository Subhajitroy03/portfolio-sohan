import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const isVercel = process.env.VERCEL === "1";

export default defineConfig(async () => {
  const plugins = [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: isVercel ? {} : { entry: "server" },
    }),
    react(),
  ];

  // Only add Cloudflare plugin for non-Vercel builds
  if (!isVercel) {
    try {
      const { cloudflare } = await import("@cloudflare/vite-plugin");
      plugins.push(
        cloudflare({ viteEnvironment: { name: "ssr" } }),
      );
    } catch {
      // Cloudflare plugin not available, skip
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
  };
});
