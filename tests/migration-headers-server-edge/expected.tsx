import { NextResponse as Res } from "next/server";

export function makeResponse() {
  // TODO(tanstack-migrate): manual migration required for `NextResponse` usage outside server actions.
  return Res.json({ ok: true });
}
