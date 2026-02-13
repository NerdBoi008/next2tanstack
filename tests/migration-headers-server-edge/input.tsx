import { NextResponse as Res } from "next/server";

export function makeResponse() {
  return Res.json({ ok: true });
}
