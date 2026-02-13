// TODO(tanstack-migrate): middleware/edge runtime pattern detected; manual migration required for TanStack Start runtime semantics.
export const runtime = "edge";

export function handler() {
  return new Response("ok");
}
