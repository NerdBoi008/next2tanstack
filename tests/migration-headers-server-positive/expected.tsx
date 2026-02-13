import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

// TODO(tanstack-migrate): manual migration required for `NextRequest` usage outside server actions.
export function readRequest(req: NextRequest) {
  // TODO(tanstack-migrate): manual migration required for `cookies()` outside server actions.
  const c = cookies();
  // TODO(tanstack-migrate): manual migration required for `headers()` outside server actions.
  const h = headers();
  return { c, h, req };
}
