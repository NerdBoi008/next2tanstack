import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export function readRequest(req: NextRequest) {
  const c = cookies();
  const h = headers();
  return { c, h, req };
}
