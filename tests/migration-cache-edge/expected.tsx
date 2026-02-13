import { cacheTag as tagCache } from "next/cache";

export function runTag(tag: string) {
  // TODO(tanstack-migrate): manual migration required for `cacheTag()`; map to TanStack Start/Query caching strategy.
  tagCache(tag);
}
