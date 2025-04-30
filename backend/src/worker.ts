// This is a minimal Cloudflare Worker without NestJS dependencies
// This avoids module resolution issues in the Cloudflare environment

export default {
  async fetch(request, env, ctx) {
    return new Response("Hello from Trabajo Digno API - Cloudflare Worker", {
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
};