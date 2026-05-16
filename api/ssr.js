// Vercel serverless function adapter
// Bridges the Cloudflare Workers-style fetch handler to Vercel's Node.js runtime
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let serverModule;

async function getServer() {
  if (!serverModule) {
    serverModule = await import(
      path.join(__dirname, "../dist/server/server.js")
    );
  }
  return serverModule.default;
}

export default async function handler(req, res) {
  try {
    const server = await getServer();

    // Build a standard Request from Node.js IncomingMessage
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "localhost";
    const url = new URL(req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    }

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await new Promise((resolve) => {
            const chunks = [];
            req.on("data", (c) => chunks.push(c));
            req.on("end", () => resolve(Buffer.concat(chunks)));
          })
        : undefined;

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
    });

    // Call the Workers-style fetch handler
    const response = await server.fetch(request, {}, {});

    // Write the Response back to Node.js ServerResponse
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("SSR error:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/html");
    res.end("<h1>Internal Server Error</h1>");
  }
}
