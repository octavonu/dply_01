import { serve } from "https://deno.land/x/sift@0.3.4/mod.ts";

serve({
  "/": () => new Response("hello world"),
  "/blog/:slug": (request, params) => {
    const post = `Hello, you visited ${params.slug}!`;
    return new Response(post);
  },
  // The route handler of 404 will be invoked when a route handler
  // for the requested path is not found.
  404: () => new Response("not found at all"),
});