import { cacheTag as tagCache } from "next/cache";

export function runTag(tag: string) {
  tagCache(tag);
}
