"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";

export function ClientNav() {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  return <button onClick={() => router.push(`/${segments.join("/")}`)}>Go</button>;
}
