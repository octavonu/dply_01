import { serve, serveStatic } from "https://deno.land/x/sift@0.3.4/mod.ts";

serve({
  "/": serveStatic("web/index.html", { baseUrl: import.meta.url }),
  "/assets/:filename+": serveStatic("web/assets", { baseUrl: import.meta.url }),
  "/blog/:slug": (request, params) => {
    const post = `Hello, you visited ${params.slug}!`;
    return new Response(post);
  },
  // The route handler of 404 will be invoked when a route handler
  // for the requested path is not found.
  404: () => new Response("not found at all"),
});