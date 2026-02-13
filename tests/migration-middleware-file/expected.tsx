// TODO(tanstack-migrate): middleware/edge runtime pattern detected; manual migration required for TanStack Start runtime semantics.
import { NextResponse } from "next/server";

export function middleware() {
  // TODO(tanstack-migrate): manual migration required for `NextResponse` usage outside server actions.
  return NextResponse.next();
}
