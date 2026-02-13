"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";

export function ClientNav() {
  // TODO(tanstack-migrate): manual migration required for `useRouter()` in client component.
  const router = useRouter();
  // TODO(tanstack-migrate): manual migration required for `useSelectedLayoutSegments()` in client component.
  const segments = useSelectedLayoutSegments();

  return <button onClick={() => router.push(`/${segments.join("/")}`)}>Go</button>;
}
